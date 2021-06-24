<template>
  <section>
    <b-table
      :data="data"
      :paginated="isPaginated"
      :per-page="tableConfig.perPage"
      :current-page.sync="currentPage"
      :pagination-simple="tableConfig.isPaginationSimple"
      :pagination-position="tableConfig.paginationPosition"
      :default-sort-direction="tableConfig.defaultSortDirection"
      :pagination-rounded="tableConfig.isPaginationRounded"
      :sort-icon="tableConfig.sortIcon"
      :sort-icon-size="tableConfig.sortIconSize"
      :icon-pack="tableConfig.iconPack"
      default-sort="name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        field="name"
        label="Task Name"
        centered
        sortable
        v-slot="props"
      >
        {{ props.row.name }}
      </b-table-column>

      <b-table-column
        field="description"
        label="Description"
        sortable
        centered
        v-slot="props"
      >
        {{ props.row.description }}
      </b-table-column>

      <b-table-column
        field="created"
        label="Created Date"
        sortable
        centered
        v-slot="props"
      >
        <span class="tag is-primary">
          {{ new Date(props.row.created).toLocaleDateString() }}
        </span>
      </b-table-column>

      <b-table-column
        field="deadline"
        label="Deadline Date"
        sortable
        centered
        v-slot="props"
      >
        <span class="tag is-primary">
          {{ new Date(props.row.deadline).toLocaleDateString() }}
        </span>
      </b-table-column>

      <b-table-column label="Completed" centered v-slot="props">
        <b-checkbox
          class="check-box-custom"
          :value="props.row.completed"
          @click.native="statusUpdate(props.row.id, !props.row.completed)"
        />
      </b-table-column>
      <b-table-column label="Actions" centered>
        <span>
          <b-button type="is-primary is-light is-small" icon-right="edit" />
          <b-button type="is-primary is-small" icon-right="trash" />
        </span>
      </b-table-column>
    </b-table>
  </section>
</template>

<script lang="ts">
import { Task } from "@/api/types/task";
import tableConfig from "@/config/table.json";

export default {
  props: {
    data: {
      type: Array as () => Task[],
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      tableConfig: tableConfig,
    };
  },

  computed: {
    isPaginated: function (): boolean {
      return tableConfig.isPaginated && this.data.length > tableConfig.perPage;
    },
  },

  methods: {
    statusUpdate: function (id: string, completed: boolean): void {
      this.$emit("update-task", { taskId: id, task: { completed: completed } });
    },
  },
};
</script>

<style lang="scss">
.check-box-custom {
  margin-top: 0.18em;
  margin-right: 0 !important;
}
</style>
