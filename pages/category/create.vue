<template>
  <div>
    <h1>{{ profile?.name }}</h1>
      <form @submit.prevent="handleCreateCategory">
        <input type="text" v-model="categoryName" placeholder="Enter Category">
        <input type="submit">
      </form>
  </div>
</template>

<script setup>
    definePageMeta({
    middleware: ['auth']
  })
  const user = useSupabaseUser();
  const router = useRouter()
  const id = computed(() => user.value.id);

  const {data:profile , pending, error} = await useFetch(() => `/api/profiles/${id.value}`);

  const categoryName = ref(null);

  async function handleCreateCategory() {
    try{
      await $fetch(`/api/category`,{
        method: 'POST',
        body:{
          name: categoryName.value,
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