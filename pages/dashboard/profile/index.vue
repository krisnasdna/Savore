<template>
  <div>
    <div v-if="pending">
      Loading data.......
    </div>
    <div v-else>
      <div>
        <img :src="dataProfile.image_url" alt="avatar" class="max-w-xs">
        <input type="file" accept="image/*" @change="handleUploadAvatar">
        <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      </div>
      <Form :validation-schema="validationSchema" @submit="handleUpdateProfile">
        <Field name="name" type="text" v-model="dataProfile.name" placeholder="Enter Your Name"/>
        <ErrorMessage name="name"/>
        <Field name="email" type="email" v-model="dataProfile.email" placeholder="Enter Your Email" disabled/>
        <ErrorMessage name="email"/>
        <button>
          submit
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

  definePageMeta({
    middleware: ['auth']
  })


  const supabase = useSupabaseClient()

  const { data: dataProfile, pending } = await useAsyncData('profiles', () =>
    $fetch('/api/profiles'),{
      server: false,
      lazy: true,
      staleTime: 60 * 1000
    }
  )

  const message = ref('')

  async function handleUploadAvatar(event){
    const file = event.target.files[0]

    if(!file){
      throw new Error ('You must select image to upload')
    }

    const fileExt = file.name.split('.').pop()
    const filePath = `avatar/${Math.random()}.${fileExt}`

    const {error} = await supabase.storage.from('savore-file').upload(filePath, file)

    if (error) {
      message.value = "Gagal upload ke storage"
      console.error(error)
      return
    }

    const {data: publicUrl} = supabase.storage.from('savore-file').getPublicUrl(filePath)
    dataProfile.value.image_url = publicUrl?.publicUrl

  }

  const validationSchema = toTypedSchema(
    z.object({
        name: z.string().trim().min(1,'Name is required'),
        email: z.string().min(1,'Email is required').email('This is not a valid email.'),
    })
  )
  
  async function handleUpdateProfile(values){
    try{
      const {error} = await $fetch(`/api/profiles/${dataProfile.value.id}`, {
        method: 'PUT',
        body: {
          name: values.name,
          email: values.email,
          image_url: dataProfile.value.image_url
        }
      })
      if(error) throw error
      alert("berhasil update data")
    }catch(error){
      return alert(error)
    }
  }
</script>

<style>

</style>