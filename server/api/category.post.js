import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const createCategory = await prisma.category.create({
    data:{
      name: body.name,
      profileId: body.profileId
    }
  })
})
