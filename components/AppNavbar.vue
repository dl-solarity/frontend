<template>
  <div class="app-navbar" :class="{ 'app-navbar--dark': isDarkenBg }">
    <app-logo />
    <nav class="app-navbar__nav">
      <app-button
        :text="$t('app-navbar.link-text')"
        :href="config.COMPANY_URL"
        color="none"
        modification="text"
        size="large"
      />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { AppLogo, AppButton } from '#components'
import { config } from '@/config'
import { onUnmounted, ref, onMounted } from 'vue'

const isDarkenBg = ref(false)

const toggleColorHeader = () => {
  isDarkenBg.value = window.scrollY >= 1
}

onMounted(() => {
  window.addEventListener('scroll', toggleColorHeader)
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleColorHeader)
})
</script>

<style lang="scss" scoped>
$z-index: 100;

.app-navbar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: $z-index;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: toRem(24) var(--app-padding-right) toRem(24) var(--app-padding-left);
  background: transparent;
  transition: var(--field-transition-duration) ease;
  transition-property: background-color, border-color;
  border-bottom: toRem(1) solid transparent;

  &--dark {
    background: var(--background-primary-main);
    border-color: var(--background-primary-light);
  }
}

.app-navbar__nav {
  display: flex;
  gap: toRem(12);
}
</style>
