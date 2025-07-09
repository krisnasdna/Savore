<template>
  <div>
    <div class="col-span-full">
      <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">Cover photo</label>
      <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div class="text-center">
          <svg class="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
          </svg>
          <div class="mt-4 flex text-sm/6 text-gray-600">
            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" class="sr-only" />
            </label>
            <p class="pl-1">or drag and drop</p>
          </div>
          <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
    <div>
       <h1>Scan Struk</h1>
       <input type="file" accept="image/jpeg" @change="handleFile">
       <p v-if="loading">Menganalisis gambar...</p>
    </div>
    <div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <select v-model="form.categoryId" :disabled="pending">
          <option disabled value="">Pilih Kategori</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <div v-if="error" class="text-red-500">Gagal mengambil kategori</div>
        <input v-model="form.amount" type="number" placeholder="Jumlah" class="input" />
        <input v-model="form.merchant" type="text" placeholder="Merchant" class="input" />
        <input v-model="form.description" type="text" placeholder="Description" class="input" />
        <input v-model="form.date" type="date" placeholder="Date" class="input" />
        <h1>Recurring</h1>
        <ToggleButton v-model="form.is_recurring"/>
        <div v-if="form.is_recurring">
            <select v-model="form.recurring_interval" >
                <option :value="null" disabled selected >Pilih Tipe</option>
                <option v-for="(interval,index) in intervals" :key="index" :value="interval">{{ interval }}</option>
            </select>
        </div>
        <button :disabled="loading" class="btn">
          {{ loading ? 'Mengirim...' : 'Simpan Budget' }}
        </button>
        <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { parse, format, parseISO } from 'date-fns'
import ToggleButton from '~/components/ToggleButton.vue'

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});

const image = ref(null)
const form = reactive({
    merchant: null,
    amount: null,
    description: null,
    date: null,
    is_recurring: false,
    recurring_interval: null,
    categoryId: ''
})

const intervals = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { data: categories, pending, error } = await useCategories()

const handleFile = async (event) => {
  const file = event.target.files[0]

  if (!file) return 

  const reader = new FileReader()
  reader.onload = async () => {
    image.value = reader.result.split(',')[1]
    await analyzeImage()
  }
  reader.readAsDataURL(file)
}

const analyzeImage = async () =>{
  loading.value = true
  try{
    const res = await $fetch('/api/transaction/gemini-ai',{
      method: 'POST',
      body: {
        image: image.value,
        category: categories.value
      }
    })

    if(res && res.amount){
      console.log()
      form.merchant = res.merchant
      form.description = res.description
      form.date = format(parse(parseISO(res.date).toLocaleDateString(), 'M/d/yyyy', new Date()), 'yyyy-MM-dd')
      form.is_recurring = false
      form.recurring_interval = null
      form.amount = res.amount
      form.categoryId = res.categoryId
    }else{
      alert('Gagal mengenali data dari struk')
    }
  }catch(error){
    alert('Error: ' + error.message)
  }finally{
    loading.value = false
  }
}

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
      form.merchant = null
      form.description = null
      form.date = null
      form.is_recurring = false
      form.recurring_interval = null
      form.amount = null
      form.categoryId = ''
      navigateTo('/dashboard/transaction')
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