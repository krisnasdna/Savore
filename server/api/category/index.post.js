import { z } from "zod"
import prisma from "~/lib/prisma"

const schema = z.object({
  name: z.string().min(1,'Category name is required'),
  profileId: z.string().uuid('Invalid Profile ID')
})

export default defineEventHandler(async (event) => {
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

  const {name, profileId } = parsed.data

  const createCategory = await prisma.category.create({
    data:
    {
      name: name, 
      profileId: profileId
    }
  })

  return{
    success: true,
    data: createCategory
  }
})
