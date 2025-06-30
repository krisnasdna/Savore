<template>
  <div>
    <NuxtLink to="/category/create">Create category</NuxtLink>
    <div v-if="!categories">
        <h1>Belum Ada Data...</h1>
    </div>
    <div v-else>
       <ul>
        <li v-for="(category, index) in categories" :key="index">
          {{ category.name }}<NuxtLink :to="`/category/update/${category.id}`">edit</NuxtLink>
        </li>
       </ul>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const id = computed(() => user.value.id);

  const {data:profile , pending, error} = await useFetch(() => `/api/profiles/${id.value}`);

  const categories = ref()

  watchEffect(async () => {
    if (profile.value && profile.value.id) {
      const { data } = await useFetch(`/api/category/${profile.value.id}`)
      categories.value = data.value
    }
  });

</script>

<style>

</style>