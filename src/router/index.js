import VueRouter from 'vue-router'
// 首页
const Index = loadView('Index')
// 注册页
const SignUp = loadView('SignUp')

// 用户主页
const Profile = loadView('user/profile')
// 用户设置
const Setting = loadView('user/setting')

// 添加话题
const TopicAdd = loadView('topic/topic_add')

// 话题详情
const TopicDetail = loadView('topic/topic_detail')

// 搜索文章
const TopicSearch = loadView('topic/search')

// 后台布局
const Layout = loadView('admin/layout')
// 板块管理
const Section = loadView('admin/section')
// 用户管理
const User = loadView('admin/user')
// 话题管理
const Topic = loadView('admin/topic')
// 话题添加和修改
const SectionConfig = loadView('admin/section_addedit')
// 按需加载
function loadView(view) {
  return () => import(/* webpackChunkName: "chunks" */ `@/page/${view}.vue`)
}

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
    path: '/setting',
    name: 'setting',
    component: Setting
  },
  {
    path: '/topic/topic_add/:id',
    name: 'topicadd',
    component: TopicAdd
  },
  {
    path: '/topic/topic_detail/:id',
    name: 'topicdetail',
    component: TopicDetail
  },
  {
    path: '/topic/search',
    name: 'topicsearch',
    component: TopicSearch
  },
  {
    path: '/admin',
    name: 'layout',
    redirect: '/admin/section',
    component: Layout,
    children: [
      {
        path: 'section',
        name: 'sectionconfig',
        component: Section
      },
      {
        path: 'user',
        name: 'userconfig',
        component: User
      },
      {
        path: 'topic',
        name: 'topicconfig',
        component: Topic
      },
      {
        path: 'section/add',
        name: 'sectionadd',
        component: SectionConfig
      },
      {
        path: 'section/edit',
        name: 'sectionedit',
        component: SectionConfig
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router;