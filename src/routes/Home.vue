<template>
  <div class="container">
    <video 
      v-if="state.showVideo" 
      :class="{ 'show': state.videoEffect }" 
      id="videoBg" 
      :src="backgroundVideo"
      preload="auto"
      autoplay loop muted playsinline
    />
    <img v-else class="noVideoLayer" :src="getSrc('/photos/no_video.jpg')">

    <div class="overlay">
      <figure class="delayedRect">
        <div 
          class="delayedRect__bracket top" 
          :style="bracketPos"
        />
        <figcaption class="delayedRect__info" :style="bracketPos">
          <h1>
            <console-line />
            Меня зовут Денис.<br>
            Я — frontend-<br>
            разработчик
          </h1>
          <span>работаю в IT-сфере более 7 лет</span>
        </figcaption>
        <div class="delayedRect__photo">
          <img :src="getSrc('/photos/photo2.jpg')" alt="">
          <div class="nextButton">
            <router-link
              to="/portfolio"
              custom
              v-slot="{ navigate }"
            >
              <button type="button" @click="navigate">Мои работы</button>
            </router-link>
            <i class="arrow">
              <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.7071 8.70711C40.0976 8.31659 40.0976 7.68342 39.7071 7.2929L33.3431 0.928935C32.9526 0.538411 32.3195 0.538411 31.9289 0.928935C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM-8.74228e-08 9L39 9L39 7L8.74228e-08 7L-8.74228e-08 9Z" fill="#D8FFFF"/>
              </svg>
            </i>
          </div>
        </div>
        <div 
          class="delayedRect__bracket bottom" 
          :style="bracketPos"
        />
      </figure>
    </div>
  </div>
</template>

<script>
import state from '../appState.js'
import consoleLine from '../components/Console.vue'
import { publicPath } from '../utils/publicPath.js'
import backgroundVideo from '../assets/background.mp4'

export default {
  data() {
    return {
      rectRange: {
        x: 40,
        y: 10
      },

      brackets: {
        x: 0,
        y: 0
      },

      state,
      backgroundVideo
    }
  },

  components: { consoleLine },

  computed: {
    bracketPos() {
      return {
        transform: `translate(
          ${this.brackets.x + 'px'},
          ${this.brackets.y + 'px'}
        )`
      }
    }
  },

  mounted() {
    this.initVideo()
    document.addEventListener('mousemove', this.moveRect)
  },

  beforeUnmount() {
    this.state.videoEffect = false
    document.removeEventListener('mousemove', this.moveRect)
  },

  methods: {
    getSrc(url) {
      return publicPath(url)
    },

    initVideo() {
      if(window.innerWidth > 768) {
        this.state.showVideo = true

        setTimeout(() => {
          this.state.videoEffect = true
        }, 0);
      }
    },

    /* Move brackets proportionally to cursor position from screen center */
    moveRect(ev) {
      const offsetX = (ev.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      const offsetY = (ev.clientY - window.innerHeight / 2) / (window.innerHeight / 2)

      this.brackets.x = this.clamp(offsetX * this.rectRange.x, -this.rectRange.x, this.rectRange.x)
      this.brackets.y = this.clamp(offsetY * this.rectRange.y, -this.rectRange.y, this.rectRange.y)
    },

    clamp(value, min, max) {
      return Math.min(max, Math.max(min, value))
    }
  }
}
</script>

<style lang="scss">
  main {
    video, .noVideoLayer {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      object-fit: cover;
      object-position: center;
    }

    video {
      opacity: 0;
      transition: opacity 1s;
      filter: brightness(1.05) contrast(1.08);

      &.show {
        opacity: 1;
      }
    }

    .overlay {
      background: linear-gradient(
        135deg,
        rgba(29, 33, 56, 0.55) 0%,
        rgba(29, 33, 56, 0.35) 50%,
        rgba(20, 24, 40, 0.45) 100%
      );
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      padding: 40px 0 ($headerHeight + 40px);
      z-index: 2;
      overflow-y: auto;
    }
  }

  .delayedRect {
    color: $lightBlue;
    position: relative;
    max-width: 720px;
    margin: auto 10%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8vh 0;

    &__info {
      width: 46%;
      margin-right: auto;
      z-index: 3;
      transition: transform 80ms ease-out;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);

      h1 {
        font-family: 'Montserrat';
        font-size: 35px;
        line-height: 46px;
      }

      span {
        display: block;
        margin-top: 5px;
        font-weight: 300;
        font-size: 17px;
        line-height: 21px;
        font-family: 'Roboto Light';
      }
    }

    &__bracket {
      position: absolute;
      width: 98%;
      height: 5vh;
      border: 4px solid $lightBlue;
      transition: transform 80ms ease-out;

      &.top {
        top: 0;
        border-bottom: none;
      }

      &.bottom {
        bottom: 0;
        border-top: none;
      }
    }

    &__photo {
      position: absolute;
      right: -5%;
      top: -7.5%;
      height: 115%;

      img {
        background: #000;
        display: inline-block;
        width: 100%;
        height: 100%;
        min-height: 100%;
        min-width: 100%;
        max-width: 360px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
</style>