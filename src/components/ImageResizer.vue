<script lang="ts" setup>
import { useGesture } from '@vueuse/gesture'
import { useMotion } from '@vueuse/motion'
import { useClamp } from '@vueuse/math'

const props = defineProps<{
  imageSrc: string | ArrayBuffer | null
}>()
const emit = defineEmits<{
  (e: 'update:imageSrc', imageSrc: string | ArrayBuffer | null): void
}>()

const activeColor = ref('#f9a8d4')

const canvas = ref()
const image = ref()
const container = ref()
const slider = ref()
const thumb = ref()
const { width } = useElementSize(container)
const { width: sliderWidth } = useElementSize(slider)

const spring = useMotion(thumb as any)

const transition = {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  mass: 0.4,
}

// const min = computed(() => sliderWidth.value && thumb.value
//   ? thumb.value.offsetWidth - sliderWidth.value
//   : 0)

const max = computed(() => sliderWidth.value && thumb.value
  ? sliderWidth.value - thumb.value.offsetWidth
  : 0)

const moved = useClamp(0, 0, max)

let lastPos = 0
const dragHandler = (e: any) => {
  if (!document)
    return

  const { movement: [x], dragging } = e
  if (!dragging) {
    // spring.apply({ cursor: 'grab' })
    document.body.classList.add('overflow-hidden')
    return
  }

  document.body.classList.remove('overflow-hidden')

  moved.value = lastPos + x
  spring.apply({ x: moved.value, cursor: 'grabbing', transition })
}

// Composable usage
useGesture({
  onDragStart: () => lastPos = moved.value,
  onDrag: dragHandler,
  onDragEnd: () => spring.apply({ x: moved.value, cursor: 'default', transition }),
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

  ctx.fillStyle = activeColor.value
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
  const sliderPercentage = value / sliderWidth.value
  const scaleRange = maxScale - minScale
  const newScale = minScale + sliderPercentage * scaleRange
  model.scale = newScale
  drawImage(model.scale)
}

watch(moved, (value: number) => updateScale(value))

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

watch(activeColor, () => {
  if (ctx)
    drawImage(model.scale)
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

const colors = [
  '#f9a8d4',
  'rgba(190,242,100,1)',
  'rgba(252,211,77,1)',
  '#FFF',
  '#000',
]
const updateColor = (color: string) => {
  activeColor.value = color
}
</script>

<template>
  <div ref="container" class="pinch-zoom-canvas bg-amber-300">
    <div class="flex flex-col gap-3 mr-4 h-full justify-between">
      <m-button
        v-for="color in colors"
        :key="color"
        class="w-8 h-8 rounded brutal transition!"
        :class="{ 'brutal-translate! shadow-none!': activeColor === color }"
        :style="{ backgroundColor: color }"
        @click="() => updateColor(color)"
      />
    </div>
    <div class="max-w-90 flex flex-col items-stretch gap-4">
      <div class="relative rounded-lg p-2 mt-4 bg-white brutal">
        <MButton class="bg-red-500! absolute! w-10 h-10 text-white rounded-full font-bold z-99 right--5 top--5 p-1!" @click="emit('update:imageSrc', null)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </MButton>
        <canvas ref="canvas" class="b-1 b-black rounded-lg w-full" />
      </div>
      <div ref="slider" class="slider bg-black w-full h-4 flex b-4 b-black rounded items-end">
        <div
          ref="thumb"
          v-motion="'thumb'"
          class="slider__thumb cursor-grab brutal top-2.5 relative bg-amber-500 rounded w-8 h-8"
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
