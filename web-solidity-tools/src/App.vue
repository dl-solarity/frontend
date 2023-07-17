<template>
  <div v-if="isAppInitialized" class="app__container">
    <app-sidebar />
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component class="app__main" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { AppSidebar } from '@/common'

import { ref } from 'vue'
import { useNotifications } from '@/composables'
import { config } from '@config'
import { bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { NotificationPayload } from '@/types'

const isAppInitialized = ref(false)

const { showToast } = useNotifications()

const init = async () => {
  try {
    document.title = config.APP_NAME

    initNotifications()
  } catch (error) {
    ErrorHandler.process(error)
  }
  isAppInitialized.value = true
}

const initNotifications = () => {
  bus.on(BUS_EVENTS.success, payload =>
    showToast('success', payload as NotificationPayload),
  )
  bus.on(BUS_EVENTS.warning, payload =>
    showToast('warning', payload as NotificationPayload),
  )
  bus.on(BUS_EVENTS.error, payload =>
    showToast('error', payload as NotificationPayload),
  )
  bus.on(BUS_EVENTS.info, payload =>
    showToast('info', payload as NotificationPayload),
  )
}

init()
</script>

<style lang="scss" scoped>
.app__container {
  padding: 0;
  display: flex;
  min-width: 100vh;
  min-height: 100vh;
  position: relative;
}

.app__main {
  padding: var(--app-padding);
  max-width: 100vw;
  width: 100%;
  overflow-y: scroll;
  background: var(--background-primary-main);
}

.fade-enter-active {
  animation: fade-in 0.25s;
}

.fade-leave-active {
  animation: fade-in 0.25s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
