<script lang="ts" setup>
import Spinner from './Spinner.vue'

withDefaults(
  defineProps<{
    scheme?: 'spinner'
  }>(),
  {
    scheme: 'spinner',
  },
)
</script>

<template>
  <div class="loader">
    <template v-if="scheme === 'spinner'">
      <spinner />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  display: grid;
  place-items: center;
}
</style>
