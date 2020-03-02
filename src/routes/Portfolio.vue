<template>
  <div class="container">
    <section 
      class="skills"
      :class="showSkills"
      :style="{ overflowY: addScroll }"
    >
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
      <figure class="skills__item">
        <i class="fab fa-node"></i>
        <figcaption>
          <span>Node.js</span>
          <u class="skills__line"></u>
        </figcaption>
      </figure>
    </section>
    <section 
      class="works attachedBlock"
      :class="showWorks"
    >
      <h2 class="attachedBlock__head">Works</h2>
      <div class="wrapper">
        <figure class="works__item">
          <img src="../assets/photos/1.jpg" alt="">
          <figcaption>
            <h3>Online-shop</h3>
            <span>online-shop.ru</span>
            <i class="fas fa-search"></i>
          </figcaption>
        </figure>
        <figure class="works__item">
          <img src="../assets/photos/2.jpg" alt="">
          <figcaption>
            <h3>Online-shop</h3>
            <span>online-shop.ru</span>
            <i class="fas fa-search"></i>
          </figcaption>
        </figure>
        <figure class="works__item">
          <img src="../assets/photos/3.jpg" alt="">
          <figcaption>
            <h3>Online-shop</h3>
            <span>online-shop.ru</span>
            <i class="fas fa-search"></i>
          </figcaption>
        </figure>
        <figure class="works__item">
          <img src="../assets/photos/4.jpg" alt="">
          <figcaption>
            <h3>Online-shop</h3>
            <span>online-shop.ru</span>
            <i class="fas fa-search"></i>
          </figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import state from '../appState'

export default {
  data() {
    return {
      workActive: false,
      addScroll: 'unset',

      state
    }
  },

  computed: {
    showSkills() {
      return { 
        'show': !this.workActive && !state.firstLoad,
        'hide': this.workActive && !state.firstLoad,
        'low-layer': this.state.menuOpened 
      }
    },

    showWorks() {
      return { 
        'show': this.workActive,
        'hide': !this.workActive && !state.firstLoad,
        'low-layer': this.state.menuOpened
      }
    },
  },

  watch: {
    'state.subtitle.current': function(tabIndex) {
      this.workActive = tabIndex === 0
      this.state.firstLoad = false
    }
  },

  mounted() {
    // Enable subtitle for this page
    this.state.subtitle.active = true
    this.showAttach()

    this.state.firstLoad = true;
  },

  // // Hide attached block when leave route
  beforeRouteLeave(to, from, next) {
    // const $block = document.querySelector('.attachedBlock')
    // $block.classList.remove('show')
    // setTimeout(next, 370)

    this.state.firstLoad = true;

    next();
  },

  methods: {
    showAttach() {
      setTimeout(() => {
        this.workActive = true

        // wait for transition ending => then show scroll
        setTimeout(() => {
          this.addScroll = 'auto'
        }, 400)
      }, 300)
    }
  }
}
</script>

<style lang="scss">
  main {
    .skills {
      padding: 40px;

      &__item {
        display: flex;
        color: $lightBlue;
      }
    }

    .works {
      &__item {
        position: relative;
        display: flex;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform $trDelay;
        }

        figcaption {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, .77);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #fff;
          font-family: 'Montserrat';
          font-size: 22px;
          cursor: pointer;
          opacity: 0;
          transition: opacity $trDelay;
        }

        &:hover {
          img {
            transform: scale(1.1);
          }

          figcaption {
            opacity: 1;
          }
        }
      }
    }
  }
</style>