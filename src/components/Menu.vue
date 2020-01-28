<template>
  <nav :class="getClass">
    <li
      v-for="(item, index) in getRoutes"
      :key="index"
    >
      <router-link 
        :to="item.path" 
        active-class="active" 
        exact
      >
        {{ item.name }}
      </router-link>
    </li>
  </nav>
</template>

<script>
import state from '../appState'

export default {
  data() {
    return {
      state
    }
  },

  props: { className: String },
  computed: {
    getRoutes() {
      return this.$router.options.routes
    },

    getClass() {
      return [
        'mainMenu mainMenu__' + this.className,
        {
          'mainMenu__mobile_showed': this.state.menuOpened && this.className === 'mobile'
        }
      ]
    }
  }
}
</script>