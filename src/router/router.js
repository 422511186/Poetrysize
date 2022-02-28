import {createRouter, createWebHistory} from 'vue-router'

const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
        {
            path: '/unFoundPage',
            name: 'unFoundPage',
            component: () => import('../components/pages/404Page')
        },
        {
            path: '/',
            name: '',
            component: () => import('../components/pages/index')
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('../components/pages/index')
        },
        {
            path: '/poetPage',
            name: 'poetPage',
            component: () => import('../components/pages/poetPage'),
            children: [
                {
                    // 页面逻辑
                    path: '/poetCard',
                    name: 'poetCard',
                    component: () => import('../components/poetCard'),
                }]
        },
        {
            path: '/poetryPage',
            name: 'poetryPage',
            component: () => import('../components/pages/poetryPage'),
        },

        {
            // 页面逻辑
            path: '/swiper',
            name: 'swiper',
            component: () => import('../components/swiper'),
            // children: [
            //     {
            //         // 页面逻辑
            //         path: '',
            //         name: '',
            //         component: () => import(''),
            //     }]
        },
        {
            path: "/pageHeader",
            name: 'pageHeader',
            component: () => import('../components/pageHeader'),
        },
        {
            path: "/footerBox",
            name: 'footerBox',
            component: () => import('../components/footerBox'),
        },
        {
            path: "/poetryCard",
            name: 'poetryCard',
            component: () => import('../components/poetry'),
        },
        {
            path: "/navigationBar",
            name: 'navigationBar',
            component: () => import('../components/navigationBar'),
        },
        {
            path: "/lanternCard",
            name: 'lanternCard',
            component: () => import('../components/Lantern'),
        },
        // {
        //     path: "/poetCard",
        //     name: 'poetCard',
        //     component: () => import('../components/poetCard'),
        // },
    ]
})

export default router
