import { createRouter, createWebHistory } from 'vue-router'

const history = createWebHistory()


const originalPush = createRouter.prototype.push

createRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

const router = createRouter({
    history, // 路由模式
    routes: [
        {
            path: '/',
            name: '',
            component: () => import('@/pages/index'),
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('@/pages/index'),

        },
        {
            path: '/doName',
            name: 'doName',
            component: () => import('@/pages/doName'),
        },
        {
            path: '/poster',
            name: 'poster',
            component: () => import('@/pages/poster'),
        },
        {
            path: '/gameIndex',
            name: 'gameIndex',
            component: () => import('@/pages/gameIndex'),
        },
        {
            path: '/battle',
            name: 'battle',
            component: () => import('@/pages/battle'),
        },
        {
            path: '/forPoetry',
            name: 'forPoetry',
            component: () => import('@/pages/forPoetry'),
        },
        {
            path: '/aiToPoetry',
            name: 'aiToPoetry',
            component: () => import('@/pages/aiToPoetry'),
        },
    ]
})

export default router
