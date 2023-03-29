import { createRouter, createWebHashHistory } from 'vue-router'
import auth from '../common/auth';

//路由数组
const routes = [
    {
        path: "/user/login",
        name: "Login",
        meta: {
            requireLogin: false
        },
        component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
    {
        path: "/",
        name: "Index",
        meta: {
            requireLogin: true
        },
        component: () => import(/* webpackChunkName: "index" */ "../views/Index.vue")
    },
]

//路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireLogin && !auth.isLoggedIn()) {
        next('/user/login')
    }

    if (to.path === '/user/login' && auth.isLoggedIn()) {
        next('/')
    }

    next()
})

//导出路由对象，在main.js中引用
export default router