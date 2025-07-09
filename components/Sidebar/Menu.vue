<template>
    <div class="flex flex-col justify-between h-full" >
        <div class="flex flex-col gap-3">
            <NuxtLink v-for="(menu, index) in menus" :key="index" :to=menu.path class="flex items-center gap-3 font-work-sans" :class="{'bg-[#4DE980] py-3 ps-[15px] pe-20 rounded-xl border-2 border-black shadow-[0px_4px_0px_-1px_#000000] transition duration-300 ease-in-out delay-10 font-bold':menu.path === '/dashboard'? route.path === menu.path: route.path.startsWith(menu.path),'text-[#78778B] py-3 ps-[15px] pe-20':!(menu.path === '/dashboard'? route.path === menu.path: route.path.startsWith(menu.path))}"><Icon :name=menu.icon class="text-2xl" /> {{ menu.title }}</NuxtLink>
        </div>
        <div class="">
            <button @click="handleLogout" class="flex items-center gap-3 py-3 ps-[15px] pe-20 text-[#78778B] cursor-pointer"><Icon name="solar:logout-bold-duotone" class="text-3xl"/> Logout</button>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const supabase =useSupabaseClient()
const menus = ref([
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'ri:home-5-fill'
    },
    {
        title: 'Transaction',
        path: '/dashboard/transaction',
        icon: 'ri:exchange-fill'
    },
    {
        title: 'Budget',
        path: '/dashboard/budget',
        icon: 'clarity:piggy-bank-solid'
    },
    {
        title: 'Category',
        path: '/dashboard/category',
        icon: 'ri:archive-stack-fill'
    }

]);
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

<style lang="scss" scoped>

</style>