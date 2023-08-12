<template>
  <div class="app-navbar" :class="{ 'app-navbar--dark': isDarkenBg }">
    <app-logo class="app-navbar__logo" />
    <nav class="app-navbar__links">
      <app-button
        v-for="(link, index) in links"
        :key="index"
        :text="link.text"
        :href="link.href"
        color="none"
        modification="text"
      />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { AppLogo, AppButton } from '#components'
import { onUnmounted, ref, onMounted } from 'vue'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global
const isDarkenBg = ref(false)

// TODO: Rename text and change links
const links = [
  {
    text: t('app-navbar.link-text'),
    href: 'https://github.com/dl-solidity-library/',
  },
  {
    text: t('app-navbar.link-text'),
    href: 'https://github.com/dl-solidity-library/',
  },
]

const toggleColorHeader = () => {
  isDarkenBg.value = window.pageYOffset >= 1
}

onMounted(() => {
  window.addEventListener('scroll', toggleColorHeader)
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleColorHeader)
})
</script>

<style lang="scss" scoped>
.app-navbar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: toRem(24) var(--app-padding-right) toRem(24) var(--app-padding-left);
  background: transparent;
  border-bottom: var(--border-primary-main);

  &--dark {
    background: rgba(var(--black-rgb), 0.6);
  }

  @include respond-to(tablet) {
    flex-wrap: wrap;
  }
}

.app-navbar__logo {
  @include respond-to(xsmall) {
    width: 100%;
    margin-bottom: toRem(24);
  }
}

.app-navbar__links {
  display: flex;
  gap: toRem(12);
}
</style>
