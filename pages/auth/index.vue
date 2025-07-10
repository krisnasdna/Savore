<template>
    <div class="max-w-full my-4 mx-4 sm:mx-6 max-h-full">
        <div class="grid sm:grid-cols-2 gap-8  justify-center items-center">
            <div class="bg-transparent sm:bg-black my-4 rounded-xl w-full hidden sm:inline-block">
                <div class="flex justify-between items-center px-10 py-10 text-white">
                    <div>
                        <img src="/image/savore-transparent.png" alt="" width="150">
                    </div>
                    <div>
                        <NuxtLink to="/" class="flex flex-row items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8l-4 4m0 0l4 4m-4-4h20" />
                            </svg>
                            Back
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center mt-20 gap-10 px-40">
                    <div>
                        <img src="/image/image.png" alt="" width="500">
                    </div>
                    <div class="text-center my-14">
                        <h1 class="text-white font-semibold text-3xl">Sets Goals And Budgets Smarter</h1>
                        <p class="text-white mt-4">Stay on track with customized budgets and gain insightst tailored to your spending</p>
                    </div>
                </div>
            </div>
            <div class="sm-0 justify-self-start sm:justify-self-center">
                <div class="flex items-center justify-between mb-8 relative sm:hidden">
                    <div>
                        <NuxtLink to="/" class="flex flex-row items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8l-4 4m0 0l4 4m-4-4h20" />
                            </svg>
                        </NuxtLink>
                    </div>
                    <div>
                        <Logo />
                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    <h1 class="font-bold text-2xl mb-2">Welcome Back</h1>
                    <p class="text-stone-700 mb-8">Your money journey starts here. Ready to make smarter choices?</p>
                </div>
                <div>
                    <Form :validation-schema="validateSchema" @submit="handleLogin">
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-col gap-1">
                                <label for="name" class="text-gray-600">Email address</label>
                                <Field name="email" type="email" placeholder="Enter Your Email" class="border-2 rounded-xl border-gray-200 p-3"/>
                                <ErrorMessage name="email" class="text-red-600 text-sm"/>
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="name" class="text-gray-600">Password</label>
                                <Field name="password" type="password" placeholder="Enter Your Password" class="border-2 rounded-xl border-gray-200 p-3"/>
                                <ErrorMessage name="password" class="text-red-600 text-sm"/>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-1 text-gray-600 text-sm">
                                    <input type="checkbox" name="" id="">Keep me signed in
                                </div>
                                <div>
                                    <NuxtLink to="/auth/reset" class="text-purple-800 underline">Forgot Password?</NuxtLink>
                                </div>
                            </div>
                            <div class="mt-4">
                                <button type="submit" class="bg-blue-500 py-2 px-1 text-white rounded-2xl w-full text-lg">Sign In</button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div class="mt-4">
                    <div class="w-full bg-blue-100 rounded-xl py-3 px-1 text-center">
                        <h3 class="text-gray-600">Don't have an account? <NuxtLink to="/auth/signup" class="text-blue-600">Sign Up</NuxtLink></h3>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'

    const supabase = useSupabaseClient()
    const router = useRouter()
    const validateSchema = toTypedSchema(
        z.object({
            email: z.string().min(1, 'Email is required').email(),
            password: z.string().trim().min(1, 'Password is required')
        })
    )

    async function handleLogin(values) {
        try{
            const {error} = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password
            })
            if(error) throw error
            router.push('/dashboard')
        }catch(error){
            alert(error.message)
        }
    }
</script>