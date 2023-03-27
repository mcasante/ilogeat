<script lang="ts" setup>
interface Carousel<T> {
  items: T[]
  active: number
  maxWidth?: number
}

const props = defineProps<Carousel<any>>()
const emit = defineEmits<{
  (event: 'update:active', value: number): void
  (event: 'click', value: any): void
}>()

const carousel = ref()
const numItems = computed(() => props.items.length)

const {
  isSwiping,
  lengthX,
  currentIndex,
  boundings,
  itemWidth,
  containerWidth,
} = useCarousel(carousel, numItems, { maxWidth: props.maxWidth })

watch(props, () => {
  currentIndex.value = props.active
}, { immediate: true })

watch(currentIndex, (value) => {
  emit('update:active', value)
})

const translation = computed(() => {
  const dragged = isSwiping.value ? lengthX.value : 0
  const translateX = -(currentIndex.value * (itemWidth.value))
  const startPoint = (boundings.width.value / 2) - (itemWidth.value / 2)
  return startPoint + translateX - dragged
})

const containerStyles = computed(() => ({
  ...(isSwiping.value ? { transition: 'none' } : {}),
  transform: `translateX(${translation.value}px)`,
  width: `${containerWidth.value}px`,
}))

const getSlideStyle = (index: number) => {
  const offset = 40
  const diff = index - currentIndex.value
  const left = Math.sign(diff) === -1

  const x = -diff * (left ? offset : offset / 7)
  return {
    transform: isSwiping.value
      ? 'none'
      : `translateX(${x}%) scale(${1 - -diff * 0.1})`,
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
        <slot :item="item" :index="index" :is-swiping="isSwiping" @click="emit('click', item)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  @apply relative overflow-hidden w-auto py-8;
}

.carousel-container {
  @apply max-w-unset flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  @apply w-full pr-3 pl-6;
  transition: transform 0.5s ease-in-out;
}

.active {
  // @apply z-10;
}
</style>
