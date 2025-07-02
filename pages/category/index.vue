<template>
  <div>
    <NuxtLink to="/category/create">Create category</NuxtLink>

    <div v-if="pending">
      Loading...
    </div>

    <div v-else-if="error">
      Terjadi kesalahan: {{ error.message }}
    </div>

    <div v-else-if="isEmpty">
      Belum ada data...
    </div>

    <ul v-else>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
        <NuxtLink :to="`/category/update/${category.id}`"> edit</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const { data: categories, pending, error } = await useAsyncData('categories', () =>
  $fetch('/api/category'),{
    server: false,
    lazy: true,
    staleTime: 60 * 1000
  }
)

const isEmpty = computed(() =>
  Array.isArray(categories.value) && categories.value.length === 0
)

</script>
