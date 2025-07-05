<template>
    <div>
        <Form :validation-schema="validateSchema" @submit="handleLogin">
            <Field name="email" type="email" placeholder="Enter Your Email"/>
            <ErrorMessage name="email"/>
            <Field name="password" type="password" placeholder="Enter Your Password"/>
            <ErrorMessage name="password"/>
            <button type="submit">Submit</button>
        </Form>
    </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'

    const supabase = useSupabaseClient()
    const router = useRouter()
    const validateSchema = toTypedSchema(
        z.object({
            email: z.string().min(1, 'Email is required').email(),
            password: z.string().trim().min(1, 'Password is required')
        })
    )

    async function handleLogin(values) {
        try{
            const {error} = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password
            })
            if(error) throw error
            router.push('/dashboard')
        }catch(error){
            alert(error.message)
        }
    }
</script>