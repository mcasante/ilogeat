<script lang="ts" setup>
import { useClamp } from '@vueuse/math'
interface Carousel<T> {
  items: T[]
}

const props = withDefaults(defineProps<Carousel<any>>(), {})

const carousel = ref()
const boundings = useElementBounding(carousel)

const numItems = computed(() => props.items.length)
const width = computed(() => (numItems.value) * (boundings.width.value))

const currentIndex = useClamp(numItems.value, 0, numItems.value - 1)

const { isSwiping, lengthX } = useSwipe(carousel, {
  threshold: 10,
  onSwipeEnd: () => {
    const direction = 1
    const tolerance = Math.sign(lengthX.value) * 0.5
    const draggedSlides
        = Math.round(lengthX.value / width.value + tolerance) * direction

    currentIndex.value += draggedSlides
  },
})

const translation = computed(() => {
  return -1 * (currentIndex.value * (boundings.width.value))
})

const containerStyles = computed(() => ({
  ...(isSwiping.value ? { transition: 'none' } : {}),
  transform: `translateX(${translation.value - (isSwiping.value ? lengthX.value : 0)}px)`,
  width: `${width.value}px`,
}))

const getSlideStyle = (index: number) => {
  const offset = 50
  const diff = index - currentIndex.value
  const left = Math.sign(diff) === -1

  const x = -diff * (left ? offset : offset / 2)
  return {
    transform: isSwiping.value
      ? 'none'
      : `
          translateX(${x}%)
          scale(${1 - Math.abs(diff) * 0.1})
        `,
  }
}
</script>

<template>
  <div ref="carousel" class="carousel">
    <div ref="container" class="carousel-container" :style="{ ...containerStyles }">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item"
        :class="{ active: index === currentIndex }"
        :style="{
          ...getSlideStyle(index),
        }"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  @apply relative overflow-hidden w-auto py-4;
}

.carousel-container {
  @apply max-w-unset flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  @apply w-full pr-3 pl-6;
  transition: transform 0.3s ease-in-out;
}

.active {
  @apply z-99
}
</style>
