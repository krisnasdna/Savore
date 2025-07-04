<template>
  <div>
    <div>
       <h1>Scan Struk</h1>

       <input type="file" accept="image/*" @change="handleFile">

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
    </div>
  </div>
</template>

<script setup>
import { parse, format, parseISO } from 'date-fns'
import ToggleButton from '~/components/ToggleButton.vue'

definePageMeta({
  middleware: ['auth']
})

const image = ref(null)
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
      form.type =''
      form.description = res.description
      form.date = format(parse(parseISO(res.date).toLocaleDateString(), 'M/d/yyyy', new Date()), 'yyyy-MM-dd')
      form.is_recurring = false
      form.recurring_interval = null
      form.next_recurring_date = null
      form.last_processed = null
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
      form.type =''
      form.description = null
      form.date = null
      form.is_recurring = false
      form.recurring_interval = null
      form.next_recurring_date = null
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