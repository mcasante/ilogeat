<script setup lang="ts">
import photo from '~/assets/sample-plate.jpeg'
import gridSvg from '~/assets/grid.svg'
import { remoteLoadMeals } from '~/api/index'
import type { Meal } from '~/api/index'
import MButton from '~/components/shared/MButton.vue'

defineOptions({ name: 'appIndex' })

interface FormatedMeal extends Meal { time: string }
type MealItems = FormatedMeal | { add: true }

const getTime = (timestamp: number): string => new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
const mapMeal = (meal: Meal): FormatedMeal => ({
  ...meal,
  photo,
  time: getTime(meal.timestamp),
})

const meals = ref<FormatedMeal[]>(
  (await remoteLoadMeals()).map(mapMeal),
)
const mealItems = computed<MealItems[]>(() => [...(meals.value || []), { add: true }])

const currentIndex = ref(mealItems.value.length - 1)
const currentMeal = computed(() => meals.value?.[currentIndex.value])

const handleRemove = (mealId: Meal['id'], tag: string): void => {
  const found = meals.value?.find(m => m.id === mealId)
  if (found)
    found.tags = found.tags?.filter(t => t !== tag)
}

const handleFile = (buffer: string | ArrayBuffer | null) => {
  console.log(buffer)
  // TODO: handle file
}

const CarouselControls = () => h('div',
  { class: 'flex justify-center' },
  [
    h(MButton, {
      disabled: currentIndex.value <= 0,
      class: 'rounded-l',
      onClick: () => currentIndex.value--,
    }, () => h('div', { class: 'i-carbon-caret-left' })),
    h(MButton, {
      disabled: currentIndex.value >= mealItems.value.length - 1,
      class: 'rounded-r',
      onClick: () => currentIndex.value++,
    }, () => h('div', { class: 'i-carbon-caret-right' })),
  ])

const updateCarousel = (item: FormatedMeal) => {
  if (!mealItems.value.includes(item) || item === mealItems.value[currentIndex.value])
    return
  currentIndex.value = mealItems.value.findIndex(i => i === item)
}
</script>

<template>
  <section v-if="meals?.length" class="flex flex-col bg-pink-300 h-full md:max-w-192 md:mx-auto md:shadow-lg shadow-black/25 md:rounded-md">
    <MCarousel
      v-model:active.sync="currentIndex"
      :style="{ backgroundImage: `url(${gridSvg})`, backgroundSize: '50px 50px' }"
      class="bg-repeat bg-repeat bg-pink-300" :max-width="250" :items="mealItems"
    >
      <template #default="{ item }">
        <CaptureImageButton v-if="item.add" @capture="handleFile" />
        <div v-else class="border-3 brutal rounded-2 h-100% overflow-hidden border-black" @click="updateCarousel(item)">
          <img :src="item.photo" class="block rounded image-render-pixel">
        </div>
      </template>
    </MCarousel>
    <div class="info rounded-t-7 flex-grow bg-yellow-200/80 border-4 border-black px-4 py-4">
      <MealData :meal="currentMeal" @remove-tag="handleRemove">
        <template #controls>
          <CarouselControls class="mt-2" />
        </template>
      </MealData>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<route lang="yaml">
meta:
  layout: app
</route>
