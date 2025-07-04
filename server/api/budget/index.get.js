import prisma from "~/lib/prisma"
import {  serverSupabaseUser } from '#supabase/server';
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

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
    const [ budgetNow, budgetPrev, trxNow, trxPrev ] = await Promise.all([
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
        }),
        prisma.transaction.findMany({
            where:{
                profileId: profile.id,
                date:{
                    gte: startOfMonth(monthStart),
                    lte: endOfMonth(monthEnd)
                }
            },
            include:{
                category: true
            },
            orderBy:{
                date: 'asc'
            }
        }),
        prisma.transaction.findMany({
            where:{
                profileId: profile.id,
                date:{
                    gte: startOfMonth(lastMonthStart),
                    lte: endOfMonth(lastMonthEnd)
                }
            },
            include:{
                category: true
            },
            orderBy:{
                date: 'asc'
            }
        }),

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
    
    const budgetMapNow = groupCategory(budgetNow)
    const budgetMapPrev= groupCategory(budgetPrev)
    const trxMapNow = groupCategory(trxNow)
    const trxMapPrev = groupCategory(trxPrev)


    const allCategoryId = new Set([...budgetMapNow.keys(), ...budgetMapPrev.keys(), ...trxMapNow.keys(), ...trxMapPrev.keys()])

    const result = Array.from(allCategoryId).map((categoryId) =>{
        const bNow = budgetMapNow.get(categoryId)
        const bPrev = budgetMapPrev.get(categoryId)
        const tNow = trxMapNow.get(categoryId)
        const tPrev = trxMapPrev.get(categoryId)

        return{
            categoryId,
            categoryName: bNow?.name || bPrev?.name || tNow?.name || tPrev?.name ||'Tanpa Kategori',
            budgetTotalNow: Number(bNow?.total || 0),
            budgetTotalPrev: Number(bPrev?.total || 0),
            trxTotalNow: Number(tNow?.total || 0),
            trxTotalPrev: Number(tPrev?.total || 0),
            differenceNow: (bNow?.total || 0) - (tNow?.total || 0),
            differencePrev: (bPrev?.total || 0) - (tPrev?.total || 0)
        }

    })

    return result
})
