/* eslint-disable */
import { mount } from "enzyme";
import ToggleableMenu from "./ToggleableMenu";

describe('Toggleable Menu', () => {
   it("Component renders", () => {
       const wrapper = mount(<ToggleableMenu />);
       expect(wrapper).toMatchSnapshot();
   }) 
})
