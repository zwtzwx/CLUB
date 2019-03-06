import VueRouter from 'vue-router';
import Index from '../../page/Index.vue';
import SignUp from '../../page/SignUp.vue';

// 路由规则
const routes = [
  { path: '/', component: Index},
  { path: '/signup', component: SignUp}
]

const router = new VueRouter({
  routes
})

export default router;