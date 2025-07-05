import prisma from "~/lib/prisma"
import {  serverSupabaseUser } from '#supabase/server';
import { endOfMonth, parseISO, startOfMonth } from "date-fns";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)

    if(!user){
        throw error({
            statusCode: 400,
            statusMessage: 'Unauthorized'
        })
    }

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
    const query = getQuery(event)
    const month = query.month

    let whereClause = {
        profileId: profile.id
    }

    if(month){
        try{
            const startMonth = startOfMonth(parseISO(`${month}-01`))
            const endMonth = endOfMonth(parseISO(`${month}-01`))

            whereClause = {
                ...whereClause,
                date:{
                    gte: startMonth,
                    lte: endMonth
                }
            }
        }catch(error){
            throw error({
                statusCode: 400,
                statusMessage: "Invalid month format. Expected YYYY-MM"
            })
        }
    }

    const transaction = await prisma.transaction.findMany({
        where: whereClause,
        include:{
            category: true
        },
        orderBy:{
            id: 'asc'
        }
    })

    return transaction
})
