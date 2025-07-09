<template>
  <div>
    <NuxtLink to="/dashboard/budget/create">Create Budget</NuxtLink>

    <h2 class="text-xl font-bold mb-4">Budget</h2>
    <label for="month" class="block mb-2 font-medium">Filter Bulan</label>
    <input
      type="month"
      id="month"
      v-model="selectedMonth"
      @change="refreshData"
      class="border p-2 rounded mb-4"
    />

    <div v-if="pending">Loading...</div>

    <div v-else-if="error">Terjadi kesalahan: {{ error.message }}</div>
    <div v-else-if="budgets.length === 0">
      <p class="text-gray-500">Belum ada budget pada bulan ini.</p>
    </div>
    <div v-else>
      <ul class="space-y-4">
        <li
          v-for="item in budgets"
          :key="item.categoryId"
          class="p-4 bg-white rounded-lg shadow"
        >
          <p class="font-semibold">{{ item.categoryName }}</p>
          <p>Bulan Ini: Rp {{ item.budgetTotalNow.toLocaleString() }}</p>
          <p>Transaksi Bulan Ini: Rp {{ item.trxTotalNow.toLocaleString() }}</p>
          <p>
            Selisih:
            <span :class="item.differenceNow >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ item.differenceNow >= 0 ? '+' : '-' }}
              Rp {{ Math.abs(item.differenceNow).toLocaleString() }}
            </span>
          </p>
          <p>Bulan Lalu: Rp {{ item.budgetTotalPrev.toLocaleString() }}</p>
          <p>Transaksi Bulan Ini: Rp {{ item.trxTotalPrev.toLocaleString() }}</p>
          <p>
            Selisih:
            <span :class="item.differencePrev >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ item.differencePrev >= 0 ? '+' : '-' }}
              Rp {{ Math.abs(item.differencePrev).toLocaleString() }}
            </span>
          </p>
        </li>
      </ul>
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

const refreshData = () =>{
  refreshNuxtData('budgets')
};
</script>
