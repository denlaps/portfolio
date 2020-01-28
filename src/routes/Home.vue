<template>
  <div class="container">
    <video 
      v-if="showVideo" 
      :class="{ 'show': videoEffect }" 
      id="videoBg" 
      preload="auto" 
      autoplay loop muted
    >
      <source src="../assets/city.mp4" type="video/mp4">
    </video>
    <div class="overlay">
      <figure class="delayedRect">
        <div 
          class="delayedRect__bracket top" 
          :style="bracketPos"
        />
        <figcaption class="delayedRect__info" :style="bracketPos">
          <h1>
            <console-line />
            My name is Denis.<br>
            I'm — frontend-<br>
            developer
          </h1>
          <span>working on IT-projects more than 2 years</span>
        </figcaption>
        <div class="delayedRect__photo">
          <img src="../assets/photos/photo2.jpg" alt="">
          <div class="nextButton">
            <router-link 
              tag="button"
              to="/portfolio"
            >
              Watch works
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
import consoleLine from '../components/Console'

export default {
  data() {
    return {
      showVideo: false,
      videoEffect: false,

      rectStep: 2,     
      rectRange: {
        x: 40,
        y: 10
      },

      brackets: {
        x: 0,
        y: 0
      },

      prevCursorPos: {
        x: 0,
        y: 0
      }
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

  watch: {
    showVideo(status) {
      setTimeout(() => {
        this.videoEffect = status
      }, 0);
    }
  },

  mounted() {
    this.recalcWidth()

    window.addEventListener('resize', this.recalcWidth)
    document.addEventListener('mousemove', this.moveRect)
  },

  methods: {
    recalcWidth() {
      this.showVideo = window.innerWidth > 768
    },

    /* Gen random num in range */
    getRandFrom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },

    /* Does new rect position in range? */
    inRange(movedPos, param) {
      return movedPos[param] >= this.rectRange[param] * (-1) && 
      movedPos[param] <= this.rectRange[param]
    },

    getMax(param) {
      return this.brackets[param] < 0 ? this.rectRange[param] * (-1) : this.rectRange[param]
    },
  
    moveRect(ev) {
      const movedPos = {
        x: this.prevCursorPos.x > ev.clientX ? this.brackets.x - this.rectStep : this.brackets.x + this.rectStep,
        y: this.prevCursorPos.y > ev.clientY ? this.brackets.y - this.rectStep : this.brackets.y + this.rectStep
      }

      const validX = this.inRange(movedPos, 'x')
      const validY = this.inRange(movedPos, 'y')

      // Change pos if it in range
      this.brackets.x = validX ? movedPos.x : this.getMax('x');
      this.brackets.y = validY ? movedPos.y : this.getMax('y');

      this.prevCursorPos = {
        x: ev.clientX,
        y: ev.clientY
      }
    }
  }
}
</script>

<style lang="scss">
  main {
    video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      object-fit: cover;
      object-position: center;
      opacity: 0;
      transition: opacity 1s;

      &.show {
        opacity: 1;
      }
    }

    .overlay {
      background: rgba(29, 33, 56, 0.9);
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
      width: 50%;
      margin-right: auto;
      z-index: 3;
      transition: transform 450ms;

      h1 {
        font-family: 'Montserrat';
        // font-size: 5.5vh;
        // line-height: 8vh;
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
      width: 94%;
      height: 5vh;
      border: 4px solid $lightBlue;
      transition: transform $trDelay;

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
        max-width: 270px;
        object-fit: cover;
        object-position: center;
      }

      .nextButton {
        margin-top: 20px;
        display: flex;
        align-items: center;

        button {
          background: #D8FFFF;
          height: 53px;
          flex: 1;
          font-family: 'Montserrat';
          font-weight: bold;
          font-size: 22px;
          line-height: 27px;
          color: #1D2138;
          margin-right: 10px;
          transition: background-color $trDelay;

          &:hover {
            background: $changedArrow;
          }
        }

        .arrow {
          width: 15%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform $trDelay;
        }

        &:hover {
          .arrow {
            transform: translateX(5px);

            path {
              fill: $changedArrow;
            }
          }
        }
      }
    }
  }
</style>