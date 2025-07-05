<template>
  <div>
    <h1>{{ profile?.name }}</h1>
      <Form :validation-schema="validationSchema" @submit="handleCreateCategory">
        <Field name="name" type="text"/>
        <ErrorMessage name="name"/>
        <button>
          Submit
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

  const user = useSupabaseUser()
  const router = useRouter()
  const id = computed(() => user.value.id)

  const {data:profile} = await useFetch(() => `/api/profiles/${id.value}`)


  const validationSchema = toTypedSchema(
    z.object({
      name: z.string().trim().min(1, 'Name is required').max(100)
    })
  )

  async function handleCreateCategory(values) {
    try{
      await $fetch(`/api/category`,{
        method: 'POST',
        body:{
          name: values.name,
          profileId: profile.value.id
        }
      })

      alert('berhasil menambahkan category!')
      router.push('/category/')

    }catch(error){

      alert("gagal menambahkan category")
    }
  }
</script>

<style>

</style>