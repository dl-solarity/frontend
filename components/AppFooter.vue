<template>
  <div class="app-footer">
    <p class="app-footer__item">
      {{ $t('app-footer.license') }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  gap: toRem(24);
  padding: toRem(24) toRem(80);
  border-top: toRem(1) solid var(--background-primary-light);

  @include respond-to(tablet) {
    padding: toRem(24) var(--app-padding-right) toRem(24)
      var(--app-padding-left);
  }
}

.app-footer__item {
  color: var(--text-primary-main);

  @include p-14-semi-bold;
}
</style>
