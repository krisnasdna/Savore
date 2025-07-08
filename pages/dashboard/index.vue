<template>
  <div class="flex flex-row justify-start gap-6">
      <div class="bg-[#4A52E6] py-6 ps-6 pe-8 rounded-xl border-2 border-black shadow-[0px_4px_0px_-1px_#000000]">
        <div class="flex felx-row items-center gap-4">
          <div class="size-10 rounded-full ring-1 ring-black bg-[#F3F3F3] flex items-center justify-center">
              <Icon name="clarity:piggy-bank-solid" class="text-2xl text-[#4A52E6]"/>
          </div>
          <div class="flex flex-col gap-2">
              <h5 class="text-white">Income</h5>
              <h1 class="text-white font-bold text-2xl">$5240.21</h1>
          </div>
        </div>
      </div>
      <div class="bg-[#4A52E6] py-6 ps-6 pe-8 rounded-xl border-2 border-black shadow-[0px_4px_0px_-1px_#000000]">
        <div class="flex felx-row items-center gap-4">
          <div class="size-10 rounded-full ring-1 ring-black bg-[#F3F3F3] flex items-center justify-center">
              <Icon name="clarity:piggy-bank-solid" class="text-2xl text-[#4A52E6]"/>
          </div>
          <div class="flex flex-col gap-2">
              <h5 class="text-white">Income</h5>
              <h1 class="text-white font-bold text-2xl">$5240.21</h1>
          </div>
        </div>
      </div>
      <div class="bg-[#4A52E6] py-6 ps-6 pe-8 rounded-xl border-2 border-black shadow-[0px_4px_0px_-1px_#000000]">
        <div class="flex felx-row items-center gap-4">
          <div class="size-10 rounded-full ring-1 ring-black bg-[#F3F3F3] flex items-center justify-center">
              <Icon name="clarity:piggy-bank-solid" class="text-2xl text-[#4A52E6]"/>
          </div>
          <div class="flex flex-col gap-2">
              <h5 class="text-white">Income</h5>
              <h1 class="text-white font-bold text-2xl">$5240.21</h1>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { useProfiles } from '~/composables/useProfiles';

  definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard'
  });

  const supabase = useSupabaseClient()

  const { data: profile } = await useProfiles()
  
</script>

<style>

</style>