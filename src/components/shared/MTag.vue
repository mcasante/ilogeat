<script setup lang="ts">
const props = defineProps<{
  type?: string
  removable?: boolean
}>()

const emit = defineEmits<{
  (event: 'remove'): void
}>()

const tag = ref()
const { width } = useElementBounding(tag)

let maxWidth = 0
watch(width, (value) => {
  if (value > maxWidth)
    maxWidth = value
}, { immediate: true })

const selected = ref(false)

watch(selected, (value) => {
  if (!value)
    return

  setTimeout(() => {
    selected.value = false
  }, 1000)
})

const handleClick = () => {
  if (!props.removable)
    return

  if (selected.value)
    return emit('remove')

  selected.value = !selected.value
}

const styles = {
  common: {
    base: 'text-center transition-250 min-w-max px-3 py-1 text-4 bg-cyan-600 text-white',
    selected: 'bg-red-300',
  },
  default: {
    base: 'border border-black/50 rounded-1.5 shadow shadow-black/25',
    selected: '',
  },
  neubrutalist: {
    base: 'border-3 bg-pink-500 border-black rounded-1.5',
    selected: '',
  },
}

const type: keyof typeof styles = 'neubrutalist'

const classes = computed(() => {
  // const type = props.type || 'default'
  const style = styles[type]

  return {
    base: `${style.base} ${styles.common.base}`,
    selected: `${style.selected} ${styles.common.selected}`,
  }
})
</script>

<template>
  <div class="inline-block">
    <div
      ref="tag"
      :style="{ width: `${maxWidth}px` }"
      :class="{
        [classes.selected]: selected,
        [classes.base]: true,
        'cursor-pointer': props.removable,
      }"
      @click="handleClick"
    >
      <slot v-if="!(selected)" />
      <span v-if="selected" v-text="'x'" />
    </div>
  </div>
</template>
