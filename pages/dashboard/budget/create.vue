<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <input v-model.number="form.amount" type="number" placeholder="Jumlah" class="input" />

    <select v-model="form.categoryId" :disabled="pending">
      <option disabled value="">Pilih Kategori</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>
    </select>

    <div v-if="error" class="text-red-500">Gagal mengambil kategori</div>

    <button :disabled="loading" class="btn">
      {{ loading ? 'Mengirim...' : 'Simpan Budget' }}
    </button>

    <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const form = reactive({
  amount: null,
  categoryId: ''
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { data: categories, pending, error } = await useCategories()

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const res = await $fetch('/api/budget', {
      method: 'POST',
      body: { ...form }
    })

    if (res.success) {
      successMessage.value = 'Budget berhasil disimpan!'
      form.amount = null
      form.categoryId = ''
      navigateTo('/dashboard/budget')
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