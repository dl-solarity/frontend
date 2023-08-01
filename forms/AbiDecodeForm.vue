<template>
  <form class="abi-decode-form">
    <div class="abi-decode-form__input">
      <h2>{{ title }}</h2>
    </div>
  </form>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.abi-decode-form {
  display: grid;
  gap: toRem(40);
}

.abi-decode-form__output,
.abi-decode-form__input {
  display: grid;
  gap: toRem(20);
}

.abi-decode-form__input {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--text-secondary-main);
}
</style>
