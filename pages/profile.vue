<template>
    <div>
        <h1>Hello {{ user.email }}</h1>
        <button @click="handleLogout">
            Logout
        </button>
    </div>
</template>

<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const router = useRouter()

    async function handleLogout(){
        try{
            const {error} = await supabase.auth.signOut()
            if(error) throw error
            router.push('/auth')
        }catch(error){
            alert(error)
        }
    }
</script>