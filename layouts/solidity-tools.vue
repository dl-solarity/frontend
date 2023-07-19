<template>
  <div class="solidity-tools">
    <tools-sidebar />
    <div class="solidity-tools__main">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ToolsSidebar } from '#components'
</script>

<style lang="scss" scoped>
.solidity-tools {
  padding: 0;
  display: flex;
  min-width: 100vh;
  min-height: 100vh;
  position: relative;
}

.solidity-tools__main {
  padding: var(--app-padding);
  max-width: 100vw;
  width: 100%;
  overflow-y: scroll;
  background: var(--background-primary-main);
}

.default__footer {
  margin-top: auto;
}
</style>
