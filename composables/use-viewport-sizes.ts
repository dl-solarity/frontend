import { debounce } from 'lodash-es'
import { onBeforeUnmount } from 'vue'

export const useViewportSizes = (): { assignVhCssVariable(): void } => {
  const assignVhCssVariable = () => {
    const vh = (window.innerHeight * 0.01).toFixed(5)
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  const assignVhCssVariableDebounced = debounce(assignVhCssVariable, 300)

  window.addEventListener('resize', assignVhCssVariableDebounced)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', assignVhCssVariableDebounced)
  })

  return { assignVhCssVariable }
}
