<template>
  <div>
    Welcome to Dashboard {{profile.id}}
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
  const user = useSupabaseUser()
  const id = computed(() => user.value.id)

  const {data:profile} = await useFetch(() => `/api/profiles/${id.value}`)
</script>

<style>

</style>