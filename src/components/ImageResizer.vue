<script lang="ts" setup>
import { useGesture } from '@vueuse/gesture'
import { useMotion } from '@vueuse/motion'
import { useClamp } from '@vueuse/math'

const props = defineProps<{
  imageSrc: string
}>()

const canvas = ref()
const image = ref()
const container = ref()
const thumb = ref()
const { width, height } = useElementSize(container)

const spring = useMotion(thumb as any)

const min = computed(() => height.value && thumb.value
  ? thumb.value.offsetHeight - height.value
  : 0)

const moved = useClamp(0, min, 0)

let lastPos = 0
const dragHandler = (e: any) => {
  if (!document)
    return

  const { movement: [_, y], dragging } = e
  if (!dragging) {
    spring.apply({ cursor: 'grab' })
    document.body.classList.add('overflow-hidden')
    return
  }

  document.body.classList.remove('overflow-hidden')

  moved.value = lastPos + y
  spring.apply({ y: moved.value, cursor: 'grabbing' })
}

// Composable usage
useGesture({
  onDragStart: () => lastPos = moved.value,
  onDrag: dragHandler,
  onDragEnd: () => spring.apply({ y: moved.value, cursor: 'default' }),
},
{
  domTarget: thumb,
  drag: {
    useTouch: true,
  },
},
)

const model = reactive({
  scale: 1,
  slider: 1,
})

const size = reactive<{ [key: string]: number }>({
  x: 0,
  y: 0,
})

let ctx: CanvasRenderingContext2D

const ar = computed(() => {
  if (!image?.value?.src)
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
  if (!Image)
    return

  image.value = new Image()
  ctx.save()
  const [full, half] = new Array(2).fill(canvas.value.width).map((n, i) => n / (i + 1))
  const [x, y, w, h] = new Array(2).fill(['x', 'y'])
    .map((entry, i) => (
      entry
        .map((n: keyof typeof size) => size[n] * scale)
        .map((n: number) => i ? n : -n / 2)
    )).flat()

  ctx.fillStyle = 'pink'
  ctx.translate(half, half)
  ctx.fillRect(-half, -half, full, full)

  ctx.drawImage(
    image.value,
    0, 0,
    image.value.width,
    image.value.height,
    x, y, w, h,
  )
  ctx.restore()
}

const updateScale = (value: number) => {
  const minScale = 1
  const maxScale = 2
  const sliderPercentage = value / height.value
  const scaleRange = maxScale - minScale
  const newScale = minScale + sliderPercentage * scaleRange
  model.scale = newScale
  drawImage(model.scale)
}

watch(moved, (value: number) => updateScale(-value))

watchEffect(async () => {
  if (!canvas.value)
    return
  canvas.value.width = width.value
  canvas.value.height = width.value
  await setup()
  drawImage(model.scale)
})

watchEffect(() => {
  if (ctx)
    updateScale(model.slider)
})

function setup(): Promise<void> {
  ctx = canvas.value.getContext('2d')
  image.value.src = props.imageSrc
  return new Promise((resolve) => {
    image.value.addEventListener('load', () => {
      const max = Math.max(...ar.value)

      const greater: keyof typeof map = ar.value.findIndex(v => v === max)
      map[greater](max)
      resolve()
    })
  })
}
</script>

<template>
  <div ref="container" class="pinch-zoom-canvas">
    <div class="max-w-120 max-h-120 flex items-stretch  gap-4">
      <div class="slider w-4 flex items-end bg-gray-400">
        <div
          ref="thumb"
          v-motion="'thumb'"
          class="slider__thumb bg-gray-600 rounded-full w-8 h-8"
        />
      </div>
      <div>
        <canvas ref="canvas" class="w-full" />
      </div>
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
