import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
import Welcome from '../views/home/Welcome'
import ProjectList from '../views/home/projectList/ProjectList'
import DomainList from '../views/home/domainList/DomainList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/projectList', component: ProjectList },
      { path: '/DomainList', component: DomainList }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
