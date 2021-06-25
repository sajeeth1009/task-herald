import { createLocalVue, Wrapper, mount } from "@vue/test-utils";
import Buefy from "buefy";

import Navbar from "@/components/Navbar.vue";
import router from "@/router/router";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("Navbar.vue", () => {
  let wrapper: Wrapper<Vue>;
  beforeAll(function () {
    window.alert = jest.fn();
    wrapper = mount(Navbar, {
      propsData: {},
      localVue,
      router,
    });
  });
  it("expect alert on Log out text", async () => {
    const button: Wrapper<Vue> = wrapper.find(
      "a.button.is-danger.is-light.logout-button"
    );
    await button.trigger("click");
    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      "OOPS! \n This part of the website is still under construction"
    );
  });
  it("is a Navbar Instance", () => {
    expect(wrapper.is(Navbar)).toBeTruthy();
  });
});
