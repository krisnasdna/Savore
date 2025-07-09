<template>
  <div v-if="pending" class="flex flex-col items-center justify-center h-full gap-4">
      <Icon name="svg-spinners:ring-resize" class="text-3xl"/>
      <h1>Loading...</h1>
  </div>

  <div v-else-if="error">
    Terjadi kesalahan: {{ error.message }}
  </div>

  <div v-else-if="isEmpty" class="flex items-center justify-center">
    <h1>Belum ada data category</h1>
  </div>
  <div v-else>
    <div class="flex items-center justify-between">
      <div class="border-2 border-black px-3 py-2 rounded-xl shadow-[0px_4px_0px_-1px_#000000] bg-[#4A52E6] text-white">
        <NuxtLink to="/dashboard/category/create">Add category</NuxtLink>
      </div>
      <div>
        <div>
          <form action="">
            <div class="relative">
              <Icon  name="iconamoon:search" class="absolute ml-3 mt-3 text-xl pointer-events-none"/>
              <input type="text" name="serach" id="" placeholder="Search" class="py-2 ps-10 border-2 border-black rounded-xl shadow-[0px_4px_0px_-1px_#000000] focus:border-black">
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="relative overflow-x-auto border-2 border-black rounded-xl p-4 shadow-[0px_4px_0px_-1px_#000000] mt-10">
      <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase ">
              <tr>
                  <th scope="col" class="py-3">
                      Category name
                  </th>
                  <th scope="col" class="py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr class="bg-white border-b border-gray-200" v-for="category in categories" :key="category.id">
                  <td class="py-4">
                      {{ category.name }}
                  </td>
                  <td class="py-4">
                      Laptop
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>

</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
  title: 'Category'
});

const { data: categories, pending, error } = await useCategories()

const isEmpty = computed(() =>
  Array.isArray(categories.value) && categories.value.length === 0
)

</script>
