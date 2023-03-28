<script setup lang="ts">
const props = withDefaults(defineProps<{
  visible: boolean
  closable?: boolean
}>(), { closable: true })

// declarer emit
const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

defineOptions({
  inheritAttrs: false,
})

const handleOverleyClick = (e: MouseEvent) => {
  if (props.closable && e.target === e.currentTarget)
    emit('update:visible', false)
}

onMounted(() => {
  watchEffect(() => {
    if (props.visible)
      document.body.classList.add('overflow-hidden')
    else
      document.body.classList.remove('overflow-hidden')
  })
})
</script>

<template>
  <teleport to="body">
    <Transition>
      <div v-if="visible" class="modal backdrop-blur transition-filter-300 bg-white/25" @click="handleOverleyClick">
        <div v-bind="$attrs" class="w-full max-w-192 bg-white rounded-7 brutal p-4 relative mx-2">
          <button v-show="closable" class="hover:bg-red hover:text-white absolute transition text-5 rounded-7 border-3 border-black text-red top-0 right-0 p-1 hover:bg-#2221 m-1" @click="emit('update:visible', false)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal {
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-transform: translate3d(0,0,0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  transform: translate3d(0,0,0);
  transform: translateZ(0);
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
