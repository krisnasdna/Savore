import { z } from "zod"
import prisma from "~/lib/prisma"
import {  serverSupabaseUser } from '#supabase/server';

const schema = z.object({
    amount: z.number(),
    categoryId: z.string().uuid('Invalid Category ID'),
})

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

  const body = await readBody(event)

  const parsed = schema.safeParse(body)
  if(!parsed.success){
    return {
      success: false,
      error: parsed.error.errors.map(e =>({
        message: e.message
      }))
    }
  }

  const today = new Date()

  const {amount, categoryId } = parsed.data

  const createBudget = await prisma.budget.create({
    data:
    {
        amount: amount, 
        period: today,
        categoryId: categoryId,
        profileId: profile.id
    }
  })

  return{
    success: true,
    data: createBudget
  }
})