<script lang="ts" setup>
import 'virtual:svg-icons-register'

import { ref } from '#imports'
import { ErrorHandler } from '@/helpers'

const isAppInitialized = ref(false)

const init = async () => {
  try {
  } catch (error) {
    ErrorHandler.process(error)
  }
  isAppInitialized.value = true
}

init()
</script>

<template>
  <div class="app__container">
    <NuxtLayout>
      <NuxtPage class="app__main" />
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
.app__container {
  overflow: hidden;
  display: grid;
  grid-template-rows: toRem(85) 1fr max-content;
  flex: 1;

  @include respond-to(small) {
    grid-template-rows: max-content 1fr max-content;
  }
}

.app__main {
  padding: 0 var(--app-padding-right) 0 var(--app-padding-left);
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
