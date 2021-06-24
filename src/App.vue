<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Navbar,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
