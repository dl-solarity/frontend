<template>
  <main class="home-page">
    <div class="home-page__background">
      <a
        v-for="(planet, key) in planets"
        :key="key"
        :href="planet.href"
        class="home-page__planet"
        rel="noreferrer noopener"
        target="_blank"
      >
        <img
          class="home-page__planet-img"
          :src="planet.imgSrc"
          :alt="`planet-${planet.name}`"
        />
      </a>
    </div>
    <stats-preview />
    <projects-info />
  </main>
</template>

<script lang="ts" setup>
import { StatsPreview, ProjectsInfo } from '#components'

type PLANET = {
  name: string
  imgSrc: string
  href: string
}

const planets: PLANET[] = [
  {
    name: 'solidity',
    imgSrc: '/img/home-page/planet-solidity.svg',
    href: 'https://soliditylang.org/',
  },
  {
    name: 'zk',
    imgSrc: '/img/home-page/planet-zk.svg',
    href: 'https://docs.circom.io/',
  },
  {
    name: 'hardhat',
    imgSrc: '/img/home-page/planet-hardhat.svg',
    href: 'https://hardhat.org/',
  },
  {
    name: 'graph',
    imgSrc: '/img/home-page/planet-graph.svg',
    href: 'https://thegraph.com/',
  },
  {
    name: 'viper',
    imgSrc: '/img/home-page/planet-viper.svg',
    href: 'https://docs.vyperlang.org/',
  },
]
</script>

<style lang="scss" scoped>
$z-custom: 1;

.home-page {
  position: relative;
  margin-top: 0;
  padding: var(--app-height-header) 0 0;
  overflow: hidden;
  background: var(--background-primary-main);
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
    aspect-ratio: 375 / 964;
    background-image: url('/img/home-page/bg-small.png');
  }
}

.home-page__planet {
  position: absolute;
  display: block;
  transition: transform var(--transition-duration-medium)
    var(--transition-timing-default);
  border-radius: 50%;
  overflow: hidden;
  user-select: none;

  /*
    sizes and positions for background image
    with aspect-ratio 1512/1830 (for small 375/964)
  */

  // planet-solidity
  &:nth-child(1) {
    width: 39.0873%; // 591px on 1512px width
    top: 29.7267%; // 544px on 1830px height
    left: 63.8888%; // 966px on 1512px width

    @include respond-to(small) {
      width: 72.2666%; // 271px on 375px width
      top: 43.5684%; // 420px on 964px height
      left: 53.3333%; // 200px on 375px width
    }
  }

  // planet-zk
  &:nth-child(2) {
    width: 8.8624%; // 134px on 1512px width
    top: 55.5191%; // 1016px on 1830px height
    left: 54.1666%; // 819px on 512px width

    @include respond-to(small) {
      width: 15.2%; // 57px on 375px width
      top: 64.419%; // 621px on 964px height
      left: 39.7333%; // 149px on 964px height
    }
  }

  // planet-hardhat
  &:nth-child(3) {
    width: 15.2777%; // 231px on 1512px width
    top: 35.4644%; // 649px on 1830px height
    left: 20.701%; // 313px on 1512px width

    @include respond-to(small) {
      width: 30.9333%; // 116px on 1512px width
      top: 42.5311%; // 410px on 964px height
      left: -2.4%; // -9px pn 375px width
    }
  }

  // planet-graph
  &:nth-child(4) {
    width: 10.3174%; // 156px on 1512px width
    top: 25.9016%; // 474px on 1830px height
    left: 41.9973%; // 635px on 1512px width

    @include respond-to(small) {
      width: 20.2666%; // 76px on 375px width
      top: 35.0622%; // 338px on 964px height
      left: 37.3333%; // 140px on 375px width
    }
  }

  // planet-viper
  &:nth-child(5) {
    width: 6.2169%; // 94px on 1512px width
    top: 20.601%; // 377px on 1830px height
    left: 88.7566%; // 1342px on 1512px width

    @include respond-to(small) {
      width: 14.6666%; // 55px on 375px width
      top: 35.0622%; // 338px on 964px height
      left: 78.9333%; // 296px on 375px width
    }
  }

  &:hover {
    transform: scale(1.06);
  }
}

.home-page__planet-img {
  display: block;
  width: 100%;
}
</style>
