import {createRouter, createWebHistory} from 'vue-router'

const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
        {
            path: '/',
            name: '',
            component: () => import('../components/Header')
        },
        {
            // 页面逻辑
            path: '/header',
            name: 'header',
            component: () => import('../components/Header'),
            children: [
                {
                    // 页面逻辑
                    path: '/index',
                    name: 'index',
                    component: () => import('../components/index'),
                }]
        }
    ]
})

export default router
