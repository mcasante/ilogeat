<script setup lang="ts">
// define emit
const emit = defineEmits<{
  (e: 'capture', file: string | ArrayBuffer | null): void
}>()

const { files, open } = useFileDialog({ capture: 'environment', accept: 'image/*' })

watchEffect(async () => {
  const file = files.value?.[0]
  if (!file)
    return

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
</script>

<template>
  <MButton class="add-meal-button flex justify-center items-center" @click="open">
    <div class="i-carbon-drop-photo-filled" />
  </MButton>
</template>

<style lang="scss" scoped>
.add-meal-button {
  @apply relative text-25 text-black w-100\% h-100\% rounded-4 bg-white;
}
</style>
