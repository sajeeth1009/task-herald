<template>
  <div class="column is-one-quarter-tablet">
    <code>Your alerts</code>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Task } from "@/api/types/task";

export default Vue.extend({
  props: {
    expiredTasks: {
      type: Array as () => Task[],
    },
    timeAlertTasks: {
      type: Array as () => Task[],
    },
  },
});
</script>
