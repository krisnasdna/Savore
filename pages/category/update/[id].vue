<template>
  <div>
    <Form :validation-schema="validationSchema" @submit="handleUpdateCategory">
      <Field name="name" type="text" v-model="data.name"/>
      <ErrorMessage name="name"/>

      <button>
        submit
      </button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'

  definePageMeta({
    middleware: ['auth']
  })
  const route = useRoute()

  const validationSchema = toTypedSchema(
    z.object({
      name: z.string().trim().min(1, 'Name is required').max(100)
    })
  )


  const { data } = await useFetch(`/api/category/${route.params.id}`)

  async function handleUpdateCategory(values){
    try{
      await $fetch(`/api/category/${data.value.id}`,{
        method: 'PUT',
        body:{
          name: values.name
        }
      })

      alert('berhasil mengedit category!')
      navigateTo('/category')

    }catch(error){
      console.error(error)
    }
  }

</script>

<style>

</style>