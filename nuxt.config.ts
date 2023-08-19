import { defineNuxtConfig } from 'nuxt/config'
import { IntlifyModuleOptions } from '@intlify/nuxt3'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions
  }
}

const lifecycle = process.env.npm_lifecycle_event

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'DLSL',
      meta: [
        { charset: 'utf-8' },
        { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'theme-color', content: '#151314' },

        {
          name: 'viewport',
          content:
            'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0',
        },
        { hid: 'description', name: 'description', content: 'DLSL' },
        { property: 'og:title', content: 'DLSL' },
        { property: 'og:description', content: 'DLSL' },
        { property: 'og:image', content: '/branding/logo.png' },
        { property: 'og:locale', content: 'en_GB' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],

      link: [
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'icon', type: 'image/png', href: '/branding/favicon.png' },
        { rel: 'apple-touch-icon', href: '/branding/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/x-icon', href: 'branding/favicon.ico' },

        {
          rel: 'preload',
          href: '/branding/fonts/Roboto/Roboto-Regular.ttf',
          as: 'font',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/branding/fonts/Roboto/Roboto-Bold.ttf',
          as: 'font',
          crossorigin: 'anonymous',
        },

        {
          as: 'style',
          rel: 'stylesheet preload',
          type: 'text/css',
          href: '/branding/fonts/index.css',
          crossorigin: 'anonymous',
        },

        { href: '/noscript/style.css', type: 'text/css', rel: 'stylesheet' },
        { href: '/init-loader/style.css', type: 'text/css', rel: 'stylesheet' },
      ],
    },
  },

  css: ['@/assets/styles/app.scss'],

  modules: ['@intlify/nuxt3', '@pinia/nuxt', '@vueuse/nuxt'],

  build: {
    transpile: [
      'vue-toastification',
      lifecycle !== 'dev' ? '@distributedlab/tools' : '',
    ],
  },

  devServer: {
    port: 8000,
  },

  vite: {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
        symbolId: '[name]',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "assets/styles/_functions.scss";
            @import "assets/styles/_mixins.scss";
          `,
        },
      },
    },
    resolve: {
      alias: {
        '@distributedlab/fetcher':
          '/node_modules/@distributedlab/fetcher/dist/esm/index.js',
      },
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  nitro: {
    preset: 'node-server',
  },
})
