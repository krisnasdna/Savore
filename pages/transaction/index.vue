<template>
  <div>
    <NuxtLink to="/transaction/create">Create transaction</NuxtLink>

    <h2 class="text-xl font-bold mb-4">Transaction</h2>

    <div v-if="pending">Loading...</div>

    <div v-else-if="error">Terjadi kesalahan: {{ error.message }}</div>

    <div v-else>
      <ul class="space-y-4">
        <li
          v-for="item in transaction"
          :key="item.id"
          class="p-4 bg-white rounded-lg shadow"
        >
          <p class="font-semibold">{{ item.category?.name }}</p>
          <p>type: {{ item.type}}</p>
          <p>Amount: Rp {{ Number(item.amount).toLocaleString()}}</p>
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

const { data: transaction, pending, error } = await useAsyncData('transactions', () =>
  $fetch('/api/transaction'),{
    server: false,
    lazy: true,
    staleTime: 60 * 1000
  }
);


</script>