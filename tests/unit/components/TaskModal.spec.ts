import { createLocalVue, Wrapper, mount, WrapperArray } from "@vue/test-utils";
import Buefy from "buefy";

import TaskModal from "@/components/TaskModal.vue";
import { Task } from "@/api/types/task";

const localVue = createLocalVue();
localVue.use(Buefy);
const data = {
  id: "lok234",
  name: "Meowth",
  description: "Meet Meowth",
  created: new Date("2021-06-21T18:23:31.048+00:00"),
  deadline: new Date("2021-06-22T18:23:31.048+00:00"),
  completed: true,
} as Task;

const emptyData = {
  id: "",
  name: "",
  description: "",
  created: new Date(),
  deadline: new Date(),
  completed: false,
} as Task;

describe("TaskModal.vue for Edit", () => {
  let wrapper: Wrapper<Vue>;
  beforeAll(function () {
    wrapper = mount(TaskModal, {
      propsData: { taskDetails: data },
      localVue,
    });
  });

  it("is a TaskModal Instance", () => {
    expect(wrapper.is(TaskModal)).toBeTruthy();
  });

  it("expect form to be loaded from props", () => {
    const inputs: WrapperArray<Vue> = wrapper.findAll("input.input");
    const textArea: Wrapper<Vue> = wrapper.find("textarea.textarea");
    const checkbox: Wrapper<Vue> = wrapper.find("label.b-checkbox.checkbox");
    const map: { [k: string]: string } = {};
    inputs.wrappers.forEach((wrapper) => {
      const key: string | null = wrapper.element.getAttribute("placeholder");
      if (key) map[key] = (<HTMLInputElement>wrapper.element).value;
    });
    expect(map).toStrictEqual({
      "Task Name": "Meowth",
      "Task Created at": "21/06/2021",
      "Task Deadline at": "22/06/2021",
    });
    expect((<HTMLInputElement>checkbox.element.firstChild).checked).toBe(true);
    expect((<HTMLTextAreaElement>textArea.element).value).toBe("Meet Meowth");
  });

  it("expect edit event to be triggered on save", async () => {
    const button: Wrapper<Vue> = wrapper.find("button.button.is-primary");
    await button.trigger("click");
    wrapper.vm.$nextTick(() => {
      (wrapper.vm as any).submit();
      expect(wrapper.emitted()["edit"]).toBeTruthy();
      expect(wrapper.emitted()["edit"]?.[0]).toStrictEqual([
        {
          taskId: "lok234",
          task: {
            id: "lok234",
            name: "Meowth",
            description: "Meet Meowth",
            created: new Date("2021-06-21T18:23:31.048+00:00"),
            deadline: new Date("2021-06-22T18:23:31.048+00:00"),
            completed: true,
          },
        },
      ]);
    });
  });
});

describe("TaskModal.vue for Create", () => {
  let wrapper: Wrapper<Vue>;
  beforeAll(function () {
    wrapper = mount(TaskModal, {
      propsData: { taskDetails: emptyData },
      localVue,
    });
  });

  it("expect form to be empty when props are empty", () => {
    const textArea: Wrapper<Vue> = wrapper.find("textarea.textarea");
    const checkbox: Wrapper<Vue> = wrapper.find("label.b-checkbox.checkbox");
    const inputs: WrapperArray<Vue> = wrapper.findAll("input.input");
    const map: { [k: string]: string } = {};
    inputs.wrappers.forEach((wrapper) => {
      const key: string | null = wrapper.element.getAttribute("placeholder");
      if (key) map[key] = (<HTMLInputElement>wrapper.element).value;
    });
    expect(map).toStrictEqual({
      "Task Name": "",
      "Task Created at": new Date().toLocaleDateString("en-GB"),
      "Task Deadline at": new Date().toLocaleDateString("en-GB"),
    });
    expect((<HTMLInputElement>checkbox.element.firstChild).checked).toBe(false);
    expect((<HTMLTextAreaElement>textArea.element).value).toBe("");
  });

  it("save should be disabled if name is empty", async () => {
    const button: Wrapper<Vue> = wrapper.find("button.button.is-primary");
    expect((<HTMLButtonElement>button.element).disabled).toBe(true);
  });

  it("expect save event to be triggered on save", async () => {
    const emptyId = data;
    emptyId.id = "";
    await wrapper.setData({ taskInfo: emptyId });
    const button: Wrapper<Vue> = wrapper.find("button.button.is-primary");
    await button.trigger("click");
    wrapper.vm.$nextTick(() => {
      (wrapper.vm as any).submit();
      expect(wrapper.emitted()["save"]).toBeTruthy();
      expect(wrapper.emitted()["save"]?.[0]).toStrictEqual([
        {
          id: "",
          name: "Meowth",
          description: "Meet Meowth",
          created: new Date("2021-06-21T18:23:31.048+00:00"),
          deadline: new Date("2021-06-22T18:23:31.048+00:00"),
          completed: true,
        },
      ]);
    });
  });
});
