import prisma from "~/lib/prisma"
import {  serverSupabaseUser } from '#supabase/server';

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
    
    const transaction= await prisma.transaction.findMany({
        where:{
            profileId: profile.id
        },
        include:{
            category: true
        },
        orderBy:{
            id: 'asc'
        }
    })

    return transaction
})
