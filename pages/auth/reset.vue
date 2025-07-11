<template>
    <div class="justify-self-center sm:justify-self-center border-2 border-black p-4 rounded-xl shadow-[2px_4px_0px_0px_#000]">
        <div class="flex items-center justify-between mb-8 relative sm:hidden">
            <div>
                <NuxtLink to="/" class="flex flex-row items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8l-4 4m0 0l4 4m-4-4h20" />
                    </svg>
                </NuxtLink>
            </div>
            <div>
                <Logo />
            </div>
            <div>

            </div>
        </div>
        <div  class="flex flex-col gap-6">
            <div>
                <h1 class="font-bold text-2xl mb-2">Lost Account?</h1>
                <div class="mt-2">
                    <div v-if="message" :class="[
                    'p-3 rounded-xl border text-sm',
                    messageType === 'success' ? 'bg-green-100 border-green-400 text-green-700' : '',
                    messageType === 'error' ? 'bg-red-100 border-red-400 text-red-700' : ''
                    ]">
                    {{ message }}
                    </div>
                </div>
            </div>
            <div>
                <Form :validation-schema="validateSchema" @submit="handleReset">
                    <FormField name="email" type="email" label="Email"/>
                    <div class="mt-4">
                        <button type="submit" class="bg-[#4A52E6] py-2 px-1 text-white rounded-xl w-full text-lg shadow-[0px_4px_0px_-1px_#000000] border border-black">Check Account</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Form }from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

definePageMeta({
    layout: 'auth',
})

const message = ref('')
const messageType = ref('') 

const supabase = useSupabaseClient()

const validateSchema = toTypedSchema(
    z.object({
        email: z.string().min(1, 'Email is required').email('Email not valid')
    })
)

async function handleReset (values){
    message.value = ''
    messageType.value = ''

    try{
        const res = await $fetch('/api/check-user',{
            method: 'POST',
            body:{
                email: values.email
            }
        })

        if (!res.success) {
            messageType.value = 'error'
            message.value = res.error?.[0]?.message || 'Terjadi kesalahan.'
            return
        }

        const { error } = await supabase.auth.resetPasswordForEmail(values.email)
        if(error) throw error
        navigateTo('/auth/verif')
    }catch(error){
        message.value = error.message || 'Terjadi kesalahan.'
        messageType.value = 'error'
    }
};

</script>

<style lang="scss" scoped>

</style>