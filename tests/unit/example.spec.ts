import { shallowMount } from "@vue/test-utils";
import Landing from "@/components/Landing.vue";

describe("Landing.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Landing, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
