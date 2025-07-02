import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const updateCategory = await prisma.category.update({
    where:{
      id: event.context.params.id
    },
    data:{
      name: body.name,
    }
  })

  return updateCategory
})
