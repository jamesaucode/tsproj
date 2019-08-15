/* eslint-disable */
import { mount } from "enzyme";
import DropDownMenu from "./DropDownMenu";

describe("DropDownMenu", () => {
  it("Component renders", () => {
    const wrapper = mount(<DropDownMenu />);
    expect(wrapper).toMatchSnapshot();
  });
  it("Options should not render if toggle button has not been clicked", () => {
    const wrapper = mount(
      <DropDownMenu>
        <DropDownMenu.Option>Option1</DropDownMenu.Option>
        <DropDownMenu.Option>Option2</DropDownMenu.Option>
        <DropDownMenu.Option>Option3</DropDownMenu.Option>
      </DropDownMenu>,
    );
    expect(wrapper.find("li").length).toBe(0);
  });

  it("Options should render if toggle button is clicked", () => {
    const wrapper = mount(
      <DropDownMenu>
        <DropDownMenu.Option>Option1</DropDownMenu.Option>
        <DropDownMenu.Option>Option2</DropDownMenu.Option>
        <DropDownMenu.Option>Option3</DropDownMenu.Option>
      </DropDownMenu>,
    );
    wrapper.find("button").simulate("click");
    expect(wrapper.find("li").length).toBe(3);
  });
});
