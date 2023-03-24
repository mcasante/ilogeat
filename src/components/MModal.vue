<script setup lang="ts">
const props = withDefaults(defineProps<{
  visible: boolean
  showClose?: boolean
}>(), { showClose: true })

// declarer emit
const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const handleOverleyClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget)
    emit('update:visible', false)
}

watchEffect(() => {
  if (props.visible)
    document.body.classList.add('overflow-hidden')
  else
    document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <teleport to="body">
    <div v-if="visible" class="modal backdrop-blur" @click="handleOverleyClick">
      <div class="w-full max-w-200 bg-white rounded c-style py-4 px-4 relative mx-2">
        <button v-show="showClose" class="absolute transition rounded top-0 right-0 p-2 hover:bg-#2221 m-1" @click="emit('update:visible', false)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
