<template>
  <div class="px-4 lg:px-0 lg:pe-5 py-5">
    <div class="flex flex-row w-full justify-between items-center">
      <div class="border-2 border-black px-3 py-2 rounded-xl shadow-[0px_4px_0px_-1px_#000000] bg-[#4A52E6] text-white">
        <NuxtLink to="/dashboard/budget/create">Add budget</NuxtLink>
      </div>
      <div>
        
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
                      Bulan Ini
                  </th>
                  <th scope="col" class="py-3">
                      Transaksi now
                  </th>
                  <th scope="col" class="py-3">
                      Diffrent
                  </th>
                  <th scope="col" class="py-3">
                      Bulan lalu
                  </th>
                  <th scope="col" class="py-3">
                      Transaksi old
                  </th>
                  <th scope="col" class="py-3">
                      Diffrent
                  </th>
                  <th scope="col" class="py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr class="bg-white border-b border-gray-200" v-for="item in budgets" :key="item.categoryId">
                  <td class="py-4">
                      {{ item.categoryName }}
                  </td>
                  <td class="py-4">
                      Rp {{ item.budgetTotalNow.toLocaleString() }}
                  </td>
                  <td class="py-4">
                      Rp {{ item.trxTotalNow.toLocaleString() }}
                  </td>
                  <td class="py-4">
                    <span :class="item.differenceNow >= 0 ? 'text-green-600' : 'text-red-600'">
                      {{ item.differenceNow >= 0 ? '+' : '-' }}
                      Rp {{ Math.abs(item.differenceNow).toLocaleString() }}
                    </span>
                  </td>
                  <td class="py-4">
                    Rp {{ item.budgetTotalPrev.toLocaleString() }}
                  </td>
                  <td class="py-4">
                    Rp {{ item.trxTotalPrev.toLocaleString() }}
                  </td>
                  <td class="py-4">
                    <span :class="item.differencePrev >= 0 ? 'text-green-600' : 'text-red-600'">
                      {{ item.differencePrev >= 0 ? '+' : '-' }}
                      Rp {{ Math.abs(item.differencePrev).toLocaleString() }}
                    </span>
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
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
  title: 'Budget'
});

const selectedMonth = ref(new Date().toISOString().slice(0,7))

const { data: budgets, pending, error } = await useAsyncData('budgets', () =>
  $fetch('/api/budget',{
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

const isEmpty = computed(() =>
  Array.isArray(budgets.value) && budgets.value.length === 0
)

const refreshData = () =>{
  refreshNuxtData('budgets')
};
</script>
