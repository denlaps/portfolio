import VueRouter from 'vue-router'

// Import routes
import Home from './routes/Home.vue'
import Portfolio from './routes/Portfolio.vue'
import About from './routes/About.vue'
import Contacts from './routes/Contacts.vue'

// Settings
const routes = [{
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    component: Portfolio
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'contacts',
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