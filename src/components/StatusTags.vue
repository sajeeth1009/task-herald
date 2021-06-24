<template>
  <b-taglist>
    <b-tag rounded class="is-success">
      Your Completed Tasks: {{ completedTasks }}
    </b-tag>
    <b-tag rounded class="is-danger is-light">
      Your Remaining Tasks: {{ pendingTasks }}
    </b-tag>
  </b-taglist>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    completedTasks: {
      type: Number as () => number,
    },
    pendingTasks: {
      type: Number as () => number,
    },
  },
});
</script>
