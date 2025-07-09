<template>
  <div class="flex sm:hidden">
      <slot />
  </div>
  <div class="hidden sm:flex items-start gap-10 overflow-hidden max-w-screen max-h-screen">
    <Sidebar />
    <div class="w-full me-5">
      <Header />
      <slot />
    </div>
  </div>
</template>

<script  setup>

</script>

<style>

</style>