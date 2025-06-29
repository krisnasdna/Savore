<template>
    <div>
        <form @submit.prevent="handleLogin">
            <input type="email" v-model="user.email" placeholder="Enter Your Email">
            <input type="password" v-model="user.password" placeholder="Enter Your Email">
            <input type="submit">
        </form>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient()
    const router = useRouter()
    const user = reactive({
        email: '',
        password: ''
    })
    async function handleLogin() {
        try{
        const {error} = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        })
        if(error) throw error
        router.push('/profile')
        }catch(error){
            alert(error.message)
        }
    }
</script>