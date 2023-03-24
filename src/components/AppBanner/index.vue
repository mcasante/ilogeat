<script setup lang="ts">
import { createGameLoop, drawLogo, drawPhone, getSpheres, retrieveData } from './service'

const props = defineProps<{
  anchor: HTMLElement
}>()

const { width } = useWindowSize()
const bounding = reactive(useElementBounding(ref(props.anchor)))
const overlay = ref<HTMLDivElement>()
const canvasElement = ref<HTMLCanvasElement>()
const canvasBg = ref<HTMLCanvasElement>()

const distanceTop = computed(() => {
  const { top } = bounding
  return top + window.pageYOffset
})

const bottomDistance = computed(() => {
  const { height } = bounding
  return (distanceTop.value) + height
})

const setSize = () => {
  canvasElement.value?.setAttribute('width', width.value.toString())
  canvasElement.value?.setAttribute('height', bottomDistance.value.toString())
  canvasBg.value?.setAttribute('width', width.value.toString())
  canvasBg.value?.setAttribute('height', bottomDistance.value.toString())
  overlay.value?.setAttribute('style', `width: ${width.value}px; height: ${bottomDistance.value}px;`)
}

const draw = async () => {
  const ctx = canvasElement.value?.getContext('2d')
  const canvas = canvasElement.value
  if (!(ctx && canvas))
    return console.log('no canvas or context')

  const data = retrieveData(canvas, width.value, distanceTop.value)
  ctx.font = `${data.font}px Itim`
  ctx.textBaseline = 'middle'
  ctx.imageSmoothingEnabled = false

  drawLogo(ctx, data)
  drawPhone(ctx, data)

  const gradient = ctx.createLinearGradient(0, data.pseudoHeight * 1.7, 0, canvas.height)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, data.yOffset, canvas.width, canvas.height)
}

const setSpheres = async () => {
  const bgCtx = canvasBg.value?.getContext('2d')
  if (!(canvasBg.value && bgCtx))
    return console.log('Bg Canvas not found')
  const spheres = getSpheres(canvasBg.value)
  const loop = await createGameLoop(canvasBg.value, bgCtx, spheres)
  loop()
}

watch(width, async () => {
  await nextTick()
  setSize()
  draw()
  setSpheres()
}, { immediate: true })
</script>

<template>
  <canvas ref="canvasBg" class="absolute top-0 left-0 z--2" />
  <canvas ref="canvasElement" class="absolute top-0 left-0 z--2" />
</template>

