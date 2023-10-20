// Based on composable of vueuse. See https://vueuse.org/core/useImage/

import { useAsyncState, UseAsyncStateOptions } from '@vueuse/core'
import { watch } from 'vue'

export interface UseImageOptions {
  /** Address of the resource */
  src: HTMLImageElement['src']
  /** Images to use in different situations, e.g.,
   * high-resolution displays, small monitors, etc.
   */
  srcset?: HTMLImageElement['srcset']
  /** Image sizes for different page layouts */
  sizes?: HTMLImageElement['sizes']
  /** Image alternative information */
  alt?: HTMLImageElement['alt']
  /** Image classes */
  class?: HTMLImageElement['className']
  /** Image loading */
  loading?: HTMLImageElement['loading']
  /** Image CORS settings */
  crossorigin?: HTMLImageElement['crossOrigin']
  /** Referrer policy for fetch https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy */
  referrerPolicy?: HTMLImageElement['referrerPolicy']
}

async function loadImage(options: UseImageOptions): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.src = options.src

    if (options.srcset) img.srcset = options.srcset

    if (options.sizes) img.sizes = options.sizes

    if (options.class) img.className = options.class

    if (options.loading) img.loading = options.loading

    if (options.crossorigin) img.crossOrigin = options.crossorigin

    if (options.referrerPolicy) img.referrerPolicy = options.referrerPolicy

    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

/**
 * Reactive load an image in the browser,
 * you can wait the result to display it or show a fallback.
 *
 * @see https://vueuse.org/useImage
 * @param options Image attributes, as used in the <img> tag
 * @param asyncStateOptions
 */
export function useImage<Shallow extends true>(
  options: UseImageOptions,
  asyncStateOptions: UseAsyncStateOptions<Shallow> = {},
) {
  const state = useAsyncState<HTMLImageElement | undefined>(
    () => loadImage(options),
    undefined,
    {
      resetOnExecute: true,
      ...asyncStateOptions,
    },
  )

  watch(
    () => options,
    () => state.execute(asyncStateOptions.delay),
    { deep: true },
  )

  return state
}

export type UseImageReturn = ReturnType<typeof useImage>
