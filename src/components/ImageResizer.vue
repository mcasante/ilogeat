<script lang="ts" setup>
const props = defineProps<{
  imageSrc: string
}>()

const scale = ref(1)
const sliderValue = ref(1)
const canvas = ref()
const image = ref(new Image())
const container = ref()
const { width } = useElementSize(container)

const size = reactive({
  x: 0,
  y: 0,
})

watchEffect(() => {
  if (!(canvas.value && width.value))
    return
  canvas.value.width = width.value
  canvas.value.height = width.value
})

let ctx: CanvasRenderingContext2D

const ar = computed(() => {
  if (!image.value)
    return [0, 0]
  const { width, height } = image.value
  const aspectRatio = width / height
  const newWidth = width * aspectRatio
  const newHeight = height * aspectRatio
  return [newWidth, newHeight]
})

const map: { [key: number]: any } = {
  0: (x: number) => {
    size.x = canvas.value.width
    size.y = size.x / x * ar.value[1]
  },
  1: (y: number) => {
    size.y = canvas.value.height
    size.x = size.y / y * ar.value[0]
  },
}

const drawImage = (scale: number) => {
  ctx.save()
  ctx.translate(canvas.value.width / 2, canvas.value.width / 2)
  const [x, y, w, h] = [
    (-size.x * scale / 2),
    (-size.y * scale / 2),
    size.x * scale,
    size.y * scale,
  ]

  ctx.fillStyle = 'pink'
  ctx.fillRect(-canvas.value.width / 2, -canvas.value.width / 2, canvas.value.width, canvas.value.height)

  ctx.drawImage(
    image.value,
    0, 0,
    image.value.width,
    image.value.height,
    x, y, w, h,
  )
  ctx.restore()
}

const updateScale = (sliderValue: number) => {
  const minScale = 1
  const maxScale = 2
  const sliderRange = 100
  const sliderPercentage = sliderValue / sliderRange
  const scaleRange = maxScale - minScale
  const newScale = minScale + sliderPercentage * scaleRange
  scale.value = newScale
  drawImage(scale.value)
}

watch(sliderValue, (value) => {
  updateScale(value)
})

watchEffect(() => {
  if (!(props.imageSrc && canvas.value))
    return

  ctx = canvas.value.getContext('2d')
  image.value.src = props.imageSrc
  image.value.onload = () => {
    const max = Math.max(...ar.value)

    const greater: keyof typeof map = ar.value.findIndex(v => v === max)
    map[greater](max)
    drawImage(1)
  }
})
</script>

<template>
  <div ref="container" class="pinch-zoom-canvas">
    <div class="pinch-zoom-canvas__canvas-wrapper">
      <canvas ref="canvas" class="w-full" />
    </div>
    <div class="pinch-zoom-canvas__slider-wrapper">
      <input v-model.number="sliderValue" type="range" min="1" max="100" step="1">
    </div>
  </div>
</template>

<style scoped>
.pinch-zoom-canvas {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.pinch-zoom-canvas__canvas-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pinch-zoom-canvas__slider-wrapper {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 50px;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #ddd;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

input[type="range"]:hover {
  opacity: 1;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #007aff;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #007aff;
  cursor: pointer;
}
</style>
