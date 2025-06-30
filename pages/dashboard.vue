<template>
  <div>
    <div v-if="pending">
      Loading data.......
    </div>
    <div v-else>
      <div>
        <img :src="dataProfile.imageUrl" alt="avatar" class="max-w-xs">
        <input type="file" accept="image/*" @change="handleUploadAvatar">
        <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      </div>
      <form @submit.prevent="handleUpdateProfile">
        <input type="text" v-model="dataProfile.name" placeholder="Enter Your Name">
        <input type="text" v-model="dataProfile.email" placeholder="Enter Your Email" disabled>
        <input type="submit">
      </form>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const id = computed(() => user.value.id)

  const {data:profile , pending, error} = await useFetch(() => `/api/profiles/${id.value}`)

  const dataProfile = reactive({
    id: profile.value.id,
    name: profile.value.name,
    email: profile.value.email,
    imageUrl: profile.value.image_url
  })
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
    dataProfile.imageUrl = publicUrl?.publicUrl
  }

  async function handleUpdateProfile(){
    try{
      const {error} = await $fetch(`/api/profiles/`, {
        method: 'PUT',
        body: {
          id: dataProfile.id,
          name: dataProfile.name,
          email: dataProfile.email,
          image_url: dataProfile.imageUrl
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