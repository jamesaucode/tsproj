/* eslint-disable */
import { mount } from "enzyme";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("Component renders", () => {
    const wrapper = mount(<NavBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
