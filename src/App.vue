<template>
  <div id="app" :class="pageClass">
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
      <i class="mainMenu__burger_open">
        <s></s>
        <s></s>
        <s></s>
      </i>
      <span>{{ mobileMenuTitle }}</span>
    </button>

    <div class="backLayer" :class="layerShowClass">
      <app-menu 
        className="mobile"
      />
    </div>

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
    pageClass() {
      return [
        'page__' + this.$route.name.toLowerCase()
      ]
    },

    burgerClass() {
      return { 'selected': this.state.menuOpened }
    },

    layerShowClass() {
      return { 'show': this.state.menuOpened }
    },

    mobileMenuTitle() {
      return this.state.menuOpened ? 'Close' : this.$route.name
    }
  },

  watch: {
    $route() {
      this.toggleMenu('close')
    }
  },

  mounted() {
    setTimeout(() => window.scrollTo(0, 0), 0)
    this.recalcWindow()
    window.addEventListener('resize', this.recalcWindow)
  },

  methods: {
    recalcWindow() {
      this.state.showVideo = window.innerWidth > 768
      setTimeout(() => {
        this.state.videoEffect = window.innerWidth > 768
      }, 0);
    },

    // Toggle mobile menu
    toggleMenu(action) {
      const $body = document.body
      this.state.menuOpened = action === 'close' ? false : !this.state.menuOpened
      $body.style.overflowY = this.state.menuOpened === true ? 'hidden' : 'auto'
    }
  }
}
</script>