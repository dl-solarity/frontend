<template>
  <transition name="tools-sidebar__transition">
    <div
      v-show="isSidebarShown"
      ref="sidebarElement"
      class="tools-sidebar"
      @click="onSidebarClick"
    >
      <aside class="tools-sidebar__aside">
        <div class="tools-sidebar__header">
          <app-logo />
          <app-button
            class="tools-sidebar__close-button"
            color="secondary"
            modification="text"
            :icon-left="$icons.x"
            @click="toggleSidebar"
          />
        </div>

        <nav>
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

        <div class="tools-sidebar__footer">
          <app-button
            v-for="(footerLink, index) in footerLinks"
            :key="`${footerLink.text}-${index}`"
            :text="footerLink.text"
            :href="footerLink.href"
            color="secondary"
            modification="text"
          />
        </div>
      </aside>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from '#app'
import { AppLogo, AppButton } from '#components'
import { bus, BUS_EVENTS } from '@/helpers'
import { useWindowSize } from '@vueuse/core'
import { WINDOW_BREAKPOINTS, ICON_NAMES } from '@/enums'
import { config } from '@/config'
import { ROUTE_PATH } from '@/constants'
import { i18n } from '~/plugins/localization'

const route = useRoute()
const { t } = i18n.global

const navLinks = computed(() => [
  {
    title: t('tools-sidebar.abi-title'),
    icon: ICON_NAMES.code,
    route: ROUTE_PATH.abi,
  },
  {
    title: t('tools-sidebar.hash-functions-title'),
    icon: ICON_NAMES.hashtag,
    route: ROUTE_PATH.hashFunction,
  },
  {
    title: t('tools-sidebar.converter-title'),
    icon: ICON_NAMES.refresh,
    route: ROUTE_PATH.converter,
  },
  {
    title: t('tools-sidebar.unix-epoch-title'),
    icon: ICON_NAMES.clock,
    route: ROUTE_PATH.unixEpoch,
  },
  {
    title: t('tools-sidebar.address-predictor-title'),
    icon: ICON_NAMES.locationMarker,
    route: ROUTE_PATH.addressPredicator,
  },
])

const footerLinks = [
  {
    text: t('tools-sidebar.company-link-text'),
    href: config.COMPANY_URL,
  },
  {
    text: t('tools-sidebar.github-link-text'),
    href: config.GITHUB_URL,
  },
]

const { width: windowWidth } = useWindowSize()
const sidebarElement = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const isLessThanMediumScreen = computed(
  () => windowWidth.value <= WINDOW_BREAKPOINTS.medium,
)

const isSidebarShown = computed(
  () => !isLessThanMediumScreen.value || isVisible.value,
)

const toggleSidebar = () => {
  isVisible.value = !isVisible.value
}

const closeSidebar = () => {
  isVisible.value = false
}

const onSidebarClick = (event: Event) => {
  if (event.target === sidebarElement.value) {
    closeSidebar()
  }
}

bus.on(BUS_EVENTS.toggleSidebar, toggleSidebar)

onBeforeUnmount(() => {
  bus.off(BUS_EVENTS.toggleSidebar, toggleSidebar)
})

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
    background: rgba(var(--black-rgb), 0.5);
  }
}

.tools-sidebar__aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: $aside-height;
  max-width: $aside-max-width;
  padding: toRem(24);
  background: var(--background-primary-main);

  @include respond-to(medium) {
    padding: toRem(24);
  }

  @include respond-to(xsmall) {
    max-width: 100%;
  }
}

.tools-sidebar__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: toRem(64);
}

.tools-sidebar__nav-links-list {
  display: flex;
  flex-direction: column;
  row-gap: toRem(8);
}

.tools-sidebar__nav-link {
  justify-content: start;
  width: 100%;
  transition: none;
}

.tools-sidebar__close-button {
  display: none;

  @include respond-to(xsmall) {
    display: grid;
  }
}

.tools-sidebar__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  gap: toRem(12) toRem(24);
}

.tools-sidebar__transition-enter-active {
  animation: fade-unroll-right 0.2s ease-in-out;
}

.tools-sidebar__transition-leave-active {
  animation: fade-unroll-right 0.2s ease-in-out reverse;
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
