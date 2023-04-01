<script lang="ts" setup>
import { useRound } from '@vueuse/math'
const props = defineProps<{
  value: number
}>()

const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>()

const valueCopy = ref(props.value)
const roundValue = useRound(valueCopy)

const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const isAnimating = ref(false)
const animateValue = async (value: number) => {
  isAnimating.value = true
  const direction = Math.sign(value - valueCopy.value)

  if (!direction)
    return isAnimating.value = false
  const animate = async () => {
    if (roundValue.value === value)
      return
    await delay(50)
    valueCopy.value += direction
    await animate()
  }
  await animate()
  isAnimating.value = false
}

watch(props, async () => {
  if (!isAnimating.value)
    await animateValue(props.value)
})

watch(valueCopy, () => {
  if (!isAnimating.value)
    emit('update:value', roundValue.value)
})
</script>

<template>
  <div class="w-full max-w-xs">
    <input v-model.number="valueCopy" v-bind="$attrs" type="range" min="1" max="10" class="range mb-4!" step="1">
    <div class="w-full flex justify-between text-xs px-3.4">
      <span
        v-for="i in 10"
        :key="i" class=""
        :class="{
          ' text-5': i === 5,
          'text-pink-500!': i === +valueCopy,
          // 'text-gray-500/50': i < valueCopy,
        }"
      >|</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input[type=range] {
  @apply w-full my-1 bg-transparent appearance-none;

  &::-webkit-slider-runnable-track {
    @apply bg-black border-3 border-black rounded-2\.5 h-3 cursor-pointer;
  }

  &::-webkit-slider-thumb {
    @apply bg-pink-500 brutal border-3 border-black rounded-md w-7 h-7 -mt-3 cursor-pointer;
    -webkit-appearance: none;
  }

  &::-moz-range-track {
    @apply bg-black border-3 border-black rounded-2\.5 h-3 cursor-pointer;
  }

  &::-moz-range-thumb {
    @apply bg-pink-500 brutal border-3 border-black rounded-md w-7 h-7 cursor-pointer;
  }

  &::-ms-track {
    @apply bg-transparent border-transparent border-b-3 border-t-3 h-3 cursor-pointer;
  }

  &::-ms-fill-lower {
    @apply bg-black border-3 border-black rounded-md;
  }

  &::-ms-fill-upper {
    @apply bg-black border-3 border-black rounded-md;
  }

  &::-ms-thumb {
    @apply bg-pink-500 brutal border-3 border-black rounded-md w-7 h-7 cursor-pointer;
    margin-top: 0;
    /* Needed to keep the Edge thumb centred */
    -webkit-appearance: none;
  }
}

input[type=range]:focus {
  @apply outline-none;

  &::-webkit-slider-runnable-track {
    @apply bg-gray-900;
  }

  &::-moz-range-track {
    @apply bg-gray-900;
  }

  &::-ms-fill-lower {
    @apply bg-gray-900;
  }

  &::-ms-fill-upper {
    @apply bg-gray-900;
  }
}

/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align:auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type=range] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}
</style>
