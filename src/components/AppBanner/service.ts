import { useClamp } from '@vueuse/math'
import { ContextHelper, createImage } from '~/utils'
import logo from '~/assets/logo.png'

export class Sphere {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  constructor(x: number, y: number, radius: number, vx: number, vy: number) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vx = vx
    this.vy = vy
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

export const drawPhone = (ctx: CanvasRenderingContext2D, dt: any) => {
  const ctxHelper = new ContextHelper(ctx)
  const { xCenter, yCenter, font } = dt
  const phoneConfig = {
    x: (xCenter) - font,
    y: yCenter - font * 2.4 - font / 3,
    width: font * 4,
    height: ((font * 4) / 9) * 19.5,
    radius: 40,
  }
  const notchConfig = {
    x: (xCenter),
    y: yCenter - font * 2.75,
    width: font * 2,
    height: font / 3.5,
    radius: 15,
  }
  ctxHelper.roundRect(phoneConfig.x, phoneConfig.y, phoneConfig.width, phoneConfig.height, phoneConfig.radius)

  ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
  ctx.lineWidth = 10
  ctx.stroke()

  ctxHelper.roundRect(notchConfig.x, notchConfig.y, notchConfig.width, notchConfig.height, notchConfig.radius)
  ctx.fill()
}

export const getSpheres = (canvas: HTMLCanvasElement) => {
  const spheres: Sphere[] = []
  for (let i = 0; i < 40; i++) {
    const x = (Math.random() * canvas.width) + 50
    const y = (Math.random() * canvas.height) + 50
    const radius = Math.random() * 20 + 10
    const vx = (Math.random() * 2 - 1) * 2
    const vy = (Math.random() * 2 + 1) * 2
    spheres.push(new Sphere(x, y, radius, vx, vy))
  }
  return spheres
}

export const createGameLoop = async (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, spheres: Sphere[]) => {
  const img = await createImage(logo)
  ctx.fillStyle = 'rgba(255, 255, 255, 1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalAlpha = 0.05
  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.globalCompositeOperation = 'lighter'

    // ctx.fillStyle = 'rgba(255, 150, 200, 0.1)'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.globalCompositeOperation = 'source-over'

    spheres.forEach((sphere) => {
      ctx.drawImage(img,
        sphere.x - sphere.radius,
        sphere.y - sphere.radius,
        sphere.radius * 2, sphere.radius * 2,
      )

      sphere.x += sphere.vx
      sphere.y += sphere.vy
      if (sphere.x + sphere.radius > canvas.width || sphere.x - sphere.radius < 0)
        sphere.vx *= -1

      if (sphere.y + sphere.radius > canvas.height || sphere.y - sphere.radius < 0)
        sphere.vy *= -1
    })
    requestAnimationFrame(loop)
  }
  return loop
}

export const retrieveData = (canvas: HTMLCanvasElement, width: number, distance: number) => {
  const font = useClamp(width / 10, 64, 96).value
  const pseudoHeight = canvas.height - distance
  const yOffset = canvas.height - pseudoHeight
  return {
    font,
    pseudoHeight,
    yOffset,
    xCenter: (canvas.width / 2) - font,
    yCenter: yOffset + (pseudoHeight / 2) + font / 3,
  }
}

export const drawLogo = async (ctx: CanvasRenderingContext2D, data: any) => {
  ctx.drawImage(await createImage(logo),
    data.xCenter + data.font / 2,
    data.yCenter - (data.font * 0.65),
    data.font * 0.9, data.font * 0.9,
  )
  ctx.fillStyle = '#000'
  ctx.fillText('I', data.xCenter, data.yCenter - data.font)
  ctx.fillText('L    G', data.xCenter, data.yCenter)
  ctx.fillText('EAT!', data.xCenter, data.yCenter + data.font)
}
