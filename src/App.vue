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
    <main>
      <router-view />
    </main>
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
  
</style>
