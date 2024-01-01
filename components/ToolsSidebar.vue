<template>
  <transition name="tools-sidebar__transition">
    <div
      v-show="isShown || !isLessThanMediumScreen"
      ref="sidebarElement"
      class="tools-sidebar"
      @click="onSidebarClick"
    >
      <aside class="tools-sidebar__aside">
        <app-logo class="tools-sidebar__logo" />

        <nav class="tools-sidebar__nav">
          <ul class="tools-sidebar__nav-links-list">
            <li v-for="navLink in navLinks" :key="navLink.title">
              <app-button
                class="tools-sidebar__nav-link"
                scheme="none"
                color="secondary"
                :icon-left="navLink.icon"
                :text="navLink.title"
                :route="navLink.route"
              />
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useRoute } from '#app'
import { AppButton, AppLogo } from '#components'
import { ICON_NAMES, ROUTE_NAMES, WINDOW_BREAKPOINTS } from '@/enums'
import { useWindowSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

const emit = defineEmits<{ (event: 'update:is-shown', value: boolean): void }>()

defineProps<{ isShown: boolean }>()

const route = useRoute()

const { t } = i18n.global

const navLinks = computed(() => [
  {
    title: t('tools-sidebar.abi-title'),
    icon: ICON_NAMES.code,
    route: { name: ROUTE_NAMES.abi },
  },
  {
    title: t('tools-sidebar.hash-functions-title'),
    icon: ICON_NAMES.hashtag,
    route: { name: ROUTE_NAMES.hashFunction },
  },
  {
    title: t('tools-sidebar.converter-title'),
    icon: ICON_NAMES.refresh,
    route: { name: ROUTE_NAMES.converter },
  },
  {
    title: t('tools-sidebar.unix-epoch-title'),
    icon: ICON_NAMES.clock,
    route: { name: ROUTE_NAMES.unixEpoch },
  },
  {
    title: t('tools-sidebar.address-utils-title'),
    icon: ICON_NAMES.locationMarker,
    route: { name: ROUTE_NAMES.addressUtils },
  },
])

const { width: windowWidth } = useWindowSize()
const sidebarElement = ref<HTMLElement | null>(null)

const isLessThanMediumScreen = computed(
  () => windowWidth.value < WINDOW_BREAKPOINTS.medium,
)

const closeSidebar = () => {
  emit('update:is-shown', false)
}

const onSidebarClick = (event: Event) => {
  if (event.target === sidebarElement.value) {
    closeSidebar()
  }
}

// eslint-disable-next-line
// @ts-ignore
watch(() => route.name, closeSidebar)
</script>

<style lang="scss" scoped>
$custom-z-index: 5;
$aside-height: vh(100);
$aside-max-width: toRem(280);

.tools-sidebar {
  width: 100%;
  max-width: $aside-max-width;
  height: $aside-height;

  @include respond-to(medium) {
    z-index: $custom-z-index;
    position: fixed;
    min-width: 100%;
    max-width: 100%;
    background: var(--backdrop-modal);
  }
}

.tools-sidebar__aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: $aside-height;
  max-width: $aside-max-width;
  background: var(--background-secondary-main);
  overflow-y: auto;
  padding: 0 var(--app-padding-right) var(--app-padding-bottom)
    var(--app-padding-left);
  transition: height var(--transition-duration-medium)
    var(--transition-timing-default);

  @include respond-to(xsmall) {
    max-width: 100%;
  }
}

.tools-sidebar .tools-sidebar__logo {
  height: var(--app-height-header);
  flex-shrink: 0;

  @include respond-to(medium) {
    display: none;
  }
}

.tools-sidebar__nav {
  margin-top: toRem(48);

  @include respond-to(medium) {
    margin-top: toRem(76);
  }
}

.tools-sidebar__nav-links-list {
  display: flex;
  flex-direction: column;
  row-gap: toRem(8);
}

.tools-sidebar .tools-sidebar__nav-link {
  justify-content: start;
  width: 100%;
  transition: none;
}

.tools-sidebar__transition-enter-active {
  animation: fade-unroll-right var(--transition-duration-fast)
    var(--transition-timing-default);
}

.tools-sidebar__transition-leave-active {
  animation: fade-unroll-right var(--transition-duration-fast)
    var(--transition-timing-default) reverse;
}

@keyframes fade-unroll-right {
  from {
    opacity: 0;
    width: 0;
  }

  to {
    opacity: 1;
    width: 100%;
  }
}
</style>
