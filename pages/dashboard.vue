<template>
  <div>
    <ClientOnly >
      <h1> HELLO {{ profile.name}} </h1>
      <NuxtLink to="/category">Category</NuxtLink>
      <NuxtLink to="/profile"> Profile</NuxtLink>
      <NuxtLink to="/budget"> Budget</NuxtLink>
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