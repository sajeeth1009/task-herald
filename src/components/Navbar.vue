<template>
  <b-navbar class="is-primary nav-pad nav-margin">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/home' }">
        <img
          class="image-sizing"
          src="https://minglesports.tech/assets/images/logo.svg"
          alt="Company logo for Mingle Sports"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/taskboard' }">
        My Task Board
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-danger is-light logout-button" @click="logout">
            Log Out
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NavBar",
  methods: {
    logout: function () {
      alert("OOPS! \n This part of the website is still under construction");
    },
  },
});
</script>

<style lang="scss">
.nav-pad {
  padding: 0rem 1.5rem;
}

.nav-margin {
  margin-bottom: 1rem;
}

.image-sizing {
  max-height: 5rem !important;
}

.logout-button {
  flex: auto;
}

.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

.navbar-burger {
  height: auto !important;
}
</style>
