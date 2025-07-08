<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <select v-model="form.categoryId" :disabled="pending">
      <option disabled value="">Pilih Kategori</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>
    </select>
    <div v-if="error" class="text-red-500">Gagal mengambil kategori</div>
    <select v-model="form.type">
        <option disabled value="">Pilih Tipe</option>
        <option v-for="(type,index) in types" :key="index" :value="type">{{ type }}</option>
    </select>
    <input v-model="form.amount" type="number" placeholder="Jumlah" class="input" />
    <input v-model="form.description" type="text" placeholder="Description" class="input" />
    <input v-model="form.date" type="date" placeholder="Date" class="input" />
    <h1>Recurring</h1>
    <ToggleButton v-model="form.is_recurring"/>
    <div v-if="form.is_recurring">
        <select v-model="form.recurring_interval" >
            <option :value="null" disabled selected >Pilih Tipe</option>
            <option v-for="(interval,index) in intervals" :key="index" :value="interval">{{ interval }}</option>
        </select>
        <input v-model="form.next_recurring_date" type="date" placeholder="Date" class="input" />
        <input v-model="form.last_processed" type="date" placeholder="Date" class="input" />
    </div>
    <button :disabled="loading" class="btn">
      {{ loading ? 'Mengirim...' : 'Simpan Budget' }}
    </button>
    <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import ToggleButton from '~/components/ToggleButton.vue'

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});

const form = reactive({
    type: '',
    amount: null,
    description: null,
    date: null,
    is_recurring: false,
    recurring_interval: null,
    next_recurring_date: null,
    last_processed: null,
    categoryId: ''
})

const types = ["INCOME","EXPENSE"]
const intervals = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { data: categories, pending, error } = await useCategories()

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const res = await $fetch('/api/transaction', {
      method: 'POST',
      body: { ...form }
    })

    if (res.success) {
      successMessage.value = 'Transaction berhasil disimpan!'
      form.type ='',
      form.description = null,
      form.date = null,
      form.is_recurring = false,
      form.recurring_interval = null,
      form.next_recurring_date = null,
      form.last_processed = null
      form.amount = null
      form.categoryId = ''
      navigateTo('/transaction')
    } else {
      errorMessage.value = res.error?.[0]?.message || 'Terjadi kesalahan'
    }
  } catch (err) {
    errorMessage.value = err.data?.statusMessage || 'Gagal mengirim data'
  } finally {
    loading.value = false
  }
}
</script>

<style>

</style>