import { z } from "zod"
import prisma from "~/lib/prisma"
const schema = z.object({
    email: z.string().min(1, "Email is Required").email()
})
export default defineEventHandler( async (event) =>{
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
    const {email} = parsed.data
    try {
        const user = await prisma.profile.findFirst({
        where: {
            email
        }
        })

        if (!user) {
            return {
                success: false,
                error: [{ message: "User tidak ditemukan." }]
            }
        }

        return {
            success: true,
            data: user
        }
    } catch (err) {
        console.error("DB error:", err)
        return {
            success: false,
            error: [{ message: "Terjadi kesalahan saat memproses data." }]
        }
    }
})