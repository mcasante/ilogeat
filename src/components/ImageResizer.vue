<script lang="ts" setup>
import { useGesture } from '@vueuse/gesture'
import { useMotion } from '@vueuse/motion'
import { useClamp } from '@vueuse/math'

const props = defineProps<{
  imageSrc: string | ArrayBuffer | null
}>()

const canvas = ref()
const image = ref()
const container = ref()
const slider = ref()
const thumb = ref()
const { width } = useElementSize(container)
const { height } = useElementSize(slider)

const spring = useMotion(thumb as any)

const transition = {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  mass: 0.4,
}

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
    // spring.apply({ cursor: 'grab' })
    document.body.classList.add('overflow-hidden')
    return
  }

  document.body.classList.remove('overflow-hidden')

  moved.value = lastPos + y
  spring.apply({ y: moved.value, cursor: 'grabbing', transition })
}

// Composable usage
useGesture({
  onDragStart: () => lastPos = moved.value,
  onDrag: dragHandler,
  onDragEnd: () => spring.apply({ y: moved.value, cursor: 'default', transition }),
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
  ctx.save()
  const [full, half] = new Array(2).fill(canvas.value.width).map((n, i) => n / (i + 1))
  const [x, y, w, h] = new Array(2).fill(['x', 'y'])
    .map((entry, i) => (
      entry
        .map((n: keyof typeof size) => size[n] * scale)
        .map((n: number) => i ? n : -n / 2)
    )).flat()

  ctx.fillStyle = '#f9a8d4'
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
  return new Promise((resolve, reject) => {
    if (!Image)
      reject(new Error('Image is not defined'))

    image.value = new Image()
    image.value.src = props.imageSrc
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
  <div ref="container" class="pinch-zoom-canvas bg-amber-300">
    <div class="max-w-120 max-h-120 flex items-stretch gap-4">
      <div class="rounded-lg p-2 bg-white brutal">
        <canvas ref="canvas" class="b-1 b-black rounded-lg w-full" />
      </div>
      <div ref="slider" class="slider bg-black w-4 flex b-4 b-black rounded items-end">
        <div
          ref="thumb"
          v-motion="'thumb'"
          class="slider__thumb cursor-grab brutal left--3.4 relative min-w-8 bg-amber-500 rounded w-8 h-8"
        />
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
  width: 100%;
}
</style>
