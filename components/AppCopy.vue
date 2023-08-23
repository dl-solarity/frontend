<template>
  <div class="copy">
    <slot />
    <button v-if="String(props.value)" type="button" @click="handleCopy">
      <app-icon
        class="copy__icon"
        :name="isCopied ? $icons.clipboardCheck : $icons.duplicate"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { AppIcon } from '#components'
import { copyToClipboard, sleep } from '@/helpers'
import { ref } from 'vue'

const props = defineProps<{ value: string | number }>()

const isCopied = ref(false)

const handleCopy = async () => {
  await copyToClipboard(String(props.value))
  isCopied.value = true
  await sleep(1000)
  isCopied.value = false
}
</script>

<style lang="scss" scoped>
.copy {
  display: grid;
  grid-auto-flow: column;
  gap: toRem(8);
  font: inherit;
  color: inherit;
  border: none;
  background: none;
  overflow: hidden;
  max-width: max-content;
}

.copy__icon {
  width: 1.2em;
  height: 1.2em;
  min-width: toRem(16);
  min-height: toRem(16);
  color: var(--primary-main);
}
</style>
