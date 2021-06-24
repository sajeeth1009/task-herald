<template>
  <div class="container min-vh taskboard">
    <div class="columns m-3">
      <div class="column is-one-quarter-tablet">
        <code>Side Bar</code>
      </div>
      <div class="column is-three-quarter-tablet">
        <h4 class="pb-3 title is-4 has-text-left p-1">
          Welcome to your personal Task Table
        </h4>
        <div class="block has-text-left has-background-info-light p-1">
          Scroll through your tasks, order them by deadline or by the created
          date! You can even create a new task or delete one that already
          exists. Get started with Task Herald now!
        </div>
        <b-taglist>
          <b-tag rounded class="is-success">
            Your Completed Tasks: {{ tasks.completedTasks }}
          </b-tag>
          <b-tag rounded class="is-danger is-light">
            Your Remaining Tasks: {{ tasks.pendingTasks }}
          </b-tag>
        </b-taglist>
        <DataTable :data="tableData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import { Task } from "@/api/types/task";
import DataTable from "@/components/DataTable.vue";

export default Vue.extend({
  name: "TaskBoard",
  components: {
    DataTable,
  },
  created: function () {
    this.$store.dispatch("tasks/getTasks");
  },
  methods: {
    updateCompletedStatus: function (taskId: string) {
      this.$store.dispatch("tasks/updateCompleted", { id: taskId });
    },
  },
  computed: {
    ...mapState({
      tasks: "tasks",
    }),
    tableData: function () {
      return this.tasks.taskList as Task[];
    },
  },
});
</script>

<style lang="scss">
.min-vh {
  min-height: 88vh;
}

.styled-col {
  background: tan;
}
</style>
