<script setup lang="ts">
import gridSvg from '~/assets/grid.svg'
import { remoteLoadMeals } from '~/api/index'
import type { Meal } from '~/api/index'
import MButton from '~/components/shared/MButton.vue'

defineOptions({ name: 'appIndex' })

interface FormatedMeal extends Meal { time: string }
type MealItems = FormatedMeal | { add: true }

// const getToday = (): string => new Date().toISOString().split('T')[0]

const getTime = (timestamp: number): string => new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
const mapMeal = (meal: Meal): FormatedMeal => ({
  ...meal,
  photo: 'https://picsum.photos/250/250',
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

// random css transform tilt
const randomTilt = () => `rotate(${Math.random() * 10 - 5}deg)`

const updateCarousel = (item: FormatedMeal) => {
  if (!mealItems.value.includes(item) || item === mealItems.value[currentIndex.value])
    return
  currentIndex.value = mealItems.value.findIndex(i => i === item)
}
</script>

<template>
  <section v-if="meals?.length" class="flex flex-col bg-pink-300 h-full">
    <MCarousel
      v-model:active.sync="currentIndex"
      :style="{ backgroundImage: `url(${gridSvg})`, backgroundSize: '50px 50px' }"
      class="bg-repeat bg-repeat bg-pink-300" :max-width="250" :items="mealItems"
    >
      <template #default="{ item, isSwiping }">
        <CaptureImageButton v-if="item.add" @capture="handleFile" />
        <div v-else :style="{ transform: isSwiping ? 'none' : randomTilt() }" class="transition-250 border-3 p-2 bg-white rounded-lg h-100% overflow-hidden border-black" @click="updateCarousel(item)">
          <img :src="item.photo" class="block rounded-lg image-render-pixel">
        </div>
      </template>
    </MCarousel>
    <div class="info rounded-t-7 flex-grow w-full max-w-192 mx-auto bg-amber-300 border-4 border-black px-4 py-4">
      <MealData :meal="currentMeal" @remove-tag="handleRemove">
        <template #controls>
          <CarouselControls class="mt-2" />
        </template>
      </MealData>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: app
</route>
