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

const handleFile = (buffer: string | ArrayBuffer | null) => {
  mealForm.photo = buffer
  picture.setData(buffer)
}

const resetImage = () => {
  mealForm.photo = null
  picture.setData(null)
}
</script>

<template>
  <div class="relative flex flex-col h-full bg-amber-300">
    <div v-if="image" class="relative pr-2">
      <image-resizer :image-src="image" class="px-4 py-4" @update:image-src="resetImage" />
    </div>
    <div v-else class="flex justify-center items-center px-4 py-4">
      <CaptureImageButton class="max-w-min" @capture="handleFile" />
    </div>
    <div class="info overflow-y-scroll rounded-t-7 flex-grow w-full max-w-192 mx-auto bg-lime-300 border-4 border-black px-4 py-4">
      <router-view v-model:model="mealForm" class="mb-4" />
      <div class="flex items-center justify-between rounded px-3 pb-2 pt-1 border-4 border-black bg-amber-300 w-full">
        <span class="text-5 font-bold">
          Done?
        </span>
        <div class="flex gap-1 justify-end w-full items-center">
          <MButton class="bg-gray-200! text-gray-700! rounded font-bold">
            nah, drop
          </MButton> <span class="text-8 inline-block ml-.5">|</span>
          <MButton class="bg-pink-500! hover:shadow-black! text-white! rounded font-bold">
            Yessir, save!
          </MButton>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
