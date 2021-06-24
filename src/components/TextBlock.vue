<template>
  <div class="block has-text-left p-1" :class="backgroundType">
    {{ textContent }}
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    textContent: {
      type: String as () => string,
    },
    backgroundType: {
      type: String as () => string,
    },
  },
});
</script>
