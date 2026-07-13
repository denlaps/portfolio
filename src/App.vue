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

    <a
      class="hosting-badge"
      href="https://pipecore.io"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="hosting-badge__logo">
        <img
          class="hosting-badge__icon"
          :src="pipecoreLogoSrc"
          alt="PipeCore"
        >
      </span>
      <span class="hosting-badge__text">Сайт хостится моим PaaS</span>
    </a>

    <div class="svg-sprite" aria-hidden="true" v-html="techsSprite" />
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import state from './appState.js'
import { publicPath } from './utils/publicPath.js'
import techsSprite from './assets/svg/techs.svg?raw'

export default {
  name: 'app',

  data() {
    return {
      state,
      subtitle: state.subtitle,
      pipecoreLogoSrc: publicPath('/pipecore-dark.svg'),
      techsSprite
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
      
      window.scrollTo(0, 0);
      
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

<style lang="scss">
  .hosting-badge {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 6;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 12px 6px 6px;
    border-radius: 12px;
    background: rgba(29, 33, 56, 0.84);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(216, 255, 255, 0.16);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.24);
    color: rgba(216, 255, 255, 0.92);
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    line-height: 1.25;
    letter-spacing: 0.01em;
    text-decoration: none;
    cursor: pointer;
    transition:
      transform $trDelay,
      border-color $trDelay,
      background $trDelay,
      box-shadow $trDelay;

    &:hover {
      transform: translateY(-2px);
      background: rgba(29, 33, 56, 0.94);
      border-color: rgba(216, 255, 255, 0.3);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
    }

    &__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      padding: 6px 8px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.32);
      border: 1px solid rgba(216, 255, 255, 0.1);
    }

    &__icon {
      display: block;
      height: 20px;
      width: auto;
    }

    &__text {
      padding-right: 2px;
      font-weight: 500;
    }
  }

  .svg-sprite {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  @media (max-width: 600px) {
    .hosting-badge {
      right: 14px;
      bottom: 14px;
      gap: 8px;
      padding: 5px 10px 5px 5px;
      font-size: 13px;
      border-radius: 10px;

      &__logo {
        padding: 5px 7px;
        border-radius: 7px;
      }

      &__icon {
        height: 16px;
      }
    }
  }
</style>