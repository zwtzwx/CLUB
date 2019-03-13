import VueRouter from 'vue-router';
import Index from '../../page/Index.vue';
import SignUp from '../../page/SignUp.vue';

// 路由规则
const routes = [
  { 
    path: '/', 
    name: 'home',
    component: Index},
  { 
    path: '/signup', 
    name: 'signup',
    component: SignUp}
]

const router = new VueRouter({
  routes
})

export default router;