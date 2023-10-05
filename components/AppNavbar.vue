<template>
  <div class="app-navbar" :class="{ 'app-navbar--dark': isDark }">
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

const emit = defineEmits<{
  (event: 'burger-menu-click'): void
}>()

const props = withDefaults(
  defineProps<{
    isStaticDark?: boolean
    hasBurgerMenu?: boolean
    isActiveBurgerMenu?: boolean
  }>(),
  {
    isStaticDark: false,
    hasBurgerMenu: false,
    isActiveBurgerMenu: false,
  },
)

const _isDark = ref(false)
const toggleColorHeader = () => {
  _isDark.value = window.scrollY >= 1
}

const isDark = computed(() => props.isStaticDark || _isDark.value)

onMounted(() => {
  window.addEventListener('scroll', toggleColorHeader)
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleColorHeader)
})
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
  &::before,
  &::after {
    display: block;
    position: absolute;
    width: 100%;
    height: $height-burger-btn-line;
    background-color: var(--primary-light);
    border-radius: var(--border-primary-main);
    transition: var(--field-transition-duration);
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
