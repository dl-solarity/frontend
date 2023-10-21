<template>
  <div class="app-image">
    <div v-if="isLoading" class="app-image__loader-wrp">
      <template v-if="$slots.loading">
        <slot name="loading" /><!--THERE IS A SLOT HERE-->
      </template>
      <template v-else>
        <app-loader />
      </template>
    </div>
    <template v-else-if="error && $slots.error">
      <slot name="error" :error="error" /><!--THERE IS A SLOT HERE-->
    </template>
    <template v-else>
      <img v-bind="$attrs" class="app-image__img" :alt="alt" :src="src" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { AppLoader } from '#components'
import { useImage } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
  }>(),
  {
    src: '',
    alt: '',
  },
)

const { error, isLoading } = useImage(props)
</script>

<style lang="scss" scoped>
.app-image {
  display: flex;
  object-fit: cover;
  overflow: hidden;
  background: var(--background-primary-main);
  border-radius: var(--border-radius-main);
}

.app-image__loader-wrp {
  margin: auto;
}

.app-image__img {
  all: inherit;
}
</style>
