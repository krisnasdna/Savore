// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@nuxt/icon',
    '@prisma/nuxt',
    '@pinia/nuxt',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage',
        },
      },
    ],
    ['@nuxtjs/google-fonts', {
        families: {
          Roboto: true,
          'Work Sans': true,
        }
    }],
    'nuxt-echarts'
  ],
  echarts: {
    charts: ['BarChart'],
    components: ['DatasetComponent', 'GridComponent', 'TooltipComponent'],
  },
  supabase: {
    redirect: false
  },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js'
      }
    }
  },
  nitro: {
    preset: 'vercel',
    externals: {
      external: ['@prisma/client'],
    },
  },
  runtimeConfig:{
    cronSecret: '',
    geminiSecretKey:'',
    public:{

    }
  },
  css: ['~/assets/css/main.css']
})