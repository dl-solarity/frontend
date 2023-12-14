<template>
  <div class="app-swiper">
    <swiper v-bind="swiperParams">
      <swiper-slide
        v-for="(item, idx) in items"
        :key="idx"
        class="app-swiper__slide"
      >
        <slot :item="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: unknown[]
  swiperParams: object
}>()
</script>
