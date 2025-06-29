<template>
    <div>
        <form @submit.prevent="handleSignup">
            <input type="email" v-model="user.email" placeholder="Enter Your Email">
            <input type="password" v-model="user.password" placeholder="Enter Your Email">
            <input type="submit" :value="loading ? 'Loading' : 'Signup'" :disabled="loading">
        </form>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient()
    const user = reactive({
        email: '',
        password: ''
    })
    const loading = ref(false)
    async function handleSignup() {
        try{
        const {error} = await supabase.auth.signUp({
            email: user.email,
            password: user.password
        })
        if(error) throw error
            alert('Cek Email Kamu Untuk Verifikasi!')
        }catch(error){
            alert(error.message)
        }finally{
            loading.value = false
        }
    }
</script>