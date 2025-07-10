<template>
  <div class="pe-5">
    <div class="flex flex-row w-full justify-between items-center">
      <div class="border-2 border-black px-3 py-2 rounded-xl shadow-[0px_4px_0px_-1px_#000000] bg-[#4A52E6] text-white">
        <NuxtLink to="/dashboard/budget/create">Add budget</NuxtLink>
      </div>
      <input
        type="month"
        id="month"
        v-model="selectedMonth"
        @change="refreshData"
        class="border-2 border-black p-2 mb-4 rounded-xl shadow-[0px_4px_0px_-1px_#000000]"
      />
    </div>
    <div class="relative overflow-x-auto border-2 border-black rounded-xl p-4 shadow-[0px_4px_0px_-1px_#000000] mt-10">
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
      <table class="w-full text-sm text-left text-gray-500" v-else>
          <thead class="text-xs text-gray-700 uppercase ">
              <tr>
                  <th scope="col" class="py-3">
                      Category name
                  </th>
                  <th scope="col" class="py-3">
                      Amount
                  </th>
                  <th scope="col" class="py-3">
                      Merchant
                  </th>
                  <th scope="col" class="py-3">
                      Description
                  </th>
                  <th scope="col" class="py-3">
                      Date
                  </th>
                  <th scope="col" class="py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr class="bg-white border-b border-gray-200" v-for="item in transaction" :key="item.id">
                  <td class="py-4">
                      {{ item.category?.name}}
                  </td>
                  <td class="py-4">
                      Rp {{ Number(item?.amount).toLocaleString()}}
                  </td>
                  <td class="py-4">
                     {{ item?.merchant}}
                  </td>
                  <td class="py-4">
                    {{ item?.description}}
                  </td>
                  <td class="py-4">
                    {{ parseISO(item?.date).toLocaleDateString()}}
                  </td>
                  <td class="py-4">
                    ...
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { parseISO } from 'date-fns';

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
  title: 'Transaction'
});
const selectedMonth = ref(new Date().toISOString().slice(0,7))

const { data: transaction, pending, error } = await useAsyncData('transactions', () =>
  $fetch('/api/transaction',{
    query:{
      month: selectedMonth.value
    }
  }),{
    server: false,
    lazy: true,
    watch: [selectedMonth],
    staleTime: 60 * 1000
  }
);

const refreshData = () =>{
  refreshNuxtData('transactions')
};

</script>