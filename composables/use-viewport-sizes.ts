import { WINDOW_BREAKPOINTS } from '@/enums'
import { computed, type ComputedRef } from 'vue'

export interface IUseViewportSizes {
  isSmallBreakpoint: ComputedRef<boolean>
  assignVhCssVariable: () => void
}

export const useViewportSizes = (): IUseViewportSizes => {
  const { width } = useWindowSize()

  const isSmallBreakpoint = computed(
    () => width.value < WINDOW_BREAKPOINTS.small,
  )

  const assignVhCssVariable = () => {
    const vh = (window.innerHeight * 0.01).toFixed(5)
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  return { isSmallBreakpoint, assignVhCssVariable }
}
