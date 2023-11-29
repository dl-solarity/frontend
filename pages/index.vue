<template>
  <main class="home-page">
    <div class="home-page__background">
      <div class="home-page__background-wrp">
        <object
          v-for="url in PLANET_URLS"
          :key="url"
          class="home-page__planet"
          :data="url"
        />
      </div>
    </div>
    <stats-preview />
    <projects-info />
  </main>
</template>

<script lang="ts" setup>
import { StatsPreview, ProjectsInfo } from '#components'

enum PLANET_URLS {
  ethereum = '/img/home-page/planet-ethereum.svg',
  zk = '/img/home-page/planet-zk.svg',
  hardhat = '/img/home-page/planet-hardhat.svg',
  symbol = '/img/home-page/planet-symbol.svg',
  v = '/img/home-page/planet-v.svg',
}
</script>

<style lang="scss" scoped>
$z-custom: 1;

.home-page {
  position: relative;
  margin-top: 0;
  padding: var(--app-height-header) 0 0;
  overflow: hidden;
}

.home-page__background {
  aspect-ratio: 1512 / 1830;
  position: absolute;
  inset: 0;
  background-image: url('/img/home-page/bg.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  z-index: $z-custom;

  @include respond-to(small) {
    background-image: url('/img/home-page/bg-small.png');
  }
}

.home-page__background-wrp {
  position: relative;
  height: 100%;
}

.home-page__planet {
  position: absolute;
  transition: transform var(--transition-duration-medium)
    var(--transition-timing-default);
  border-radius: 50%;
  user-select: none;

  // sizes and positions for background image with aspect-ratio 1512/1830
  // planet-ethereum
  &:nth-child(1) {
    height: 30.9836%; // 567px on 1830px height
    top: 29.7267%; // 544px on 1830px height
    left: 63.8888%; // 966px on 1512px width
  }

  // planet-zk
  &:nth-child(2) {
    height: 7.3224%; // 134px on 1830px height
    top: 55.5191%; // 1016px on 1830px height
    left: 54.1666%; // 819px on 512px width
  }

  // planet-hardhat
  &:nth-child(3) {
    height: 12.6229%; // 231px on 1830px height
    top: 35.4644%; // 649px on 1830px height
    left: 20.701%; // 313px on 1512px width
  }

  // planet-symbol
  &:nth-child(4) {
    height: 8.0874%; // 148px on 1830px height
    top: 25.9016%; // 474px on 1830px height
    left: 41.9973%; // 635px on 1512px width
  }

  // planet-v
  &:nth-child(5) {
    height: 4.8633%; // 89px on 1830px height
    top: 20.601%; // 377px on 1830px height
    left: 88.7566%; // 1342px on 1512px width
  }

  &:hover {
    transform: scale(1.06);
  }
}
</style>
