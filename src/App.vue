<template>
  <div id="app" :class="pageClass">
    <header>
      <div class="container">
        <app-menu 
          className="desk" 
        />

        <h2 
          v-if="state.subtitle.active"
          class="subTitle"
        >
          <span>{{ currSubtitle }}</span>
          <button @click="toggleAttached">{{ nextSubTitle }}</button>  
        </h2>
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
      <router-view/>
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
      state,
      subtitle: state.subtitle
    }
  },

  components: {
    appMenu: Menu
  },

  computed: {
    pageClass() {
      const path = this.$route.path
      const classId = path === '/' ? 'home' : path.replace('/', '')

      return [
        'page__' + classId
      ]
    },

    burgerClass() {
      return { 'selected': this.state.menuOpened }
    },

    layerShowClass() {
      return { 'show': this.state.menuOpened }
    },

    mobileMenuTitle() {
      return this.state.menuOpened ? 'Закрыть' : this.$route.name
    },

    currSubtitle() {
      return this.subtitle.pages[this.subtitle.current]
    },

    nextSubTitle() {
      return this.subtitle.pages[this.nextSubIndex]  
    },

    nextSubIndex() {
      const lastPage = this.subtitle.current === this.subtitle.pages.length - 1
      return lastPage ? 0 : this.subtitle.current + 1
    }
  },

  watch: {
    $route(to) {
      this.toggleMenu('close')
      this.subtitle.active = to.path === '/portfolio'
    }
  },

  mounted() {
    setTimeout(() => window.scrollTo(0, 0), 0)
    this.recalcWindow()
    window.addEventListener('resize', this.recalcWindow)
  },

  methods: {
    toggleAttached() {
      if(this.subtitle.blocked) return;

      this.subtitle.current = this.nextSubIndex;
      this.subtitle.blocked = true;
      
      setTimeout(() => {
        this.subtitle.blocked = false;
      }, 1000);
    },

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