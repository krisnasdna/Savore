import { z } from "zod"
import prisma from "~/lib/prisma"

const schema = z.object({
  name: z.string().min(1,'Name is required'),
  email: z.string().min(1,'Email is required').email('This is not a valid email.'),
  image_url: z.string().url()

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
  const { name, email, image_url} = result.data

  const profile = await prisma.profile.update({
    where:{
      id: event.context.params.id
    },
    data:{
      name: name,
      email: email,
      image_url: image_url
    }
  })

  return {
    success: true,
    data: profile
  }
})
