<template>
  <div class="grid grid-cols-2 justify-center items-center my-10 mx-10">
    <Card>
      <div class="flex flex-col gap-6">
      <Form @submit="onSubmit" :validation-schema="schema">
        <FormField name="name" label="Nama" type="text" />
        <FormField name="age" label="Usia" type="number" />
        <FormField
          name="gender"
          label="Jenis Kelamin"
          type="select"
          :options="[
            { label: 'Laki-laki', value: 'male' },
            { label: 'Perempuan', value: 'female' },
          ]"
        />
        <FormField name="bio" label="Tentang Anda" type="textarea" />

        <button
          type="submit"
          class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </Form>
      </div>
    </Card>
  </div>
</template>

<script  setup>
import { Form } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import FormField from '@/components/FormField.vue'

const schema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    age: z.number().min(0, 'Usia harus positif'),
    gender: z.enum(['male', 'female']),
    bio: z.string().optional(),
  })
)

function onSubmit(values) {
  console.log('Data Form:', values)
}

</script>

<style>

</style>