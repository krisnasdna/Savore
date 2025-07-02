import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const {id, name, email, image_url} = await readBody(event)
  const profile = await prisma.profile.update({
    where:{
      id: id
    },
    data:{
      name: name,
      email: email,
      image_url: image_url
    }
  })

  return profile
})
