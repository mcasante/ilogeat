<script setup lang="ts">
// define emit
const emit = defineEmits<{
  (e: 'capture', file: string | ArrayBuffer | null): void
}>()

const modal = reactive({
  visible: false,
  reveal: () => modal.visible = true,
})

const { files, open } = useFileDialog({ accept: 'image/*' })

const hasCamera = computed(() => !!('capture' in HTMLInputElement?.prototype && 'files' in HTMLInputElement?.prototype))

watchEffect(async () => {
  const file = files.value?.[0]
  if (!file)
    return

  console.log(new Date(file.lastModified))

  const reader = new FileReader()
  const result = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    reader.addEventListener('load', (e) => {
      const result = e.target?.result
      if (!result)
        return

      resolve(result)
    })
    reader.addEventListener('error', e => reject(e))
    reader.readAsDataURL(file)
  })

  emit('capture', result)
  return result
})
//
const handleClick = () => {
  if (!hasCamera.value)
    return open()

  modal.reveal()
}

const searchFile = () => open({})
const takeAPhoto = () => open({ capture: 'environment' })
</script>

<template>
  <MButton v-bind="$attrs" class="add-meal-button flex justify-center items-center" @click="handleClick">
    <div class="i-carbon-drop-photo-filled" />
  </MButton>

  <m-modal v-model:visible="modal.visible" class="max-w-60">
    <h1 class="text-2xl font-bold mb-4">
      Add file
    </h1>
    <div class="flex justify-center flex-col gap-2">
      <MButton
        class="bg-gray-200! text-gray-700! rounded font-bold"
        @click="searchFile"
      >
        Search file
      </MButton>
      <MButton
        class="bg-pink-500! hover:shadow-black! text-white rounded font-bold"
        @click="takeAPhoto"
      >
        Take a photo
      </MButton>
    </div>
  </m-modal>
</template>

<style lang="scss" scoped>
.add-meal-button {
  @apply relative text-25 text-black w-100\% h-100\% rounded-4 bg-white;
}
</style>
