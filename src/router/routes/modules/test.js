export default [
  {
    // 第一个路由配置
    name: 'Page1', // 路由名称，用于 <router-link :to="{ name: 'Page1' }"> 或 router.push({ name: 'Page1' })
    path: '/page1', // 路由路径，当URL匹配此路径时，将渲染对应的组件
    component: () => import('@/views/test-page/page1/index.vue'), // 路由对应的组件，这里使用懒加载的方式导入
    meta: {
      title: '动态路由1', // 路由的标题，可以用于面包屑、标签页标题等
      role: ['admin'], // 此路由所需的用户角色
    },
  },
  {
    // 第二个路由配置
    name: 'Page2',
    path: '/page2',
    component: () => import('@/views/test-page/page2/index.vue'),
    meta: {
      title: '动态路由2',
      role: ['editor'], // 注意，此路由仅对角色为editor的用户可见
    },
  },
  {
    // 第三个路由配置
    name: 'Page3',
    path: '/page3',
    component: () => import('@/views/test-page/page3/index.vue'),
    meta: {
      title: '动态路由3',
      role: ['admin'], // 同样，此路由仅对角色为admin的用户可见
    },
  },
]
