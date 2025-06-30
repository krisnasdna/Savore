<template>
    <div>
        <h1>Hello {{ data.email }}</h1>
        <button @click="router.push('/profile/update')">
            Update
        </button>
        <button @click="handleLogout">
            Logout
        </button>
    </div>
</template>

<script setup>
  const router = useRouter()
  const {data, error}= await useFetch('/api/profiles')
  console.log(data)
</script>