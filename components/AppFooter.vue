<template>
  <div class="app-footer">
    <p class="app-footer__item">
      {{ $t('app-footer.license') }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
$z-index: 100;

.app-footer {
  position: relative;
  z-index: $z-index;
  display: flex;
  gap: toRem(24);
  padding: toRem(24) toRem(80);
  background: var(--background-primary-dark);
  box-shadow: 0 toRem(-1) var(--background-primary-light);

  @include respond-to(medium) {
    padding: toRem(16) var(--app-padding-right) toRem(16)
      var(--app-padding-left);
  }
}

.app-footer__item {
  color: var(--text-primary-main);

  @include p-14-semi-bold;
}
</style>
