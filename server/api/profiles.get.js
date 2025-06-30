import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const profiles = await prisma.profile.findMany()
    return profiles
})
