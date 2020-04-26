import VueRouter from 'vue-router'

// Import routes
import Home from './routes/Home.vue'
import Portfolio from './routes/Portfolio.vue'
import About from './routes/About.vue'
import Contacts from './routes/Contacts.vue'

// Settings
const routes = [{
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

// Init
const router = new VueRouter({
  routes,
  mode: 'history'
})

export { VueRouter, router }