<template>
  <div class="column is-one-quarter-tablet">
    <div class="m-3" v-if="expiredTasks.length > 0">
      <p class="has-text-danger has-text-weight-bold m-3">Deadline Missed!</p>
      <div
        v-for="task in expiredTasks"
        :key="task.id"
        class="box has-background-danger-light"
      >
        <p class="has-text-left has-text-weight-bold">Task: {{ task.name }}</p>
        <p class="has-text-left has-text-weight-bold">
          Deadline: {{ new Date(task.deadline).toLocaleDateString("en-GB"), }}
        </p>
      </div>
    </div>
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
