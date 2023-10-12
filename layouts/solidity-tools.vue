<template>
  <div class="solidity-tools">
    <app-navbar
      class="solidity-tools__app-navbar"
      has-burger-menu
      is-static-dark
      :is-active-burger-menu="isAsideShown"
      @burger-menu-click="isAsideShown = !isAsideShown"
    />
    <div class="solidity-tools__content-wrp">
      <tools-sidebar v-model:is-shown="isAsideShown" />
      <main class="solidity-tools__main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isAsideShown = ref(false)
</script>

<style lang="scss" scoped>
.solidity-tools .solidity-tools__app-navbar {
  display: none;

  @include respond-to(medium) {
    display: flex;
  }
}

.solidity-tools__content-wrp {
  display: flex;

  @include respond-to(medium) {
    padding-top: var(--app-height-header);
  }
}

.solidity-tools__main {
  margin-top: 0;
  padding: var(--app-padding);
  width: 100%;
}
</style>
