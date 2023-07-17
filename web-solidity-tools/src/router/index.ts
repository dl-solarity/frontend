import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

import { ROUTE_NAMES } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: ROUTE_NAMES.addressPredicator },
  },
  {
    path: '/address-predicator',
    name: ROUTE_NAMES.addressPredicator,
    component: () => import('@/pages/AddressPredictorPage.vue'),
  },
  {
    path: '/abi',
    name: ROUTE_NAMES.abi,
    component: () => import('@/pages/AddressPredictorPage.vue'),
  },
  {
    path: '/hash-functions',
    name: ROUTE_NAMES.hashFunctions,
    component: () => import('@/pages/AddressPredictorPage.vue'),
  },
  {
    path: '/converter',
    name: ROUTE_NAMES.converter,
    component: () => import('@/pages/AddressPredictorPage.vue'),
  },
  {
    path: '/unix-epoch',
    name: ROUTE_NAMES.unixEpoch,
    component: () => import('@/pages/AddressPredictorPage.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export { router, useRouter, useRoute }
