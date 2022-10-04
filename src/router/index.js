import { createRouter, createWebHistory } from 'vue-router'
import PostView from '../views/post/PostView'
import LoginView from '../views/auth/LoginView'
import RegisterView from '../views/auth/RegisterView'

const routes = [
  {
    path: '/',
    name: 'PostView',
    component: PostView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
