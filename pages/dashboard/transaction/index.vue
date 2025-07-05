<template>
  <div>
    <NuxtLink to="/dashboard/transaction/ai">Create transaction</NuxtLink>
    <h2 class="text-xl font-bold mb-4">Transaction</h2>

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

    <div v-else-if="transaction.length === 0">
      <p class="text-gray-500">Tidak ada transaksi pada bulan ini.</p>
    </div>
    
    <div v-else>
      <ul class="space-y-4">
        <li
          v-for="item in transaction"
          :key="item.id"
          class="p-4 bg-white rounded-lg shadow"
        >
          <p class="font-semibold">{{ item.category?.name }}</p>
          <p>Amount: Rp {{ Number(item.amount).toLocaleString()}}</p>
          <p>Merchant: {{ item.merchant}}</p>
          <p>Description: {{ item.description}}</p>
          <p>Date: {{ parseISO(item.date).toLocaleDateString()}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { parseISO } from 'date-fns';

definePageMeta({
  middleware: ['auth']
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