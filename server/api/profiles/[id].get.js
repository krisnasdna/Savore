import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const profile = await prisma.profile.findUnique({
    where:{
      supabase_user_id: event.context.params.id
    }
  })
  
  return profile
})
