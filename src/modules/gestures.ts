import { GesturePlugin } from '@vueuse/gesture'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(GesturePlugin)
}
