<script lang="ts" setup>
import type { Meal } from '~/api'
const props = defineProps<{ id?: string }>()
const picture = usePictureStore()

interface MealForm {
  name: string
  photo: string | ArrayBuffer | null
  timestamp: number
}
const loadMealData = async (id: string): Promise<Meal | null> => null

const mealData = await (async () => {
  if (!props.id)
    return
  return await loadMealData(props.id)
})()

const mealForm = reactive<MealForm>({
  name: mealData?.name || '',
  photo: mealData?.photo || null,
  timestamp: mealData?.timestamp || Date.now(),
})

const image = computed(() => mealForm.photo || picture.savedPicture || null)
</script>

<template>
  <div class="flex flex-col h-full">
    <image-resizer :image-src="image" class="shrink px-4 py-4" />
    <div class="info rounded-t-7 grow-1 flex-grow w-full max-w-192 mx-auto bg-amber-300 border-4 border-black px-4 py-4">
      <router-view />
      <m-button class="rounded">
        Cancel
      </m-button>
      <m-button class="rounded">
        Save
      </m-button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
</route>
