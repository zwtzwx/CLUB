import VueRouter from 'vue-router';
import Index from '@/page/Index.vue';
import SignUp from '@/page/SignUp.vue';
import Profile from '@/page/user/profile.vue';
import MyContent from '@/components/content.vue';
// 路由规则
const routes = [
  { 
    path: '/', 
    name: 'home',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home', 
        name: 'my-home',
        component: MyContent,
      },
      {
        path: '/recommend', 
        name: 'recommend',
        component: MyContent,
      },
      {
        path: '/question', 
        name: 'question',
        component: MyContent,
      },
      {
        path: '/resume', 
        name: 'resume',
        component: MyContent,
      }
    ]
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