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
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
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

      noscript: [
        {
          innerHTML:
            '<noscript>\n' +
            '  <div class="noscript">\n' +
            '    <div class="noscript__wrp">\n' +
            '      <h2>Update your browser or enable JavaScript</h2>\n' +
            '      <p class="noscript__message">Your browser either does not support JavaScript, or it has JavaScript support disabled. If you want to correctly view this page, please upgrade your browser or <a class="noscript__enable-support" href="https://www.enablejavascript.io/" target="_blank">enable JavaScript support</a>.</p>\n' +
            '      <p>These are the ones we recommend:</p>\n' +
            '      <ul class="noscript__list">\n' +
            '        <li class="noscript__list-item">\n' +
            '          <a class="noscript__link" href="https://www.google.com/chrome/?hl=en%22" >\n' +
            '            <img class="noscript__image" src="/noscript/chrome.jpg" width="138px" height="138px" alt="chrome-logo">\n' +
            '          </a>\n' +
            '          <span>Google Chrome</span>\n' +
            '        </li>\n' +
            '        <li class="noscript__list-item">\n' +
            '          <a class="noscript__link" href="https://www.mozilla.com/firefox/">\n' +
            '            <img class="noscript__image" src="/noscript/firefox.jpg" width="138px" height="138px" alt="firefox-logo">\n' +
            '          </a>\n' +
            '          <span>Firefox</span>\n' +
            '        </li>\n' +
            '        <li class="noscript__list-item" style="margin-right: 0;">\n' +
            '          <a class="noscript__link" href="https://www.apple.com/safari/">\n' +
            '            <img class="noscript__image" src="/noscript/safari.jpg" width="138px" height="138px" alt="safari-logo">\n' +
            '          </a>\n' +
            '          <span>Safari</span>\n' +
            '        </li>\n' +
            '      </ul>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</noscript>\n',
        },
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
