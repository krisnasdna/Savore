<template>
  <div class="mb-5">
    <label :for="props.name" class="text-gray-600 ">{{ props.label }}</label>

    <Field :name="name" v-if="type === 'text' || type === 'password' || type === 'email' || type === 'number'" v-slot="{ field, meta }">
      <input
        v-bind="{ ...field, ...attrs }"
        :type="type"
        :id="name"
        autocomplete="on"
        class="w-full px-3 py-2 rounded border"
        :class="{
          'border-red-500': meta.touched && !meta.valid,
          'border-gray-300': meta.valid,
        }"
      />
    </Field :name="name" v-if="type === 'select'" v-slot="{ field, meta }">

   <!-- Select -->
    <Field :name="name" v-else-if="type === 'select'" v-slot="{ field, meta }">
      <select
        v-bind="{ ...field, ...attrs }"
        :id="name"
        class="w-full px-3 py-2 rounded border"
        :class="{
          'border-red-500': meta.touched && !meta.valid,
          'border-gray-300': meta.valid,
        }"
      >
        <option v-if="loading">Loading...</option>
        <option v-else v-for="(opt, i) in options" :key="i" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </Field>

    <!-- Textarea -->
    <Field :name="name" v-else-if="type === 'textarea'" v-slot="{ field, meta }">
      <textarea
        v-bind="{ ...field, ...attrs }"
        :id="name"
        rows="4"
        class="w-full px-3 py-2 rounded border"
        :class="{
          'border-red-500': meta.touched && !meta.valid,
          'border-gray-300': meta.valid,
        }"
      />
    </Field>
    <ErrorMessage :name="name" class="text-red-500 text-sm mt-1" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  name: String,
  type: String,
  label: String,
  options: Array,
  loading: Boolean
});

const attrs = useAttrs();
</script>

<style>

</style>