import type { Ref } from 'vue'
import { useClamp } from '@vueuse/math'
// import { defineEmits } from 'vue'

interface Options {
  maxWidth?: number
}

export function useCarousel(target: Ref<any>, length: Ref<number>, options: Options = {}) {
  const { maxWidth } = options
  const boundings = useElementBounding(target)

  const itemWidth = computed(() => maxWidth
    ? Math.min(maxWidth, boundings.width.value)
    : boundings.width.value)

  const numItems = computed(() => length.value)
  const containerWidth = computed(() => (numItems.value) * (itemWidth.value))

  const currentIndex = useClamp(0, 0, numItems.value - 1)

  const { isSwiping, lengthX } = useSwipe(target, {
    threshold: 10,
    onSwipeEnd: () => {
      const direction = 1
      const tolerance = Math.sign(lengthX.value) * 0.7
      const draggedSlides
          = Math.round(lengthX.value / containerWidth.value + tolerance) * direction

      currentIndex.value += draggedSlides
    },
  })

  return {
    currentIndex,
    isSwiping,
    lengthX,
    boundings,
    itemWidth,
    containerWidth,
  }
}
