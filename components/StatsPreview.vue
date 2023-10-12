<template>
  <div class="stats-preview">
    <div class="stats-preview__header">
      <h1 class="stats-preview__header-main-title">
        {{ $t('stats-preview.main-title') }}
      </h1>
      <p class="stats-preview__header-secondary-title">
        {{ $t('stats-preview.secondary-title') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: toRem(60);
  background-image: url('/branding/bg.png');
  background-size: 100% 100%;
  width: 100%;
  min-height: vh(100);
  padding: calc(var(--app-height-header) + var(--app-padding-top)) toRem(80)
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

.stats-preview__header-main-title {
  max-width: toRem(800);
}

.stats-preview__header-secondary-title {
  max-width: toRem(440);
  color: var(--text-primary-main);
}
</style>
