<template>
    <div class="my-4 flex justify-between items-center w-full px-4 sticky top-0 bg-white py-4 z-20 lg:hidden">
        <Sidebar />
        <div class="relative">
            <div class="py-1 pe-4 ps-2 rounded-full border-2 border-black shadow-[0px_4px_0px_-1px_#000000] flex flex-row  items-center gap-2" @click="dropDown = !dropDown">
                <div>
                    <NuxtImg 
                    :src= profile?.image_url
                    alt="image"
                    v-slot="{ src, isLoaded, imgAttrs }"
                    class="size-7 rounded-full ring-2 ring-black"
                    />
                </div>
                <div class="me-2 hidden sm:block">
                    <h4 class="">{{ profile?.name  }}</h4>
                </div>
                <div>
                    <button><Icon name="ri:arrow-drop-down-fill" class="text-xl"/></button>
                </div>
            </div>
            <div v-if="dropDown" class="bg-white absolute border-2 right-0 rounded-xl origin-top-right mt-2 w-56 focus:outline-hidden z-10 transition ease-out duration-100" >
                <div class="py-1 px-1 ">
                    <NuxtLink to="/dashboard/profile" class="block px-4 py-2 text-sm text-gray-700">Update Profiles</NuxtLink>
                </div>
            </div>
        </div>
    </div>
    <div class="hidden lg:flex my-10 justify-end items-end w-full pe-6">
        <div class="relative">
            <div class="py-1 pe-4 ps-2 rounded-full border-2 border-black shadow-[0px_4px_0px_-1px_#000000] flex flex-row  items-center gap-2" @click="dropDown = !dropDown">
                <div>
                    <NuxtImg 
                    :src= profile?.image_url
                    alt="image"
                    v-slot="{ src, isLoaded, imgAttrs }"
                    class="size-7 rounded-full ring-2 ring-black"
                    />
                </div>
                <div class="me-2 hidden sm:block">
                    <h4 class="">{{ profile?.name  }}</h4>
                </div>
                <div>
                    <button><Icon name="ri:arrow-drop-down-fill" class="text-xl"/></button>
                </div>
            </div>
            <div v-if="dropDown" class="bg-white absolute border-2 right-0 rounded-xl origin-top-right mt-2 w-56 focus:outline-hidden z-10 transition ease-out duration-100" >
                <div class="py-1 px-1 ">
                    <NuxtLink to="/dashboard/profile" class="block px-4 py-2 text-sm text-gray-700">Update Profiles</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProfiles } from '~/composables/useProfiles';

    const route = useRoute()
    const pageTitle = computed(() => route.meta.title || 'Untitled')
    const dropDown =ref(false)
    const { data: profile } = await useProfiles()
</script>

<style lang="scss" scoped>

</style>