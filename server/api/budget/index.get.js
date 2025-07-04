import prisma from "~/lib/prisma"
import {  serverSupabaseUser } from '#supabase/server';
import { endOfMonth, parseISO, startOfMonth, subMonths } from "date-fns";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)

    if(!user){
        throw error({
            statusCode: 400,
            statusMessage: 'Unauthorized'
        })
    }

    const today = new Date()

    const monthStart = startOfMonth(today)
    const monthEnd = endOfMonth(today)

    const lastMonth = subMonths(today, 1)

    const lastMonthStart = startOfMonth(lastMonth)
    const lastMonthEnd = endOfMonth(lastMonth)

    const profile = await prisma.profile.findUnique({
        where:{
            supabase_user_id: user.id
        }
    })
    if(!profile){
        throw error({
            statusCode: 404,
            statusMessage: 'Profile not found'
        })
    }
    const [ budgetNow, budgetPrev ] = await Promise.all([
        prisma.budget.findMany({
            where:{
                profileId: profile.id,
                period:{
                    gte: startOfMonth(monthStart),
                    lte: endOfMonth(monthEnd)
                }
            },
            include:{
                category: true
            },
            orderBy:{
                period: 'asc'
            }
        }),
        prisma.budget.findMany({
            where:{
                profileId: profile.id,
                period:{
                    gte: startOfMonth(lastMonthStart),
                    lte: endOfMonth(lastMonthEnd)
                }
            },
            include:{
                category: true
            },
            orderBy:{
                period: 'asc'
            }
        })

    ])

    const groupCategory = (items) =>{
        const map = new Map
        for(const item of items){
            const key = item.categoryId
            const current = map.get(key) || {total: 0, name: item.category?.name ?? 'Tanpa Kategori'}
            current.total += item.amount
            map.set(key, current)
        }
        return map
    }
    
    const nowMap = groupCategory(budgetNow)
    const prevMap = groupCategory(budgetPrev)

    const allCategory = new Set([...nowMap.keys(), ...prevMap.keys()])

    const compare = Array.from(allCategory).map((categoryId) =>{
        const now = nowMap.get(categoryId)
        const prev = prevMap.get(categoryId)

        return{
            categoryId,
            categoryName: now?.name || prev?.name || 'Tanpa Kategori',
            totalNow: Number(now?.total || 0),
            totalPrev: Number(prev?.total || 0),
            difference: (now?.total || 0) - (prev?.total || 0)
        }

    })

    return compare
})
