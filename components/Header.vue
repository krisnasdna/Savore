<template>
    <div class="my-10 flex justify-between items-center">
        <div>
            <h1 class="text-3xl font-bold ">Dashboard</h1>
        </div>
        <div class="">
            <div class="py-1 pe-4 ps-2 rounded-full border-2 border-black shadow-[0px_4px_0px_-1px_#000000] flex flex-row  items-center gap-2">
                <div>
                    <NuxtImg 
                    :src= profile?.image_url
                    alt="image"
                    v-slot="{ src, isLoaded, imgAttrs }"
                    class="inline-block size-7 rounded-full ring-2 ring-black"
                    />
                </div>
                <div class="me-2">
                    <h4 class="">{{ profile?.name  }}</h4>
                </div>
                <div>
                    <button><Icon name="ri:arrow-drop-down-fill" class="text-xl"/></button>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { useProfiles } from '~/composables/useProfiles';

  definePageMeta({
    middleware: ['auth']
  });
  
  const supabase = useSupabaseClient()

  const { data: profile } = await useProfiles()
</script>

<style lang="scss" scoped>

</style>