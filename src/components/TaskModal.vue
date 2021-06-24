<template>
  <form action="">
    <div class="modal-card is-justify-content-start" style="width: auto">
      <!--Modal Titles -->
      <header class="modal-card-head has-background-primary">
        <p class="modal-card-title has-text-white">Task Details</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <!--Modal rows to edit name, description, created, deadline and completed status -->
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            type="text"
            v-model="taskInfo.name"
            placeholder="Task Name"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Created">
          <b-datepicker
            placeholder="Task Created at"
            icon="calendar"
            locale="en-GB"
            editable
            v-model="taskInfo.created"
          >
          </b-datepicker>
        </b-field>
        <b-field label="Deadline">
          <b-datepicker
            placeholder="Task Deadline at"
            icon="calendar"
            locale="en-GB"
            editable
            v-model="taskInfo.deadline"
          >
          </b-datepicker>
        </b-field>

        <b-field label="Description">
          <b-input
            type="textarea"
            v-model="taskInfo.description"
            placeholder="Task Description"
            required
          >
          </b-input>
        </b-field>

        <b-checkbox v-model="taskInfo.completed">Completed</b-checkbox>
      </section>
      <!-- Submit or close modal-->
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button
          label="Save"
          :disabled="isDisabled"
          @click="submit"
          type="is-primary"
        />
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Task } from "@/api/types/task";

export default Vue.extend({
  props: {
    taskDetails: {
      type: Object as () => Task,
    },
  },
  data() {
    return {
      taskInfo: {
        id: this.taskDetails.id,
        name: this.taskDetails.name,
        description: this.taskDetails.description,
        completed: this.taskDetails.completed,
        deadline: new Date(this.taskDetails.deadline),
        created: new Date(this.taskDetails.created),
      },
    };
  },
  computed: {
    isDisabled() {
      return (
        !(this as any).taskInfo.name || !(this as any).taskInfo.description
      );
    },
  },
  methods: {
    /**
     * Call emit on either edit or on save based on update or create task.
     */
    submit: function () {
      if ((this as any).taskInfo.id != "") {
        this.$emit("edit", {
          taskId: (this as any).taskInfo.id,
          task: (this as any).taskInfo,
        });
      } else {
        this.$emit("save", (this as any).taskInfo);
      }
      this.$emit("close");
    },
  },
});
</script>
<style lang="scss">
.modal-card {
  overflow: visible !important;
  .modal-card-body {
    overflow: visible !important;
  }
}

label {
  text-align: left;
}
</style>
