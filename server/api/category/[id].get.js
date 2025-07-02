import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const category = await prisma.category.findUnique({
    where:{
      id: event.context.params.id
    }
  })

  return category
})

