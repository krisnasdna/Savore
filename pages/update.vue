<template>
    <div>
        <Form :validation-schema="validateSchema" @submit="handleUpdate">
            <Field name="password" type="password"/>
            <ErrorMessage name="password"/>
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
        password: z.string().min(1, 'Password is required')
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