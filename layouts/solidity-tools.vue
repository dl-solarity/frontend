<template>
  <div class="solidity-tools">
    <tools-sidebar />
    <div class="solidity-tools__main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.solidity-tools {
  padding: 0;
  display: flex;
  min-width: vh(100);
  min-height: vh(100);
  position: relative;
}

.solidity-tools__main {
  padding: var(--app-padding);
  max-width: 100vw;
  width: 100%;
  overflow-y: scroll;
  background: var(--background-primary-dark);
}
</style>
