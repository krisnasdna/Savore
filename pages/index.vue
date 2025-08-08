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

        <Button class="bg-black text-white">
          Submit
        </Button>
      </Form>
      </div>
    </Card>
  </div>
</template>

<script  setup lang="ts">
import { Form } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import FormField from '@/components/FormField.vue'
import { Button } from '@/components/Ui/button'

const schema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    age: z.number().min(0, 'Usia harus positif'),
    gender: z.enum(['male', 'female']),
    bio: z.string().optional(),
  })
)

function onSubmit(values: {}) {
  console.log('Data Form:', values)
}

</script>

<style>

</style>