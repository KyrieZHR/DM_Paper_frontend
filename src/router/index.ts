import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: () => import('@/views/Home.vue'), meta: { title: '首页' } },
      { path: 'about', name: 'About', component: () => import('@/views/About.vue'), meta: { title: '关于我们' } },
      { path: 'team', name: 'Team', component: () => import('@/views/Team.vue'), meta: { title: '管理团队' } },
      { path: 'products', name: 'Products', component: () => import('@/views/Products.vue'), meta: { title: '产品中心' } },
      { path: 'production', name: 'Production', component: () => import('@/views/Production.vue'), meta: { title: '生产实力' } },
      { path: 'green', name: 'Green', component: () => import('@/views/Green.vue'), meta: { title: '绿色环保' } },
      { path: 'technology', name: 'Technology', component: () => import('@/views/Technology.vue'), meta: { title: '技术创新' } },
      { path: 'quality', name: 'Quality', component: () => import('@/views/Quality.vue'), meta: { title: '品质保障' } },
      { path: 'news', name: 'News', component: () => import('@/views/News.vue'), meta: { title: '新闻资讯' } },
      { path: 'join', name: 'Join', component: () => import('@/views/Join.vue'), meta: { title: '加入我们' } },
      { path: 'contact', name: 'Contact', component: () => import('@/views/Contact.vue'), meta: { title: '联系我们' } },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to) => {
  document.title = `${to.meta.title} - 东淼纸业`
})

export default router
