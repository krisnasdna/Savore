import { startOfDay } from "date-fns";
import prisma from "~/lib/prisma";

const getInterval = (date, interval) =>{
    switch (interval){
        case "DAILY":
        return addDays(date, 1);
        case "WEEKLY":
        return addWeeks(date, 1)
        case "MONTHLY":
        return addMonths(date, 1)
        case "YEARLY":
        return addYears(date, 1)
    }
}
export default defineEventHandler(async (event) =>{
    const config = useRuntimeConfig()
    const token = getHeader(event, 'authorization')
    if(token !== `Bearer ${config.cronSecret}`){
        throw createError( {
            statusCode: 401,
            statusMessage: ' Unauthorized'
        } )
    }

    const today = startOfDay(new Date())

    const recurringTransaction = await prisma.transaction.findMany({
        where:{
            is_recurring: true,
            next_recurring_date:{
                lte: today
            }
        }
    })

    for(trx of recurringTransaction){
        const nextDate = getInterval(today, trx.recurring_interval)

        await prisma.transaction.create({
            data:{
                profileId: trx.profileId,
                categoryId: trx.categoryId,
                amount: trx.amount,
                merchant: trx.merchant,
                description: trx.description,
                date: today,
                is_recurring: trx.is_recurring,
                recurring_interval: trx.recurring_interval,
                next_recurring_date: nextDate,
                last_processed: today,
            }
        })

        await prisma.transaction.update({
            where: {
                id: trx.id
            },
            data:{
                next_recurring_date: nextDate,
                last_processed: today
            }
        })
    }

    return {
        status: 'succes',
        processed: recurringTransaction.length
    }
})