import { z } from "zod"
import prisma from "~/lib/prisma"
import {  serverSupabaseUser } from '#supabase/server';

const schema = z.object({
    merchant: z.string().trim().min(1, 'Merchant required'),
    amount: z.number(),
    description: z.string().trim(),
    date: z.coerce.date(),
    is_recurring: z.boolean(),
    recurring_interval: z.enum(["DAILY","WEEKLY","MONTHLY","YEARLY"]).nullish(),
    next_recurring_date: z.coerce.date().nullable(),
    last_processed: z.coerce.date().nullable(),
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

  const {merchant, amount, description,date, is_recurring,recurring_interval,next_recurring_date,last_processed, categoryId } = parsed.data

  const createTransaction = await prisma.transaction.create({
    data:
    {
        amount: amount,
        description: description,
        date: date,
        merchant:merchant,
        is_recurring: is_recurring,
        recurring_interval: recurring_interval,
        next_recurring_date: next_recurring_date,
        last_processed: last_processed,
        categoryId: categoryId,
        profileId: profile.id
    }
  })

  return{
    success: true,
    data: createTransaction
  }
})