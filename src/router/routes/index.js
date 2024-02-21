export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },
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

// 定义一个特殊的路由规则，用于捕获未匹配的所有路径，并重定向到自定义的404页面
export const NOT_FOUND_ROUTE = {
  name: 'NotFound', // 路由名称
  path: '/:pathMatch(.*)*', // 使用正则表达式匹配所有路径
  redirect: '/404', // 重定向到/404路径
  isHidden: true, // 自定义属性，表示此路由在导航菜单中不显示
}

// 使用Vite的import.meta.globEager函数动态导入./modules目录下的所有.js文件
// 这个特性允许在构建时静态解析和导入模块，以实现模块的自动加载
const modules = import.meta.globEager('./modules/*.js')

// 初始化一个空数组，用于存储从模块中导出的路由规则
const asyncRoutes = []

// 遍历modules对象，获取所有导出的路由规则，并将它们添加到asyncRoutes数组中
Object.keys(modules).forEach((key) => {
  // 使用...运算符展开每个模块默认导出的路由数组，并将它们添加到asyncRoutes数组中
  asyncRoutes.push(...modules[key].default)
})

// 导出asyncRoutes数组，包含了应用中所有动态导入的路由规则
export { asyncRoutes }

// 组件懒加载：使用 () => import('@/views/...') 的形式导入组件，这种方式被称为组件的懒加载。它意味着该组件只有在需要时（即路由被访问时）才会被加载，这有助于提高应用的加载速度和性能。

// meta 属性：meta 属性用于存储路由的元信息，如页面标题（title）。这些信息可以在路由守卫或组件中被访问和使用，例如动态设置文档标题。

// isHidden 属性：isHidden 是一个自定义属性，它不是 Vue Router 的标准路由属性。你可以在构建导航菜单组件时使用这个属性来决定某个路由是否在菜单中显示。在这个例子中，登录路由被标记为隐藏，可能是因为它只在用户未登录时通过其他UI元素访问。
