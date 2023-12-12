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
    <div class="home-page__scroll-panel">
      <a
        v-for="protocol in protocols"
        :key="protocol.name"
        :href="protocol.href"
        class="home-page__protocol"
        rel="noreferrer noopener"
        target="_blank"
      >
        <img
          class="home-page__protocol-img"
          :src="protocol.imgSrc"
          :alt="protocol.name"
        />
        <!-- eslint-disable-next-line vue-i18n/no-raw-text -->
        {{ 'protocol' }}
      </a>
    </div>
    <projects-info />
  </main>
</template>

<script lang="ts" setup>
import { StatsPreview, ProjectsInfo } from '#components'

type Planet = {
  name: string
  imgSrc: string
  href: string
}

type Protocol = {
  name: string
  imgSrc: string
  href: string
}

const planets: Planet[] = [
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

const protocols: Protocol[] = [
  {
    name: 'q',
    imgSrc: '/img/home-page/q-logo.svg',
    href: 'https://q.org/',
  },
  {
    name: 'dexe',
    imgSrc: '/img/home-page/dexe-logo.svg',
    href: 'https://dexe.network/',
  },
  {
    name: 'rarimo',
    imgSrc: '/img/home-page/rarimo-logo.svg',
    href: 'https://rarimo.com/',
  },
]
</script>

<style lang="scss" scoped>
$z-index: 1;

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
  z-index: $z-index;

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

.home-page__scroll-panel {
  $background-color: rgba(#ffffff, 0.01);

  position: relative;
  z-index: $z-index;
  margin: 0 toRem(96) 0;
  overflow: scroll;
  display: flex;
  background-color: $background-color;
  border: toRem(2) solid transparent;
  border-radius: var(--border-radius-main);
  border-image-slice: 1;
  border-image-source: linear-gradient(
    -45deg,
    var(--primary-main),
    transparent 12%,
    transparent 88%,
    var(--primary-main)
  );

  @include respond-to(xmedium) {
    border-image-source: linear-gradient(
      -45deg,
      var(--primary-main),
      transparent 14%,
      transparent 86%,
      var(--primary-main)
    );
  }

  @include respond-to(medium) {
    margin: 0 var(--app-padding-left) 0 var(--app-padding-right);
  }

  @include respond-to(small) {
    border-image-source: linear-gradient(
      -45deg,
      var(--primary-main),
      transparent 26%,
      transparent 74%,
      var(--primary-main)
    );
  }
}

.home-page__protocol {
  flex: 1;
  font-family: var(--app-font-family-main);
  font-size: toRem(24);
  font-weight: 500;
  line-height: toRem(32);
  letter-spacing: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: toRem(8);
  color: var(--text-primary-main);
  padding: toRem(24) toRem(36);
  min-width: max-content;
  transition: var(--transition-duration-fast) var(--transition-timing-default);

  &:not([disabled]):hover {
    color: var(--primary-light);
    background: var(--background-primary-main);
  }

  &:not([disabled]):focus,
  &:not([disabled]):active {
    color: var(--primary-main);
    background: var(--background-primary-main);
  }

  @include respond-to(medium) {
    font-size: toRem(16);
    line-height: toRem(24);
    gap: toRem(4);
    padding: toRem(16) toRem(24);
  }
}

.home-page__protocol-img {
  height: toRem(40);

  @include respond-to(medium) {
    height: toRem(24);
  }
}
</style>
