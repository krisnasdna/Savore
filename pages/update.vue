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
                <h1 class="font-bold text-2xl mb-2">Reset Password</h1>
                <p class="text-stone-700 ">Your money journey starts here. Ready to make smarter choices?</p>
            </div>
            <div>
                <Form :validation-schema="validateSchema" @submit="handleUpdate">
                    <FormField name="password" type="password" label="Password"/>
                    <div class="mt-4">
                        <button type="submit" class="bg-[#4A52E6] py-2 px-1 text-white rounded-xl w-full text-lg shadow-[0px_4px_0px_-1px_#000000] border border-black">Reset</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

definePageMeta({
    layout: 'auth',
})

const supabase = useSupabaseClient()

const validateSchema = toTypedSchema(
    z.object({
        password: z.string().min(6, 'Password minimal 6 char')
    })
)

async function handleUpdate (values){
    try{
        const { error } = await supabase.auth.updateUser({
            password: values.password
        })
        if(error) throw error
        alert("Berhasil Update")
        navigateTo('/auth')
    }catch(error){
        return alert(error)
    }
};

</script>

<style lang="scss" scoped>

</style>