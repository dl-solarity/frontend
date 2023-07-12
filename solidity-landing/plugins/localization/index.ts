import { defineNuxtPlugin } from '#imports'
import { createI18n } from 'vue-i18n'

import resources from './resources'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  ...resources,
})

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(i18n)

  const { t, locale } = i18n.global

  nuxtApp.vueApp.provide('t', t)
  nuxtApp.vueApp.provide('locale', locale)
})
