/* eslint-disable */
import { mount } from "enzyme";
import Loading from "./Loading";

describe("Loading", () => {
  it("Component renders", () => {
    const wrapper = mount(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
