/* eslint-disable */
import { mount } from "enzyme";
import BurgerMenu from "./BurgerMenu";

describe("Burger Menu Tests", () => {
  it("Component Renders", () => {
    const wrapper = mount(<BurgerMenu loggedIn={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
