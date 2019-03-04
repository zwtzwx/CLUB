import VueRouter from 'vue-router';
import Index from '../../page/Index.vue';

// 路由规则
const routes = [
  { path: '/', component: Index}
]

const router = new VueRouter({
  routes
})

export default router;