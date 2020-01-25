<template>
  <div id="app" :class="currentClass">
    <header>
      <div class="container">
        <nav class="mainMenu">
          <li><router-link to="/" active-class="active" exact>Home</router-link></li>
          <li><router-link to="/portfolio" active-class="active">Portfolio</router-link></li>
          <li><router-link to="/about" active-class="active">About me</router-link></li>
          <li><router-link to="/contacts" active-class="active">Contacts</router-link></li>
        </nav>
      </div>
    </header>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',

  computed: {
    currentClass() {
      return 'page__' + this.$route.name
    }
  }
}
</script>

<style lang="scss">
  @import './assets/styles/fonts.css';

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
    width: 100%;
    height: 71px;
    position: relative;
    z-index: 10;
    transition: background $chSchemeDelay;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1199px;
      padding: 0 10%;
    }
  }

  .mainMenu {
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
        transition: background-color $trDelay, color $trDelay;
      }
    }

    &:hover {
      li {
        a {
          &.active {
            background: transparent !important;
          }
        }
      }
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

  main {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 71px;
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    box-sizing: border-box;
    overflow: hidden;

    section {
      flex: 1;
      width: 50%;
    }

    .attachedBlock {
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, .5);
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      z-index: 11;
      transform: translateX(100%);
      transition: transform 400ms;

      .wrapper {
        display: flex;
        flex-wrap: wrap;
        height: calc(100% - 71px);
        overflow-y: auto;
      }

      &__head {
        display: flex;
        align-items: center;
        height: 71px;
        position: relative;
        z-index: 11;
      }

      &.show {
        transform: translateX(0);
      }
    }
  }
</style>
