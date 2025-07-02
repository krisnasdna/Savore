import prisma from "~/server/lib/prisma"

export default defineEventHandler(async (event) => {
  const category = await prisma.category.findMany({
    where:{
      profileId: event.context.params.id
    }
  })

  return category
})

