import { ICON_NAMES, ROUTE_NAMES } from '@/enums'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $routes: typeof ROUTE_NAMES
    $icons: typeof ICON_NAMES
  }
}
