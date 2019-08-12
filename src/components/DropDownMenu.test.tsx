/* eslint-disable */
import { mount } from "enzyme";
import DropDownMenu from "./DropDownMenu";

describe("DropDownMenu", () => {
  it("Component renders", () => {
    const wrapper = mount(<DropDownMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
