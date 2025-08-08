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
    '@vee-validate/nuxt',
    'shadcn-nuxt',
    ['@nuxtjs/google-fonts', {
        families: {
          Roboto: true,
          'Work Sans': true,
        }
    }],
    'nuxt-echarts'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
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