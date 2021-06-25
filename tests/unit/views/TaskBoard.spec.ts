import { createLocalVue, Wrapper, mount } from "@vue/test-utils";
import Buefy from "buefy";
import Vuex from "vuex";

import TaskBoard from "@/views/TaskBoard.vue";
import DataTable from "@/components/DataTable.vue";
import TaskModal from "@/components/TaskModal.vue";
import { Task } from "@/api/types/task";

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

const data = {
  id: "lok234",
  name: "Meowth",
  description: "Meet Meowth",
  created: new Date("2021-06-21T18:23:31.048+00:00"),
  deadline: new Date("2021-06-22T18:23:31.048+00:00"),
  completed: true,
} as Task;

const getTasks = jest.fn(() => Promise.resolve([data]));
const updateTask = jest.fn(() => Promise.resolve(data));
const deleteTask = jest.fn(() => Promise.resolve(data));
const createTask = jest.fn(() => Promise.resolve(data.id));

describe("TaskBoard.vue", () => {
  let wrapper: Wrapper<TaskBoard>;
  beforeAll(function () {
    window.confirm = jest.fn(() => true);
    const store = new Vuex.Store({
      modules: {
        tasks: {
          namespaced: true,
          state: function () {
            return {
              taskList: [data] as Task[],
              completedTasks: 0,
              pendingTasks: 1,
            };
          },
          actions: {
            // mock function
            getTasks: getTasks,
            updateTask: updateTask,
            deleteTask: deleteTask,
            createTask: createTask,
          },
        },
      },
    });
    wrapper = mount(TaskBoard, {
      propsData: {},
      localVue,
      store,
    });
  });

  it("is a TaskBoard Instance", () => {
    expect(wrapper.is(TaskBoard)).toBeTruthy();
  });

  it("update-task event should call updateTask action", async () => {
    wrapper.findComponent(DataTable).vm.$emit("update-task", {
      taskId: "123",
      task: { completed: false },
    });
    await wrapper.vm.$nextTick();
    expect(updateTask).toHaveBeenCalled();
    expect(getTasks).toHaveBeenCalled();
  });

  it("open-editor event should update isComponentModalActive", async () => {
    wrapper.findComponent(DataTable).vm.$emit("open-editor", data);
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).isComponentModalActive).toBe(true);

    const button: Wrapper<TaskBoard> = wrapper.find("button.button.is-primary");
    await button.trigger("click");
  });

  it("save event should call create Task event", async () => {
    wrapper.findComponent(TaskModal).vm.$emit("save", {
      id: "",
      name: "Meowth",
      description: "Meet Meowth",
      created: new Date("2021-06-21T18:23:31.048+00:00"),
      deadline: new Date("2021-06-22T18:23:31.048+00:00"),
      completed: true,
    });
    await wrapper.vm.$nextTick();
    expect(createTask).toHaveBeenCalled();
  });
});
