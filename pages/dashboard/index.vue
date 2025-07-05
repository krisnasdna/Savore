<template>
  <div>
    <ClientOnly >
      <h1> HELLO {{ profile?.name}} </h1>
      <NuxtLink to="/dashboard/category">Category</NuxtLink>
      <NuxtLink to="/dashboard/profile"> Profile</NuxtLink>
      <NuxtLink to="/dashboard/budget"> Budget</NuxtLink>
      <NuxtLink to="/dashboard/transaction"> Transaction</NuxtLink>
      <button @click="handleLogout">
        logout
      </button>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useProfiles } from '~/composables/useProfiles';

  definePageMeta({
    middleware: ['auth']
  });
  const supabase = useSupabaseClient()

  const { data: profile } = await useProfiles()
  async function handleLogout() {
      try{
        const { error } = await supabase.auth.signOut()
        if(error) throw error
        alert('berhasil logout')
        navigateTo('/')
      }catch(e){

      }
  }
</script>

<style>

</style>