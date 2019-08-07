/* eslint-disable */
import LoginForm from "./LoginForm";
import Warning from "./Warning";
import { mount } from "enzyme";

describe("LoginForm Tests", () => {
  it("Component Renders", () => {
    const wrapper = mount(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Changehandler of the component works correctly", () => {
    const wrapper = mount(<LoginForm />);
    wrapper.find("input[name='username']").simulate("change", {
      target: { value: "Hello world", name: "username" },
    });
    expect(wrapper.find("input[name='username']").prop("value")).toBe(
      "Hello world",
    );
    wrapper.find("input[name='password']").simulate("change", {
      target: { value: "This is a test", name: "password" },
    });
    expect(wrapper.find("input[name='password']").prop("value")).toBe(
      "This is a test",
    );
  });

  it("Login button should be disabled if input is not validated, and vice versa", () => {
    const wrapper = mount(<LoginForm />);
    expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    wrapper.find("input[name='username']").simulate("change", {
      target: { value: "testing@gmail.com", name: "username" },
    });
    wrapper.find("input[name='password']").simulate("change", {
      target: { value: "testingpassword", name: "password" },
    });
    expect(wrapper.find("button").prop("disabled")).toBeFalsy();
  });

  it("Warning should not display on mount, and should display after first failed login attempt", () => {
    const wrapper = mount(<LoginForm />);
    expect(wrapper.find(Warning).exists()).toBeFalsy();
    wrapper.find("input[name='username']").simulate("change", {
      target: { value: "testing@gmail.com", name: "username" },
    });
    wrapper.find("input[name='password']").simulate("change", {
      target: { value: "testingpassword", name: "password" },
    });
    /** Need to figure out how to make the api call */
  });

  it("Should show login form on mount, show signup form if user clicks the signup link", () => {
    const wrapper = mount(<LoginForm />);
    expect(wrapper.find("shared__FormBottom").text()).toBe(
      "New user ? Signup here!",
    );
    wrapper.find("LoginForm__StyledLink").simulate("click");
    expect(wrapper.find("shared__FormBottom").text()).toBe(
      "New user ? Login here!",
    );
  });
});
