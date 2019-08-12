/* eslint-disable */
import { mount } from "enzyme";
import Register from "./Register";

describe("Register", () => {
  const fakeOnClick = jest.fn(() => {});
  it("Component renders", () => {
    const wrapper = mount(<Register toggleForm={fakeOnClick} />);
    expect(wrapper).toMatchSnapshot();
  });
});
