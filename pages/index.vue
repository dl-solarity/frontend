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
    <app-swiper
      class="home-page__protocols-swiper"
      :items="[...protocols, ...protocols]"
      :swiper-params="protocolsSwiperParams"
    >
      <template #default="{ item: protocol }">
        <a
          :href="protocol.href"
          class="home-page__protocol"
          rel="noreferrer noopener"
          target="_blank"
        >
          <svg class="home-page__protocol-logo">
            <use :href="protocol.logoSrc" />
          </svg>
        </a>
      </template>
    </app-swiper>
    <projects-info />
  </main>
</template>

<script lang="ts" setup>
import { StatsPreview, ProjectsInfo } from '#components'
import { WINDOW_BREAKPOINTS } from '@/enums'

type Planet = {
  name: string
  imgSrc: string
  href: string
}

type Protocol = {
  name: string
  logoSrc: string
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
    name: 'vyper',
    imgSrc: '/img/home-page/planet-vyper.svg',
    href: 'https://docs.vyperlang.org/',
  },
]

const protocols: Protocol[] = [
  {
    name: 'q',
    logoSrc: '/img/home-page/q-logo.svg#q-logo',
    href: 'https://q.org/',
  },
  {
    name: 'dexe',
    logoSrc: '/img/home-page/dexe-logo.svg#dexe-logo',
    href: 'https://dexe.network/',
  },
  {
    name: 'rarimo',
    logoSrc: '/img/home-page/rarimo-logo.svg#rarimo-logo',
    href: 'https://rarimo.com/',
  },
  {
    name: 'tokene',
    logoSrc: '/img/home-page/tokene-logo.svg#tokene-logo',
    href: 'https://tokene.io/',
  },
]

const protocolsSwiperParams = {
  modules: [SwiperAutoplay],
  loop: true,
  spaceBetween: 8,
  slidesPerView: 'auto',
  speed: 4000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    [WINDOW_BREAKPOINTS.medium]: {
      spaceBetween: 24,
    },
  },
}
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
  aspect-ratio: 1512 / 2728;
  position: absolute;
  inset: 0;
  background-image: url('/img/home-page/bg.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  z-index: $z-index;

  @include respond-to(small) {
    aspect-ratio: 375 / 2200;
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
    with aspect-ratio 1512/2728 (for small 375/2200)
  */

  // planet-solidity
  &:nth-child(1) {
    width: 39.0873%; // 591px on 1512px width
    top: 19.9413%; // 544px on 2728px height
    left: 63.8888%; // 966px on 1512px width

    @include respond-to(small) {
      width: 72.2666%; // 271px on 375px width
      top: 19.0909%; // 420px on 2200px height
      left: 53.3333%; // 200px on 375px width
    }
  }

  // planet-zk
  &:nth-child(2) {
    width: 8.8624%; // 134px on 1512px width
    top: 37.2434%; // 1016px on 2728px height
    left: 54.1666%; // 819px on 512px width

    @include respond-to(small) {
      width: 15.2%; // 57px on 375px width
      top: 28.2272%; // 621px on 2200px height
      left: 39.7333%; // 149px on 964px height
    }
  }

  // planet-hardhat
  &:nth-child(3) {
    width: 15.2777%; // 231px on 1512px width
    top: 23.7903%; // 649px on 2728px height
    left: 20.701%; // 313px on 1512px width

    @include respond-to(small) {
      width: 30.9333%; // 116px on 1512px width
      top: 18.6363%; // 410px on 2200px height
      left: -2.4%; // -9px pn 375px width
    }
  }

  // planet-graph
  &:nth-child(4) {
    width: 10.3174%; // 156px on 1512px width
    top: 17.3753%; // 474px on 2728px height
    left: 41.9973%; // 635px on 1512px width

    @include respond-to(small) {
      width: 20.2666%; // 76px on 375px width
      top: 15.3636%; // 338px on 2200px height
      left: 37.3333%; // 140px on 375px width
    }
  }

  // planet-viper
  &:nth-child(5) {
    width: 6.2169%; // 94px on 1512px width
    top: 13.8196%; // 377px on 2728px height
    left: 88.7566%; // 1342px on 1512px width

    @include respond-to(small) {
      width: 14.6666%; // 55px on 375px width
      top: 15.3636%; // 338px on 2200px height
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

.home-page .home-page__protocols-swiper {
  --swiper-wrapper-transition-timing-function: linear;

  position: relative;
  z-index: $z-index;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000000 20%,
    #000000 80%,
    transparent
  );

  :deep(.app-swiper__slide) {
    max-width: max-content;
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
  color: var(--text-primary-light);
  padding: toRem(24) toRem(36);
  border-radius: var(--border-radius-main);
  transition: var(--transition-duration-fast) var(--transition-timing-default);
  width: toRem(400);

  &:not([disabled]):hover {
    color: var(--primary-light);
    background: var(--background-primary-dark);
  }

  &:not([disabled]):focus,
  &:not([disabled]):active {
    color: var(--primary-main);
    background: var(--background-primary-dark);
  }

  @include respond-to(medium) {
    font-size: toRem(16);
    line-height: toRem(24);
    gap: toRem(4);
    padding: toRem(16) toRem(24);
    width: toRem(300);
  }

  @include respond-to(small) {
    width: toRem(200);
  }
}

.home-page__protocol-logo {
  height: toRem(40);

  @include respond-to(medium) {
    height: toRem(32);
  }
}
</style>
