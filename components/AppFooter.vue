<template>
  <div class="app-footer">
    <app-button
      v-for="(link, index) in links"
      :key="`${link.text}-${index}`"
      :text="link.text"
      :href="link.href"
      color="secondary"
      modification="text"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'
import { config } from '@/config'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

// TODO: Rename text and change links
const links = [
  {
    text: t('app-footer.link-text'),
    href: config.GITHUB_URL,
  },
  {
    text: t('app-footer.link-text'),
    href: config.GITHUB_URL,
  },
]
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  gap: toRem(24);
  padding: toRem(24);
  justify-content: center;
  border-top: toRem(1) solid var(--background-primary-light);
}
</style>
