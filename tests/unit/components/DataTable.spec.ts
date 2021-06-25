import { createLocalVue, Wrapper, mount, WrapperArray } from "@vue/test-utils";
import Buefy from "buefy";

import DataTable from "@/components/DataTable.vue";
import { Task } from "@/api/types/task";

const localVue = createLocalVue();
localVue.use(Buefy);
const data = [
  {
    id: "abc123",
    name: "James",
    description: "Meet James",
    created: new Date("2021-06-24T18:23:31.048+00:00"),
    deadline: new Date("2021-06-27T18:23:31.048+00:00"),
    completed: false,
  },
  {
    id: "jaz233",
    name: "Jesse",
    description: "Meet Jesse",
    created: new Date("2021-06-23T18:23:31.048+00:00"),
    deadline: new Date("2021-06-26T18:23:31.048+00:00"),
    completed: false,
  },
  {
    id: "lok234",
    name: "Meowth",
    description: "Meet Meowth",
    created: new Date("2021-06-21T18:23:31.048+00:00"),
    deadline: new Date("2021-06-22T18:23:31.048+00:00"),
    completed: true,
  },
] as Task[];
describe("DataTable.vue", () => {
  let wrapper: Wrapper<Vue>;
  beforeAll(function () {
    wrapper = mount(DataTable, {
      propsData: { data },
      localVue,
    });
  });
  it("is a DataTable Instance", () => {
    expect(wrapper.is(DataTable)).toBeTruthy();
  });

  it("expect pagination to be false when table entries < 10", () => {
    expect(wrapper.find("small.info").exists()).toBe(false);
  });

  it("expect pagination to be true when table entries > 10", () => {
    const elevenDataEntries = [];
    for (let i = 0; i < 13; i++) {
      elevenDataEntries.push({
        id: "" + i,
        name: "James",
        description: "Meet James",
        created: new Date("2021-06-24T18:23:31.048+00:00"),
        deadline: new Date("2021-06-27T18:23:31.048+00:00"),
        completed: false,
      });
    }
    const wrapperT = mount(DataTable, {
      propsData: { data: elevenDataEntries },
      localVue,
    });
    expect(wrapperT.find("small.info").exists()).toBe(true);
  });

  it("expect one checkbox to be checked when 1 task is complete", () => {
    const checkboxes: WrapperArray<Vue> = wrapper.findAll(
      "label.b-checkbox.checkbox.check-box-custom"
    );
    expect(
      checkboxes.wrappers.filter(
        (wrapper) => (<HTMLInputElement>wrapper.element.firstChild).checked
      ).length
    ).toBe(1);
  });

  it("expect two checkboxes to be unchecked when 1 task is complete", () => {
    const checkboxes: WrapperArray<Vue> = wrapper.findAll(
      "label.b-checkbox.checkbox.check-box-custom"
    );
    expect(
      checkboxes.wrappers.filter(
        (wrapper) => !(<HTMLInputElement>wrapper.element.firstChild).checked
      ).length
    ).toBe(2);
  });

  it("should emit an update task event on completed status change", () => {
    const checkboxes: WrapperArray<Vue> = wrapper.findAll(
      "label.b-checkbox.checkbox.check-box-custom"
    );
    checkboxes.wrappers[0].find("input").trigger("click");
    wrapper.vm.$nextTick(() => {
      (wrapper.vm as any).statusUpdate("testID", true);
      expect(wrapper.emitted()["update-task"]).toBeTruthy();
      expect(wrapper.emitted()["update-task"]?.[0]).toStrictEqual([
        {
          task: { completed: true },
          taskId: "testID",
        },
      ]);
    });
  });

  it("should emit an open edit task event on clicking edit icon", () => {
    const button: Wrapper<Vue> = wrapper.find(
      "button.button.is-primary.is-light.is-small"
    );
    button.trigger("click");
    wrapper.vm.$nextTick(() => {
      (wrapper.vm as any).openTaskEditor("abc123");
      expect(wrapper.emitted()["open-editor"]).toBeTruthy();
      expect(wrapper.emitted()["open-editor"]?.[0]).toStrictEqual([
        {
          id: "abc123",
          name: "James",
          description: "Meet James",
          created: new Date("2021-06-24T18:23:31.048+00:00"),
          deadline: new Date("2021-06-27T18:23:31.048+00:00"),
          completed: false,
        },
      ]);
    });
  });

  it("should emit an open delete task event on clicking delete icon", () => {
    const button: Wrapper<Vue> = wrapper.find(
      "button.button.is-primary.is-small"
    );
    button.trigger("click");
    wrapper.vm.$nextTick(() => {
      (wrapper.vm as any).openDeleteConfirmation("abc123");
      expect(wrapper.emitted()["open-delete"]).toBeTruthy();
      expect(wrapper.emitted()["open-delete"]?.[0]).toStrictEqual(["abc123"]);
    });
  });
});
