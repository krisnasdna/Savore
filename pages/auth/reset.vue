<template>
    <div>
        <Form :validation-schema="validateSchema" @submit="handleReset">
            <Field name="email" type="email"/>
            <ErrorMessage name="email"/>
            <button>
                submit
            </button>
        </Form>
    </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';


const supabase = useSupabaseClient()

const validateSchema = toTypedSchema(
    z.object({
        email: z.string().min(1, 'Email is required').email('Email not valid')
    })
)

async function handleReset (values){
    try{
        const { error } = await supabase.auth.resetPasswordForEmail(values.email)
        if(error) throw error
        alert("Berhasil reset")
    }catch(error){
        return alert(error)
    }
};

</script>

<style lang="scss" scoped>

</style>