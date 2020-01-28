<template>
  <div id="app" :class="currentClass">
    <header>
      <div class="container">
        <app-menu 
          className="desk" 
        />
      </div>
    </header>
    <button id="burger" class="mainMenu__burger" @click="toggleMenu">
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

export default {
  name: 'app',

  components: {
    appMenu: Menu
  },

  computed: {
    currentClass() {
      return 'page__' + this.$route.name.toLowerCase()
    }
  },

  watch: {
    $route() {
      this.toggleMenu('close')
    }
  },

  mounted() {
    window.addEventListener('resize', this.recalcWidth)
  },

  methods: {
    recalcWidth() {
      if(window.innerWidth <= 768) {
        this.toggleVideo('remove')
      } else {
        this.toggleVideo('add')
      }
    },

    // toggleVideo() {
    //   const $video = document.querySelector('video source')

    //   $video.removeAttribute('src', '')
    // },

    toggleMenu(action) {
      const $burger = document.getElementById('burger')
      const $menu = document.querySelector('.mainMenu__mobile')
      const $attached = document.querySelector('.attachedBlock')

      if(action === 'close') {
        $burger.classList.remove('selected')
        $menu.classList.remove('mainMenu__mobile_showed')
        if($attached) $attached.classList.remove('low-layer')
      } else {
        $burger.classList.toggle('selected')
        $menu.classList.toggle('mainMenu__mobile_showed')
        if($attached) $attached.classList.toggle('low-layer')
      }
    }
  }
}
</script>
