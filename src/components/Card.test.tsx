/* eslint-disable */
import React from "react";
import { mount } from "enzyme";
import Card from "./Card";
import { NotificationProvider } from "./Notification/Notification";

const defaultProps = {
  _id: "",
  question: "",
  answer: "",
  creator: "",
  controls: {
    nextCard: (): void => {},
    previousCard: (): void => {},
  },
};
describe("Card Component", () => {
  it("Render Component", () => {
    const wrapper = mount(
      <NotificationProvider>
        <Card {...defaultProps} />
      </NotificationProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
