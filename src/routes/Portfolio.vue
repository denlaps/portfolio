<template>
  <div class="container">
    <section class="skills">
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
    <section class="works attachedBlock">
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
export default {
  mounted() {
    setTimeout(() => {
      const $block = document.querySelector('.attachedBlock')
      $block.classList.add('show')
    }, 300);
  },

  // beforeRouteLeave(to, from, next) {
  //   const $block = document.querySelector('.attachedBlock')
  //   $block.classList.remove('show')
  //   setTimeout(next, 370)
  // }
}
</script>

<style lang="scss">
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
      min-width: 300px;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: contain;
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
</style>