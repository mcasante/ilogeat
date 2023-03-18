<script setup lang="ts">
import { useClamp } from '@vueuse/math'
import logo from '~/assets/logo.png'

defineOptions({
  name: 'IndexPage',
})
// const user = useUserStore()
// const name = $ref(user.savedName)

// const router = useRouter()

// const { t } = useI18n()

// vueuse update width and height
const { width, height } = useWindowSize()
const canvasElement = ref<HTMLCanvasElement>()
const header = ref<HTMLElement>()
// get header height with useElementSize

// vueuse watch width and height

const setCanvasSize = () => {
  if (!canvasElement.value)
    return
  canvasElement.value.width = width.value
  canvasElement.value.height = height.value * 0.6
}

// promise
const createImage = (image: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = image
    if (img.complete)
      resolve(img)
    else
      img.addEventListener('load', () => resolve(img))
  })
}

const draw = async () => {
  const ctx = canvasElement.value?.getContext('2d')
  const canvas = canvasElement.value
  if (!(ctx && canvas))
    return

  const fontSize = useClamp(width.value / 10, 64, 96)
  const fSize = fontSize.value
  ctx.font = `${fSize}px Itim`
  ctx.textBaseline = 'middle'
  ctx.imageSmoothingEnabled = false

  const wCenter = (canvas.width / 2) - fSize
  const hCenter = (canvas.height / 2) + fSize / 3

  // create image element
  const drawImage = (img: HTMLImageElement) => {
    ctx.drawImage(img,
      wCenter + fSize / 2,
      hCenter - (fSize * 0.65),
      fSize * 0.9, fSize * 0.9,
    )
  }

  drawImage(await createImage(logo))

  ctx.fillText('I', wCenter, hCenter - fSize)
  ctx.fillText('L    G', wCenter, hCenter)
  ctx.fillText('EAT!', wCenter, hCenter + fSize)

  // roundRect(x, y, width, height, radii)
  const roundRect = (x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
  }
  const phoneConfig = {
    x: (wCenter) - fSize,
    y: hCenter - fSize * 2.4 - fSize / 3,
    width: fSize * 4,
    height: ((fSize * 4) / 9) * 19.5,
    radius: 40,
  }
  const notchConfig = {
    x: (wCenter),
    y: hCenter - fSize * 2.75,
    width: fSize * 2,
    height: fSize / 3.5,
    radius: 15,
  }
  roundRect(phoneConfig.x, phoneConfig.y, phoneConfig.width, phoneConfig.height, phoneConfig.radius)

  ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
  ctx.lineWidth = 10
  ctx.stroke()

  roundRect(notchConfig.x, notchConfig.y, notchConfig.width, notchConfig.height, notchConfig.radius)
  ctx.fillStyle = 'rgba(0, 0, 0, 1)'
  ctx.fill()

  // fade bottom of the canvas to white
  const gradient = ctx.createLinearGradient(0, canvas.height / 3, 0, canvas.height)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

watch([width, height], () => {
  setCanvasSize()
  draw()
})

onMounted(() => {
  setCanvasSize()
  draw()
})
</script>

<template>
  <div>
    <header class="py-4 flex justify-between items-center">
      <img :src="logo" style="image-rendering: pixelated;" width="48" height="48">
      <a>
        <button class="px-3 py-1 text-white c-style bg-[var(--green)]">Get started</button>
      </a>
    </header>

    <section class="select-none py-15 text-center">
      <h1 class="text-20 lh-20">
        Love Your Food,<br> Love Your Body
      </h1>
      <h2 class="text-5.5 lh-[1.5] font-sans mt-10">
        iLogEat Helps You Build a Healthier Relationship<br> with Food and Reach Your Wellness Goals
      </h2>
      <a class="mt-10 block">
        <button class="text-6 px-3 py-1 text-white c-style bg-[var(--green)]">Get started</button>
      </a>
    </section>

    <div class="relative">
      <canvas ref="canvasElement" class="absolute top-0 left-0 z--1" />
      <div :style="{ height: `${(canvasElement?.height || 0)}px` }" />
    </div>

    <h1>Love Your Food, Love Your Body: The Food Diary App for Nurturing a Positive Relationship with Eating</h1>

    <h3>iLogEat Helps You Build a Healthier Relationship with Food and Reach Your Wellness Goals</h3>
    <p>
      Introducing a new food diary app that focuses on minimalism, usability, and a health-oriented approach towards food. Say goodbye to calorie counting and hello to building a healthier relationship with food. With a simple interface and personalized goal setting, this app helps you track your meals, mood, and progress towards healthier eating habits. Discover the benefits of tracking your food and improving your well-being with this user-friendly app.
    </p>

    <p>
      Capture photos of your meals: Take photos of your meals and store them in the app to easily track your food intake.

      Time-stamp your meals: Record the time you eat your meals to gain insight into your eating patterns and help you identify emotional triggers.

      Classify your hunger and satiety levels: Rate your hunger and satiety levels before and after meals to help you recognize when you're eating out of boredom or emotional stress, rather than actual hunger.

      Make observations: Add notes and observations about your meals to help you understand how different foods affect your body and mood.

      Personalized goal setting: Set personalized goals and track your progress towards healthier eating habits, whether it's increasing your intake of vegetables or cutting back on sugar.

      Mindful eating prompts: Receive gentle reminders to practice mindful eating and savor each bite, helping you to build a healthier relationship with food.

      Insights and analytics: Get insights into your eating habits with easy-to-read analytics and graphs, giving you a clear picture of your progress and areas for improvement.

      With these features, our food journal app empowers you to take control of your diet, build a healthier relationship with food, and achieve your wellness goals. Whether you're looking to lose weight, manage a chronic condition, or simply improve your overall health and wellbeing, our app is the perfect tool to help you get there.
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
