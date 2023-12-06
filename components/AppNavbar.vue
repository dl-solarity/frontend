<template>
  <div class="app-navbar">
    <app-logo />
    <button
      v-if="hasBurgerMenu"
      class="app-navbar__burger-btn"
      :class="{
        'app-navbar__burger-btn--active': isActiveBurgerMenu,
      }"
      @click="emit('burger-menu-click')"
    >
      <span class="app-navbar__burger-btn-line" />
    </button>
    <nav v-else class="app-navbar__nav">
      <app-button
        class="app-navbar__nav-link"
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

const emit = defineEmits<{
  (event: 'burger-menu-click'): void
}>()

withDefaults(
  defineProps<{
    hasBurgerMenu?: boolean
    isActiveBurgerMenu?: boolean
  }>(),
  {
    hasBurgerMenu: false,
    isActiveBurgerMenu: false,
  },
)
</script>

<style lang="scss" scoped>
$z-index: 100;
$height-burger-btn-line: toRem(2);
$gap-burger-btn-line: toRem(8);

.app-navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $z-index;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--app-padding-right) 0 var(--app-padding-left);
  height: var(--app-height-header);
  background: var(--background-primary-dark);
  box-shadow: 0 toRem(1) var(--background-primary-light);
  transition: var(--transition-duration-fast) var(--transition-timing-default);
  transition-property: background-color, box-shadow;
}

.app-navbar__nav {
  display: flex;
  gap: toRem(12);
}

.app-navbar .app-navbar__nav-link {
  font-family: var(--app-font-family-secondary);
  font-weight: 400;

  &:not([disabled]):hover,
  &:not([disabled]):focus,
  &:not([disabled]):active {
    text-decoration: none;
  }
}

.app-navbar__burger-btn {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: toRem(22);
  height: calc($height-burger-btn-line * 3 + $gap-burger-btn-line * 2);
}

.app-navbar__burger-btn-line {
  &,
  &:before,
  &:after {
    $timing: var(--transition-timing-default);

    display: block;
    position: absolute;
    width: 100%;
    height: $height-burger-btn-line;
    background-color: var(--primary-light);
    border-radius: var(--border-primary-main);
    transition: var(--transition-duration-fast) $timing;
  }

  .app-navbar__burger-btn--active & {
    transform: rotate(-45deg);
  }

  &:before {
    content: '';
    top: -$gap-burger-btn-line;

    .app-navbar__burger-btn--active & {
      top: 0;
      transform: rotate(-90deg);
    }
  }

  &:after {
    content: '';
    top: $gap-burger-btn-line;

    .app-navbar__burger-btn--active & {
      top: 0;
      transform: rotate(-90deg);
    }
  }
}
</style>
