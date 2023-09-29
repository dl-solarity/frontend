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
  position: relative;
}

.solidity-tools__main {
  padding: var(--app-padding);
  width: 100%;
  background: var(--background-primary-dark);
}
</style>
