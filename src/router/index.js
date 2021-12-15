import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/dynamic',
        name: 'dynamic',
        component: () => import('@/views/dynamic.vue'),
        children:[
            {
                path: '',
                component: () => import('@/views/dynamicShow.vue'),
            },
            {
                path: 'comment',
                component: () => import('@/views/dynamicComment.vue'),
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),routes
})
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    next()
})
export default router
