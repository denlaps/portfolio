<template>
  <div id="app">
    <header>
      <div class="container">
        <nav class="mainMenu blue">
          <li><a href="index.html" class="active">Home</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="about.html">About me</a></li>
          <li><a href="contacts.html">Contacts</a></li>
        </nav>
      </div>
    </header>
    <main>
      <video preload="auto" autoplay loop muted>
        <source src="./assets/city.mp4" type="video/mp4">
      </video>
      <div class="overlay">
        <figure class="delayedRect">
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
            <img src="./assets/photos/photo1.jpg" alt="">
            <div class="nextButton">
              <button>Watch works</button>
              <i class="arrow">
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.7071 8.70711C40.0976 8.31659 40.0976 7.68342 39.7071 7.2929L33.3431 0.928935C32.9526 0.538411 32.3195 0.538411 31.9289 0.928935C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM-8.74228e-08 9L39 9L39 7L8.74228e-08 7L-8.74228e-08 9Z" fill="#D8FFFF"/>
                </svg>
              </i>
            </div>
          </div>
        </figure>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style lang="scss">
  @import 'assets/fonts.css';
  $lightBlue: #D8FFFF;
  $changedArrow: lighten($lightBlue, 10%);
  $trDelay: 300ms;

  * {
    margin: 0;
    padding: 0;
  }

  button {
    border: none;
    cursor: pointer;
    outline: none;
  }

  html, body {
    font-family: 'Roboto';
  }

  header {
    display: flex;
    justify-content: center;
    background: #292D45;
    width: 100%;
    height: 71px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1199px;
      padding: 0 100px;
    }
  }

  nav {
    &.mainMenu {
      display: flex;
      height: 100%;
      font-size: 18px;
      line-height: 26px;

      li {
        list-style: none;
        height: inherit;

        a {
          text-decoration: none;
          display: flex;
          align-items: center;
          height: inherit;
          padding: 0 30px;
          transition: background-color $trDelay;
        }
      }

      &.blue {
        li {
          a {
            color: $lightBlue;

            &.active, &:hover {
              background: #1D2135;
            }
          }
        }
      }
    }
  }

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
    }

    .overlay {
      background: rgba(29, 33, 56, 0.9);
      position: relative;
      display: flex;
      width: 100vw;
      height: 100vh;
      justify-content: center;
      align-items: center;
      z-index: 2;
    }
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

    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      width: 100%;
      height: 40px;
      border: 4px solid $lightBlue;
    }

    &:before {
      top: 0;
      border-bottom: none;
    }

    &:after {
      bottom: 0;
      border-top: none;
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
