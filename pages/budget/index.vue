<template>
  <div>
    <NuxtLink to="/budget/create">Create Budget</NuxtLink>

    <h2 class="text-xl font-bold mb-4">Perbandingan Budget per Kategori</h2>

    <div v-if="pending">Loading...</div>

    <div v-else-if="error">Terjadi kesalahan: {{ error.message }}</div>

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
  middleware: ['auth']
});

const { data: budgets, pending, error } = await useAsyncData('budgets', () =>
  $fetch('/api/budget'),{
    server: false,
    lazy: true,
    staleTime: 60 * 1000
  }
);


</script>
