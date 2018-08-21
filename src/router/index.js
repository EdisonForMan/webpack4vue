import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [];

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})