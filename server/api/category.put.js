import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const updateCategory = await prisma.category.update({
    where:{
      id: body.id
    },
    data:{
      name: body.name,
      updated_At: Date.now()
    }
  })
})
