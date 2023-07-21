<template>
  <div class="app-footer">
    <app-button
      v-for="(link, index) in links"
      :key="index"
      :text="link.text"
      :href="link.href"
      scheme="none"
      modification="none"
      size="none"
      class="app-footer__btn"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

// TODO: Rename text and change links
const links = [
  {
    text: t('app-footer.link-text'),
    href: 'https://github.com/dl-solidity-library/',
  },
  {
    text: t('app-footer.link-text'),
    href: 'https://github.com/dl-solidity-library/',
  },
]
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  gap: toRem(24);
  padding: toRem(24);
  justify-content: center;
  border-top: toRem(1) solid var(--text-secondary-dark);
}

.app-footer__btn {
  --app-button-text-hover: var(--text-primary-main);
}
</style>
