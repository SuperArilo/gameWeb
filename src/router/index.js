import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/index.vue'),
        meta:{
            path: '/',
            title: '首页'
        }
    },
    {
        path: '/dynamic',
        name: 'dynamic',
        component: () => import('@/views/dynamic.vue'),
        meta:{
            path: '/dynamic',
            title: '动态'
        },
        children:[
            {
                path: '',
                component: () => import('@/views/dynamic/dynamicShow.vue')
            },
            {
                path: 'edit',
                component: () => import('@/views/dynamic/dynamicEdit.vue'),
                meta:{
                    path: '/dynamic/edit',
                    title: '新建动态'
                }
            },
            {
                path: 'details',
                component: () => import('@/views/dynamic/dynamicDetail.vue'),
                meta:{
                    path: '/dynamic/details',
                    title: '动态详情'
                }
            }
        ]
    },
    {
        path: '/message',
        name: 'message',
        component: () => import('@/views/message.vue'),
        meta:{
            path: '/message',
            title: '留言'
        }
    },
    {
        path: '/onlinetalk',
        component: () => import('@/views/versaillesTown/onlineTalk.vue'),
        meta:{
            path: '/versaillestown/onlinetalk',
            title: '在线聊天'
        }
    },
    {
        path: '/player',
        component: () => import('@/views/versaillesTown/player.vue'),
        meta:{
            path: '/player',
            title: '玩家信息'
        },
        children:[
            {
                path: '',
                component: () => import('@/views/versaillesTown/player/main.vue'),
                meta:{
                    path: '/player',
                    title: '玩家信息'
                }
            },
            {
                path: 'personalinformation',
                component: () => import('@/views/versaillesTown/player/personalInformation.vue'),
                meta:{
                    path: '/player/personalInformation',
                    title: '个人信息'
                }
            },
            {
                path: 'idbind',
                component: () => import('@/views/versaillesTown/player/IDBind.vue'),
                meta:{
                    path: '/player/idbind',
                    title: 'id绑定'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),routes
})
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title == undefined ? '博客' : to.meta.title
    document.body.scrollTop = 0
    next()
})
export default router
