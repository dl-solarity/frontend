<template>
  <div class="app-copy">
    <slot />
    <button v-if="String(props.value)" type="button" @click="handleCopy">
      <app-icon
        class="app-copy__icon"
        :name="isCopied ? $icons.clipboardCheck : $icons.duplicate"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { AppIcon } from '#components'
import { COPIED_DURING_MS } from '@/constants'
import { copyToClipboard, sleep } from '@/helpers'
import { ref } from 'vue'

const props = defineProps<{ value: string | number }>()

const isCopied = ref(false)

const handleCopy = async () => {
  await copyToClipboard(String(props.value))
  isCopied.value = true
  await sleep(COPIED_DURING_MS)
  isCopied.value = false
}
</script>

<style lang="scss" scoped>
.app-copy {
  display: grid;
  grid-auto-flow: column;
  gap: toRem(8);
  max-width: max-content;
}

.app-copy__icon {
  width: toRem(16);
  height: toRem(16);
  color: var(--primary-main);
}
</style>
