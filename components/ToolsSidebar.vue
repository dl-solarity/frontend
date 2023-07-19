<template>
  <transition name="app-sidebar__transition">
    <div v-if="isSidebarShown" class="app-sidebar">
      <aside ref="asideElement" class="app-sidebar__aside">
        <div class="app-sidebar__header">
          <app-logo class="app-sidebar__logo" />
          <app-button
            class="app-sidebar__close-button"
            scheme="none"
            size="none"
            :icon-left="$icons.xCircle"
            @click="toggleSidebar"
          />
        </div>

        <div class="app-sidebar__actions">
          <ul class="app-sidebar__links-list">
            <li
              v-for="(link, index) in NAV_LINKS"
              class="app-sidebar__action-item"
              :key="index"
            >
              <nuxt-link
                class="app-sidebar__action"
                :to="link.name"
                @click="closeSidebar"
              >
                <icon :name="link.icon" class="app-sidebar__action-icon" />
                <span class="app-sidebar__action-text">
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
import { ref, computed, watch } from 'vue'
import { AppLogo, Icon, AppButton } from '#components'
import { bus, BUS_EVENTS } from '@/helpers'
import { useWindowSize, onClickOutside } from '@vueuse/core'
import { WINDOW_BREAKPOINTS, ICON_NAMES } from '@/enums'
import { ROUTE_PATH } from '@/constants'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const NAV_LINKS = [
  {
    title: t('app-sidebar.abi-title'),
    icon: ICON_NAMES.code,
    name: ROUTE_PATH.abi,
  },
  {
    title: t('app-sidebar.hash-functions-title'),
    icon: ICON_NAMES.hashtag,
    name: ROUTE_PATH.hashFunctions,
  },
  {
    title: t('app-sidebar.converter-title'),
    icon: ICON_NAMES.refresh,
    name: ROUTE_PATH.converter,
  },
  {
    title: t('app-sidebar.unix-epoch-title'),
    icon: ICON_NAMES.clock,
    name: ROUTE_PATH.unixEpoch,
  },
  {
    title: t('app-sidebar.address-predictor-title'),
    icon: ICON_NAMES.locationMarker,
    name: ROUTE_PATH.addressPredicator,
  },
]

const { width: windowWidth } = useWindowSize()
const asideElement = ref<HTMLElement | null>(null)
const isVisible = ref(true)

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

bus.on(BUS_EVENTS.toggleSidebar, toggleSidebar)

watch(asideElement, () => {
  if (!asideElement.value || !isLessThanMediumScreen.value || !isVisible.value)
    return

  onClickOutside(asideElement, closeSidebar)
})
</script>

<style scoped lang="scss">
$custom-z-index: 5;

.app-sidebar {
  width: 100%;
  max-width: toRem(280);
  height: 100vh;
  background: var(--background-primary-light);

  @include respond-to(medium) {
    padding: toRem(0);
    z-index: $custom-z-index;
    position: absolute;
    max-width: 100vw;
    width: 100%;
    background: rgba(var(--black-rgb), 0.5);
  }
}

.app-sidebar__aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  max-width: toRem(280);
  padding: toRem(24);

  @include respond-to(medium) {
    padding: toRem(24);
    background: var(--background-primary-light);
  }

  @include respond-to(tablet) {
    position: unset;
    border-radius: 0 toRem(6) toRem(6) 0;
  }

  @include respond-to(xsmall) {
    max-width: 100%;
    border-radius: 0;
  }
}

.app-sidebar__actions {
  display: flex;
  flex-direction: column;
  gap: toRem(60);
  flex: 1;
}

.app-sidebar__links-list {
  display: flex;
  flex-direction: column;
  row-gap: toRem(8);
}

.app-sidebar__action {
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

.app-sidebar__action-icon {
  width: toRem(20);
  height: toRem(20);
}

.app-sidebar__action-text {
  font-weight: 400;
}

.app-sidebar__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: toRem(24);
  width: 100%;
}

.app-sidebar__footer-btn {
  font-size: toRem(14);
  font-weight: 400;
  line-height: 1.5;
  --app-button-text-hover: var(--text-primary-light);
  --app-button-text-active: var(--text-primary-dark);
  --app-button-text-focused: var(--text-primary-light);
}

.app-sidebar__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: toRem(64);
}

.app-sidebar__close-button {
  display: none;
  color: var(--text-primary-main);

  @include respond-to(xsmall) {
    display: flex;
    width: toRem(24);
    height: toRem(24);
  }
}

.app-sidebar__transition-enter-active {
  animation: fade-unroll-right 0.5s ease-in-out;
}

.app-sidebar__transition-leave-active {
  animation: fade-unroll-right 0.5s ease-in-out reverse;
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
