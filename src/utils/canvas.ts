export class ContextHelper {
  public ctx: CanvasRenderingContext2D | undefined = undefined

  constructor(ctx: any) {
    this.ctx = ctx
  }

  roundRect(x: number, y: number, width: number, height: number, radius: number) {
    this.ctx?.beginPath()
    this.ctx?.moveTo(x + radius, y)
    this.ctx?.lineTo(x + width - radius, y)
    this.ctx?.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.ctx?.lineTo(x + width, y + height - radius)
    this.ctx?.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.ctx?.lineTo(x + radius, y + height)
    this.ctx?.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.ctx?.lineTo(x, y + radius)
    this.ctx?.quadraticCurveTo(x, y, x + radius, y)
    this.ctx?.closePath()
  }
}

export const createImage = (image: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    if (!Image)
      return
    const img = new Image()
    img.src = image
    if (img.complete)
      resolve(img)
    else
      img.addEventListener('load', () => resolve(img))
  })
}
