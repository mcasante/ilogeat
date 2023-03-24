<script lang="ts" setup>
import { useClamp } from '@vueuse/math'
interface Carousel<T> {
  items: T[]
}

const props = withDefaults(defineProps<Carousel<any>>(), {})

const carousel = ref()
const boundings = useElementBounding(carousel)

const width = computed(() => props.items.length * (boundings.width.value))
const numItems = computed(() => props.items.length)

const currentIndex = useClamp(numItems.value, 0, numItems.value - 1)

const { isSwiping, lengthX } = useSwipe(carousel, {
  threshold: 10,
  onSwipeEnd: () => {
    const direction = 1
    const tolerance = Math.sign(lengthX.value) * 0.9
    const draggedSlides
        = Math.round(lengthX.value / width.value + tolerance) * direction

    console.log(draggedSlides)
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

// function prevItem() {
//   currentIndex.value = Math.max(0, currentIndex.value - 1)
// }

// function nextItem() {
//   currentIndex.value = Math.min(numItems.value - 1, currentIndex.value + 1)
// }
</script>

<template>
  <div ref="carousel" class="carousel">
    <div ref="container" class="carousel-container" :style="{ ...containerStyles }">
      <div v-for="(item, index) in items" :key="index" class="carousel-item">
        <slot :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: auto;
}

.carousel-container {
  max-width: unset;
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  width: calc(100% - 20px);
  margin-right: 10px;
}

.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

.carousel-prev {
  left: 20px;
}

.carousel-next {
  right: 20px;
}
</style>
