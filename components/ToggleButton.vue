<template>
  <div>
    <div
    @click="toggled = !toggled"
    :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300',
      toggled ? 'bg-green-500' : 'bg-gray-300'
    ]"
    >
      <span
        :class="[
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300',
          toggled ? 'translate-x-6' : 'translate-x-1'
        ]"
      />
    </div>
  </div>
</template>

<script setup>
const toggled = defineModel('modelValue', {type: Boolean});
</script>

<style>

</style>