<template>
  <div class="container">
    <section class="about__info" v-html="about.info"></section>
    <section class="about__photo">
      <img :src="getSrc('/photos/photo1.jpg')" alt="">
      <div class="nextButton">
        <router-link 
          tag="button"
          to="/contacts"
        >
          Напишите мне
        </router-link>
        <i class="arrow">
          <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.7071 8.70711C40.0976 8.31659 40.0976 7.68342 39.7071 7.2929L33.3431 0.928935C32.9526 0.538411 32.3195 0.538411 31.9289 0.928935C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM-8.74228e-08 9L39 9L39 7L8.74228e-08 7L-8.74228e-08 9Z" fill="currentColor"/>
          </svg>
        </i>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      about: ''
    }
  },

  mounted() {
    this.getData('about');
  },

  methods: {
    getSrc(url) {
      return process.env.BASE_URL + url
    },

    getData(type) {
      fetch(process.env.BASE_URL + `/data/${type}.data.json`)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          this[type] = data;
        })
    }
  }
}
</script>

<style lang="scss">
  .page__about {
    main {
      align-items: center;
      justify-content: center;

      .container {
        width: 100%;
        max-width: 1000px;
        flex-wrap: wrap;
        padding: 40px;

        section {
          width: auto;

          &.about__info {
            flex: 1;
            font-family: 'Roboto Light';
            font-weight: normal;
            font-size: 20px;
            line-height: 23px;
            color: #D8FFFF;
            margin-right: 80px;
            margin-bottom: 20px;
            
            u {
              text-decoration: none;
              color: #FEBB36;
            }

            p {
              display: block;
              margin-bottom: 20px;
            }
          }

          &.about__photo {
            flex: 1;
            flex-basis: 300px;
            max-width: 300px;
            
            img {
              width: 100%;
            }

            .nextButton {
              button {
                background: #FEBB36;
                color: #1C3A3C;
                
                &:hover {
                  background: #fff;
                }
              }

              .arrow {
                color: #FEBB36;
              }
            }
          }
        }
      }
    }
  }
</style>