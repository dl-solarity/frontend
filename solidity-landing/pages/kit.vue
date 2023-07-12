<script lang="ts" setup>
import { AppButton } from '#components'
</script>

<template>
  <div class="ui-kit-page">
    <section class="ui-kit-page__buttons">
      <app-button
        :text="'router, border-rounded, icon'"
        :route="{ name: $routes.uiKit }"
      />
      <app-button
        modification="border-circle"
        :text="'href, border-circle'"
        href="https://www.youtube.com/"
        target="_blank"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.ui-kit-page {
  display: grid;
  grid-gap: toRem(50);
  padding-bottom: toRem(200);
}

.ui-kit-page__buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: toRem(32);
}

.ui-kit-page__inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: toRem(32);
}

.ui-kit-page__common {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: toRem(56);
}

.ui-kit-page__collapse {
  width: 100%;
}

.ui-kit-page__collapse-btn {
  width: 100%;
}

.ui-kit-page__collapse-body {
  font-size: toRem(24);
}

.ui-kit-page__icons {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, toRem(24));
  grid-gap: toRem(24);

  & > * {
    width: toRem(24);
    height: toRem(24);
  }
}
</style>
