<template>
  <div class="hidden lg:flex items-start gap-10 max-w-screen max-h-screen">
    <Sidebar />
    <div class="w-full h-screen">
      <Header />
      <slot />
    </div>
  </div>
  <div class="grid grid-cols-1 lg:hidden items-start  max-w-screen max-h-screen">
    <Header/>
    <slot/>
  </div>
</template>

<script  setup>

</script>

<style>

</style>