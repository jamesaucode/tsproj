/* eslint-disable */
import { mount } from "enzyme";
import Card from "./Card";

const defaultProps = {
  _id: "",
  question: "",
  answer: "",
  creator: "",
  pushNotification: (): void => {},
  controls: {
    nextCard: (): void => {},
    previousCard: (): void => {},
  },
};
describe("Card Component", () => {
  it("Render Component", () => {
    const wrapper = mount(<Card {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
