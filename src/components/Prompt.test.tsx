/* eslint-disable */
import { mount } from "enzyme";
import Prompt from "./Prompt";

describe("Prompt", () => {
  const fakeOnClick = jest.fn(() => {});
  it("Component renders", () => {
    const wrapper = mount(<Prompt onClick={fakeOnClick} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("On Click function registers", () => {
    const wrapper = mount(<Prompt onClick={fakeOnClick} />);
    wrapper.find("button").simulate("click");
    expect(fakeOnClick.mock.calls.length).toBe(1);
  });
});
