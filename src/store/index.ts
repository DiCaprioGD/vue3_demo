import {createPinia} from 'pinia';

const Pinia = createPinia();

export {useUserStore} from './modules/user';

export default Pinia;