export const basicRoutes = [
  {
    // 定义登录页的路由
    name: 'LOGIN', // 路由的名称
    path: '/login', // 路由的路径
    component: () => import('@/views/login/index.vue'), // 路由对应的组件，这里使用懒加载的方式导入
    isHidden: true, // 自定义属性，用于标记该路由在导航菜单中是否隐藏
    meta: {
      title: '登录页', // 页面的标题，可以用于 <title> 标签或面包屑等
    },
  },
  {
    // 定义Dashboard页面的路由
    name: 'Dashboard', // 路由的名称
    path: '/', // 路由的路径，这里是应用的根路径
    component: () => import('@/views/dashboard/index.vue'), // 路由对应的组件
    meta: {
      title: 'Dashboard', // 页面的标题
    },
  },
  {
    // 定义一个用于测试unocss的页面的路由
    name: 'TestUnocss', // 路由的名称
    path: '/test/unocss', // 路由的路径
    component: () => import('@/views/test-page/unocss/index.vue'), // 路由对应的组件
    meta: {
      title: '测试unocss', // 页面的标题
    },
  },
]

// 组件懒加载：使用 () => import('@/views/...') 的形式导入组件，这种方式被称为组件的懒加载。它意味着该组件只有在需要时（即路由被访问时）才会被加载，这有助于提高应用的加载速度和性能。

// meta 属性：meta 属性用于存储路由的元信息，如页面标题（title）。这些信息可以在路由守卫或组件中被访问和使用，例如动态设置文档标题。

// isHidden 属性：isHidden 是一个自定义属性，它不是 Vue Router 的标准路由属性。你可以在构建导航菜单组件时使用这个属性来决定某个路由是否在菜单中显示。在这个例子中，登录路由被标记为隐藏，可能是因为它只在用户未登录时通过其他UI元素访问。
