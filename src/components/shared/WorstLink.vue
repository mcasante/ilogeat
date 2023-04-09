<script setup lang="ts">
type IsBlueFn = (r: number, g: number, b: number) => boolean
type ResizeCanvasFn = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => void

const props = defineProps<{
  href: string
  label: string
}>()

const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

const { x: rawX, y: rawY } = useMouse()
const { x: elOffsetX, y: elOffsetY } = useElementBounding(canvas)

const mouse = computed(() => ({
  x: rawX.value - elOffsetX.value,
  y: rawY.value - elOffsetY.value,
}))

const isBlue: IsBlueFn = (r, g, b) => {
  const blueDiff = b - (r + g) / 2
  return blueDiff >= 50 && b >= 100
}

const resize: ResizeCanvasFn = (ctx, canvas) => {
  ctx.font = '32px Arial'
  const height = parseInt(ctx.font)
  const { width } = ctx.measureText(props.label)
  canvas.height = height
  canvas.width = width
}

const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.textBaseline = 'top'
  ctx.font = '32px Arial'
  ctx.fillStyle = '#0000ff'
  ctx.fillText(props.label, 0, 0)
}

const handleClick = () => {
  if (!ctx.value)
    return

  const { x, y } = mouse.value
  const [r, g, b] = ctx.value.getImageData(x, y, 1, 1).data
  ctx.value.fillRect(x, y, 1, 1)

  if (!isBlue(r, g, b))
    return

  window.location.href = props.href
}

watch(canvas, () => {
  if (!canvas.value)
    return

  ctx.value = canvas.value!.getContext('2d')!
  resize(ctx.value, canvas.value)
  draw(ctx.value)

  window.addEventListener('mousedown', handleClick)
}, { immediate: true })
</script>

<template>
  <canvas ref="canvas" />
</template>
