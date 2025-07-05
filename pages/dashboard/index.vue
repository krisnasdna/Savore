<template>
  <div>
    <ClientOnly >
      <h1> HELLO {{ profile?.name}} </h1>
      <NuxtLink to="/dashboard/category">Category</NuxtLink>
      <NuxtLink to="/dashboard/profile"> Profile</NuxtLink>
      <NuxtLink to="/dashboard/budget"> Budget</NuxtLink>
      <NuxtLink to="/dashboard/transaction"> Transaction</NuxtLink>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useProfiles } from '~/composables/useProfiles';

  definePageMeta({
    middleware: ['auth']
  });
  
  const { data: profile, pending, error } = await useProfiles()

</script>

<style>

</style>