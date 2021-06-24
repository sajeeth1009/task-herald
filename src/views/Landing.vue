<template>
  <section>
    <section class="hero is-halfheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-align-items-center">
            <div class="column is-one-third-tablet">
              <div class="title has-text-primary">Task Herald</div>
              <div class="subtitle has-text-grey">
                Your one-stop task organizer!
              </div>
            </div>
            <div class="column two-one-third-tablet">
              <carousel />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero has-background-grey-light is-medium">
      <div class="hero-body">
        <p class="title is-size-2">Get Started Today!</p>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Carousel from "@/components/Carousel.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Carousel,
  },
});
</script>
