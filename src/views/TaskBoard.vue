<template>
  <div class="container min-vh taskboard">
    <div class="columns m-3">
      <div class="column is-three-quarter-tablet">
        <!-- Welcome Text Section -->
        <h4 class="pb-3 title is-4 has-text-left p-1">
          Welcome to your personal Task Table
        </h4>
        <text-block
          backgroundType="has-background-info-light"
          textContent="Scroll through your tasks, order them by deadline or by the created
          date! You can even create a new task or delete one that already
          exists. Get started with Task Herald now!"
        />

        <!-- Show Completed and pending tasks -->
        <status-tags
          :completedTasks="tasks.completedTasks"
          :pendingTasks="tasks.pendingTasks"
        />

        <!-- Create new Task Button -->
        <section>
          <div class="is-flex is-justify-content-flex-start my-3">
            <b-button
              label="Create new Task"
              type="is-primary"
              left
              size="is-small"
              @click="
                resetWindow();
                isComponentModalActive = true;
              "
            />
          </div>
        </section>

        <!-- Data Table -->
        <data-table
          :data="tableData"
          @update-task="handleTaskUpdate"
          @open-editor="openEditTask"
          @open-delete="openDeleteTask"
        />

        <!-- Create/ Edit Task Modal -->
        <b-modal
          v-model="isComponentModalActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="true"
          aria-role="dialog"
          aria-label="Task Modal"
          aria-modal
        >
          <template #default="props">
            <task-modal
              v-bind="formProps"
              @close="props.close"
              @save="saveTask"
              @edit="handleTaskUpdate"
            ></task-modal>
          </template>
        </b-modal>
      </div>

      <!-- Side Notifications -->
      <side-bar />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import { Task } from "@/api/types/task";
import DataTable from "@/components/DataTable.vue";
import TaskModal from "@/components/TaskModal.vue";
import StatusTags from "@/components/StatusTags.vue";
import TextBlock from "@/components/TextBlock.vue";
import SideBar from "@/components/SideBar.vue";

export default Vue.extend({
  name: "TaskBoard",
  components: {
    DataTable,
    TaskModal,
    StatusTags,
    TextBlock,
    SideBar,
  },
  data: function () {
    return initialState();
  },
  created: function () {
    this.$store.dispatch("tasks/getTasks");
  },
  methods: {
    /**
     * Method to call action to update Tasks
     */
    handleTaskUpdate: function (event: {
      taskId: string;
      task: Partial<Task>;
    }) {
      this.$store
        .dispatch("tasks/updateTask", event)
        .then(() => this.$buefy.toast.open("Task updated!"));
    },

    /**
     * Opens the dialog to edit tasks
     */
    openEditTask: function (event: Task) {
      (this as any).formProps.taskDetails = event;
      (this as any).isComponentModalActive = true;
    },

    /**
     * Opens the confirmation to delete the tasks and calls delete action
     */
    openDeleteTask: function (event: string) {
      this.$buefy.dialog.confirm({
        title: "Deleting Task",
        message:
          "Are you sure you want to <b>delete</b> this task? This action cannot be undone.",
        confirmText: "Delete Task",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$store
            .dispatch("tasks/deleteTask", event)
            .then(() => this.$buefy.toast.open("Task deleted!"));
        },
      });
    },
    /**
     * Reset state on close
     */
    resetWindow: function () {
      Object.assign(this.$data, initialState());
    },
    /**
     * Call action to create new task
     */
    saveTask: function (event: Task) {
      this.$store
        .dispatch("tasks/createTask", event)
        .then(() => this.$buefy.toast.open("Task created!"));
    },
  },
  computed: {
    // fetch state from Store
    ...mapState({
      tasks: "tasks",
    }),
    tableData: function () {
      return this.tasks.taskList as Task[];
    },
  },
});
/**
 * Helper to set the intital values of state
 */
function initialState() {
  return {
    isComponentModalActive: false,
    formProps: {
      taskDetails: {
        id: "",
        name: "",
        description: "",
        created: new Date(),
        deadline: new Date(),
        completed: false,
      } as Task,
    },
  };
}
</script>

<style lang="scss">
.min-vh {
  min-height: 88vh;
}

.styled-col {
  background: tan;
}
</style>
