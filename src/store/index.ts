import { createPinia } from 'pinia'

const Pinia = createPinia()

export { useUserStore } from './modules/user'
export { useLayoutStore } from './modules/layout'

export default Pinia
