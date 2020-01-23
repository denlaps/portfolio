<template>
  <div id="app">
    <header>
      <div class="container">
        <nav class="mainMenu blue">
          <li><router-link to="/" active-class="active" exact>Home</router-link></li>
          <li><router-link to="/portfolio" active-class="active">Portfolio</router-link></li>
          <li><router-link to="/about" active-class="active">About me</router-link></li>
          <li><router-link to="/contacts" active-class="active">Contacts</router-link></li>
        </nav>
      </div>
    </header>
    <main>
      <router-view />
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
</style>
