import { z } from "zod"
import prisma from "~/lib/prisma"


const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const result = schema.safeParse(body)

  if(!result.success){
    return {
      success: false,
      error: result.error.message
    }
  }

  const { name } = result.data

  const updateCategory = await prisma.category.update({
    where:{
      id: event.context.params.id
    },
    data:{
      name: name,
    }
  })

  return {
    success: true,
    data: updateCategory
  }
})
