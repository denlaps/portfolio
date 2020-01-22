<template>
  <div>
    <video preload="auto" autoplay loop muted>
      <source src="../assets/city.mp4" type="video/mp4">
    </video>
    <div class="overlay">
      <figure class="delayedRect">
        <div 
          class="delayedRect__bracket top" 
          :style="bracketPos"
        />
        <figcaption class="delayedRect__info">
          <h1>
            Hello!<br>
            My name is Denis.<br>
            I'm — frontend-<br>
            developer
          </h1>
          <span>working on IT-projects more than 2 years</span>
        </figcaption>
        <div class="delayedRect__photo">
          <img src="../assets/photos/photo1.jpg" alt="">
          <div class="nextButton">
            <button>Watch works</button>
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
export default {
  data() {
    return {
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
    document.addEventListener('mousemove', this.moveRect)
  },

  methods: {
    moveRect(ev) {
      // const maxRange = 30
      const moveDiff = {
        x: this.prevCursorPos.x - ev.clientX,
        y: this.prevCursorPos.y - ev.clientY
      }

      // reCalc pos
      this.brackets.x += moveDiff.x
      this.brackets.y += moveDiff.y

      this.prevCursorPos = {
        x: ev.clientX,
        y: ev.clientY
      }
    }
  }
}
</script>

<style lang="scss">
  $lightBlue: #D8FFFF;
  $changedArrow: lighten($lightBlue, 10%);
  $trDelay: 300ms;

  .delayedRect {
    color: $lightBlue;
    position: relative;
    flex-basis: 100%;
    max-width: 750px;
    margin: 0 17%;
    padding: 65px 0;
    display: flex;
    align-items: center;

    &__info {
      position: relative;
      left: -70px;
      z-index: 3;

      h1 {
        font-family: 'Montserrat';
        font-size: 48px;
        line-height: 55px;
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
      display: inline-block;
      position: absolute;
      left: 0;
      width: 100%;
      height: 40px;
      border: 4px solid $lightBlue;
      transition: translate $trDelay;

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
      display: flex;
      flex-direction: column;
      position: absolute;
      right: -15%;
      top: -7.5%;
      height: 100%;

      img {
        background: #000;
        display: inline-block;
        width: auto;
        height: 115%;
        object-fit: cover;
      }
    }
  }
</style>