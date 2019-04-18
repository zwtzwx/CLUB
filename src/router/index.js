import VueRouter from 'vue-router';
// 首页
import Index from '@/page/Index.vue';
// 注册页
import SignUp from '@/page/SignUp.vue';
// 个人中心
import Profile from '@/page/user/profile.vue';
// 添加话题
import TopicAdd from '@/page/topic/topic_add.vue';

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
  },
  {
    path: '/topic/add/:id',
    name: 'topicadd',
    component: TopicAdd
  }
]

const router = new VueRouter({
  routes
})

export default router;