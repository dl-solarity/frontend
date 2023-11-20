<template>
  <div class="stats-preview">
    <div class="stats-preview__header">
      <div class="stats-preview__header-main-title-wrp">
        <h1 class="stats-preview__header-main-title">
          {{ $t('stats-preview.main-title-part-1') }}
        </h1>
        <h1 class="stats-preview__header-main-title">
          {{ $t('stats-preview.main-title-part-2') }}
        </h1>
      </div>
      <p class="stats-preview__header-secondary-title">
        {{ $t('stats-preview.secondary-title') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-preview {
  display: flex;
  gap: toRem(60);
  width: 100%;
  min-height: vh(100);
  transition: min-height var(--transition-duration-fast);
  padding: calc(var(--app-height-header) + var(--app-padding-top)) toRem(96)
    var(--app-padding-bottom);

  @include respond-to(medium) {
    padding-right: var(--app-padding-right);
    padding-left: var(--app-padding-left);
  }
}

.stats-preview__header {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
}

.stats-preview__header-main-title-wrp {
  max-width: toRem(1024);

  @include respond-to(medium) {
    max-width: toRem(600);
  }
}

.stats-preview__header-main-title {
  display: inline;

  &:first-child {
    color: var(--primary-main);
  }
}

.stats-preview__header-secondary-title {
  max-width: toRem(440);
}
</style>
