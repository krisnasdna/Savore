<template>
  <div>
    <NuxtLink to="/dashboard/category/create">Create category</NuxtLink>

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
        <NuxtLink :to="`/dashboard/category/update/${category.id}`"> edit</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})


const { data: categories, pending, error } = await useCategories()

const isEmpty = computed(() =>
  Array.isArray(categories.value) && categories.value.length === 0
)

</script>
