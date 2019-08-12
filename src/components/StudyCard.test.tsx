/* eslint-disable */
import { mount } from "enzyme";
import StudyCard from "./StudyCard";

describe("StudyCard", () => {
  const mockPushNotification = jest.fn(() => {});
  it("Component renders", () => {
    const wrapper = mount(
      <StudyCard pushNotification={mockPushNotification} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
