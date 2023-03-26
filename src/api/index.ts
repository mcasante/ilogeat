import mealsJson from './meals.json'

export interface Meal {
  id: number
  timestamp: number
  photo: string
  name: string
  notes?: string
  tags?: string[]
}

export function remoteLoadMeals(): Promise<Meal[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const meals: Meal[] = mealsJson
      resolve(meals)
    }, 1000)
  })
}
