import VueRouter from 'vue-router';
import Index from '@/page/Index.vue';
import SignUp from '@/page/SignUp.vue';
import Profile from '@/page/user/profile.vue';
// 路由规则
const routes = [
  { 
    path: '/', 
    name: 'home',
    component: Index
  },
  { 
    path: '/signup', 
    name: 'signup',
    component: SignUp
  },
  {
    path: '/user/:username',
    name: 'profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes
})

export default router;