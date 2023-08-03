<template>
  <transition name="tools-sidebar__transition">
    <div v-show="isSidebarShown" class="tools-sidebar">
      <aside ref="asideElement" class="tools-sidebar__aside">
        <div class="tools-sidebar__header">
          <app-logo class="tools-sidebar__logo" />
          <app-button
            class="tools-sidebar__close-button"
            scheme="none"
            size="none"
            :icon-left="$icons.xCircle"
            @click="toggleSidebar"
          />
        </div>

        <div class="tools-sidebar__actions">
          <ul class="tools-sidebar__links-list">
            <li
              v-for="(link, index) in navLinks"
              class="tools-sidebar__action-item"
              :key="index"
            >
              <nuxt-link
                class="tools-sidebar__action"
                :to="link.name"
                @click="closeSidebar"
              >
                <icon :name="link.icon" class="tools-sidebar__action-icon" />
                <span class="tools-sidebar__action-text">
                  {{ link.title }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { AppLogo, Icon, AppButton } from '#components'
import { bus, BUS_EVENTS } from '@/helpers'
import { useWindowSize, onClickOutside } from '@vueuse/core'
import { WINDOW_BREAKPOINTS, ICON_NAMES } from '@/enums'
import { ROUTE_PATH } from '@/constants'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const navLinks = computed(() => [
  {
    title: t('tools-sidebar.abi-title'),
    icon: ICON_NAMES.code,
    name: ROUTE_PATH.abi,
  },
  {
    title: t('tools-sidebar.hash-functions-title'),
    icon: ICON_NAMES.hashtag,
    name: ROUTE_PATH.hashFunctions,
  },
  {
    title: t('tools-sidebar.converter-title'),
    icon: ICON_NAMES.refresh,
    name: ROUTE_PATH.converter,
  },
  {
    title: t('tools-sidebar.unix-epoch-title'),
    icon: ICON_NAMES.clock,
    name: ROUTE_PATH.unixEpoch,
  },
  {
    title: t('tools-sidebar.address-predictor-title'),
    icon: ICON_NAMES.locationMarker,
    name: ROUTE_PATH.addressPredicator,
  },
])

const { width: windowWidth } = useWindowSize()
const asideElement = ref<HTMLElement | null>(null)
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

watch(asideElement, () => {
  if (!asideElement.value || !isLessThanMediumScreen.value || !isVisible.value)
    return

  onClickOutside(asideElement, closeSidebar)
})

bus.on(BUS_EVENTS.toggleSidebar, toggleSidebar)

onBeforeUnmount(() => {
  bus.off(BUS_EVENTS.toggleSidebar, toggleSidebar)
})
</script>

<style scoped lang="scss">
$custom-z-index: 5;

.tools-sidebar {
  width: 100%;
  max-width: toRem(280);
  height: 100vh;
  background: var(--background-primary-light);

  @include respond-to(medium) {
    padding: toRem(0);
    z-index: $custom-z-index;
    position: absolute;
    min-width: 100vw;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: rgba(var(--black-rgb), 0.5);
  }
}

.tools-sidebar__aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  max-width: toRem(280);
  padding: toRem(24);
  background: var(--background-primary-light);

  @include respond-to(medium) {
    padding: toRem(24);
    background: var(--background-primary-light);
  }

  @include respond-to(tablet) {
    border-radius: 0 toRem(6) toRem(6) 0;
  }

  @include respond-to(xsmall) {
    max-width: 100%;
    border-radius: 0;
  }
}

.tools-sidebar__actions {
  display: flex;
  flex-direction: column;
  gap: toRem(60);
  flex: 1;
}

.tools-sidebar__links-list {
  display: flex;
  flex-direction: column;
  row-gap: toRem(8);
}

.tools-sidebar__action {
  display: flex;
  align-items: center;
  gap: toRem(12);
  padding: toRem(12) toRem(16);
  width: 100%;
  height: toRem(48);
  color: var(--text-primary-dark);
  border-radius: toRem(8);

  &:hover {
    background: var(--background-primary-dark);
    color: var(--text-primary-main);
  }

  &.router-link-active {
    background: var(--background-primary-dark);
    color: var(--primary-main);
  }
}

.tools-sidebar__action-icon {
  width: toRem(20);
  height: toRem(20);
}

.tools-sidebar__action-text {
  font-weight: 400;
}

.tools-sidebar__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: toRem(64);
}

.tools-sidebar__close-button {
  display: none;
  color: var(--text-primary-main);

  @include respond-to(xsmall) {
    display: flex;
    width: toRem(24);
    height: toRem(24);
  }
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
