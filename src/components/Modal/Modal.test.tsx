/* eslint-disable */
import React from "react";
import { mount } from "enzyme";
import Modal from "./index";

describe("Modal Tests", () => {
  it("Component Renders", () => {
    const wrapper = mount(<Modal closeModal={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
