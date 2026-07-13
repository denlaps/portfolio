import { createRouter, createWebHistory } from 'vue-router'
import Home from './routes/Home.vue'
import Portfolio from './routes/Portfolio.vue'
import About from './routes/About.vue'
import Contacts from './routes/Contacts.vue'

const routes = [
  {
    name: 'Главная',
    path: '/',
    component: Home
  },
  {
    name: 'Портфолио',
    path: '/portfolio',
    component: Portfolio
  },
  {
    name: 'Обо мне',
    path: '/about',
    component: About
  },
  {
    name: 'Контакты',
    path: '/contacts',
    component: Contacts
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
