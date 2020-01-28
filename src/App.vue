<template>
  <div id="app" :class="currentClass">
    <header>
      <div class="container">
        <app-menu 
          className="desk" 
        />
      </div>
    </header>
    <button 
      id="burger" 
      class="mainMenu__burger" 
      :class="burgerClass"
      @click="toggleMenu"
    >
      <i class="fas fa-bars"></i>
      <span>{{ $route.name }}</span>
    </button>
    <app-menu 
      className="mobile"
    />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Menu from './components/Menu'
import state from './appState'

export default {
  name: 'app',

  data() {
    return {
      state
    }
  },

  components: {
    appMenu: Menu
  },

  computed: {
    currentClass() {
      return [
        'page__' + this.$route.name.toLowerCase(),
        { backLayer: this.state.menuOpened }
      ]
    },

    burgerClass() {
      return { 'selected': this.state.menuOpened }
    }
  },

  watch: {
    $route() {
      this.toggleMenu('close')
    }
  },

  methods: {
    // Toggle mobile menu
    toggleMenu(action) {
      if(action === 'close') {
        // Change state
        this.state.menuOpened = false
      } else {
        // Change state
        this.state.menuOpened = !this.state.menuOpened
      }
    }
  }
}
</script>
