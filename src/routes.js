import VueRouter from 'vue-router'

// Import routes
import Home from './routes/Home.vue'
import Portfolio from './routes/Portfolio.vue'
import About from './routes/About.vue'
import Contacts from './routes/Contacts.vue'

// Settings
const routes = [{
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Portfolio',
    path: '/portfolio',
    component: Portfolio
  },
  {
    name: 'About',
    path: '/about',
    component: About
  },
  {
    name: 'Contacts',
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