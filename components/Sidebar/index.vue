<template>
    <!-- mobile -->
    <div class="h-full flex lg:hidden">
    <div v-if="!openSidebar" class="h-full w-full flex justify-start items-start lg:hidden">
        <div class="border-2 border-blak rounded-xl py-1 px-3 shadow-[0px_4px_0px_-1px_#000000]" @click="openSidebar = !openSidebar">
            <Icon name="ic:round-menu"  size="30"/>
        </div>
    </div>
    <div v-else class="bg-white absolute z-[9999] w-full top-0 left-0 h-screen">
        <div class="flex flex-col gap-10 py-3 px-4 bg-white w-full">
            <div class="flex flex-row justify-between items-center w-full">
                <div>
                    <Logo/>
                </div>
                <div class="border-2 border-black rounded-xl px-4 py-2 shadow-[0px_4px_0px_-1px_#000000] justify-self-end" @click="openSidebar = !openSidebar">
                    <Icon name="icon-park-outline:close" class="text-xl"/>
                </div>
            </div>
            <div class="" @click="openSidebar = !openSidebar" >
                <div class="flex flex-col justify-start items-start p-1">
                    <div class="h-full">
                        <SidebarMenu />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    

    <!-- Desktop -->
    <div class="hidden lg:flex">
        <div v-if="!openSidebar" class="h-full ms-5 my-10 text-end w-full lg:flex justify-center items-end hidden" >
            <div class="border-2 border-blak rounded-xl py-2 px-4 shadow-[0px_4px_0px_-1px_#000000]" @click="openSidebar = !openSidebar">
                <Icon name="ic:round-menu" class="text-xl"/>
            </div>
        </div>
        <div v-else>
            <div class="hidden sm:flex flex-col justify-start items-start p-10 border-r-2 border-black gap-10 max-h-screen h-screen z-50">
                <div class="flex flex-row justify-between items-end w-full">
                    <div>
                        <Logo/>
                    </div>
                    <div class="border-2 border-black rounded-xl px-4 py-2 shadow-[0px_4px_0px_-1px_#000000] justify-self-end" @click="openSidebar = !openSidebar">
                        <Icon name="icon-park-outline:close" class="text-xl"/>
                    </div>
                </div>
                <div class="h-full">
                    <SidebarMenu  />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const openSidebar = ref(false);

</script>

<style lang="scss" scoped>

</style>