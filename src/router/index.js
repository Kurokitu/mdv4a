import { createRouter, createWebHistory } from 'vue-router'
import auth from '../common/auth';

//路由数组
const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/index",
        name: "Index",
        component: () => import("../views/Index.vue")
    },
]

//路由对象
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/index') {
        if (auth.isLoggedIn()) {
            next()
        } else {
            next('/')
        }
    }

    if (auth.isLoggedIn()) {
        next('/index')
    }

    next()
})

//导出路由对象，在main.js中引用
export default router