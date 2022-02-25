import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification } from 'element-plus'
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
                },
                beforeEnter(to, from, next){
                    if(localStorage.getItem('token') === null && sessionStorage.getItem('token') === null){
                        next('/login')
                        ElNotification({title: '提示',message: '你尚未登录！' ,type: 'info'})
                    } else {
                        next()
                    }
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
        beforeEnter(to, from, next){
            if(localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null){
                next()
            } else {
                next('/login')
                ElNotification({title: '提示',message: '你尚未登录！' ,type: 'info'})
            }
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
                path: 'notice',
                component: () => import('@/views/versaillesTown/player/notice.vue'),
                meta:{
                    path: '/player/notice',
                    title: '通知'
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
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        meta:{
            path: '/login',
            title: '登录'
        }
    },
    {
        path: '/register',
        component: () => import('@/views/register.vue'),
        meta:{
            path: '/register',
            title: '注册'
        }
    },
    {
        path: '/applicationwhitelist',
        component: () => import('@/views/applicationWhiteList.vue'),
        meta:{
            path: '/applicationwhitelist',
            title: '自助申请白名单'
        }
    },
    {
        path: '/error',
        name: '不存在的页面',
        component: () => import('@/views/errorPage.vue'),
        meta:{
            title: '不存在的页面'
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/error'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title
    $('html,body').stop().animate({'scrollTop': 0})
    next()
})
export default router
