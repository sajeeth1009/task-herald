<template>
  <b-carousel :indicator-inside="false">
    <b-carousel-item v-for="(item, i) in 5" :key="i">
      <b-image class="image" :src="getImgUrl(i)"></b-image>
    </b-carousel-item>
    <template #indicators="props">
      <b-image
        class="al image"
        :src="getImgUrl(props.i)"
        :title="props.i"
      ></b-image>
    </template>
  </b-carousel>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  components: {},
  methods: {
    /**
     * Method to fetch URL's while cycling through v-for index.
     */
    getImgUrl(value: number) {
      return `/images/${value}-home.jpg`;
    },
  },
});
</script>
