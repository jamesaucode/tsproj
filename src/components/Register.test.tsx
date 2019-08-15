/* eslint-disable */
import { mount } from "enzyme";
import Register from "./Register";
import { NotificationProvider } from "./Notification/Notification";

describe("Register", () => {
  const fakeOnClick = jest.fn(() => {});
  it("Component renders", () => {
    const wrapper = mount(
      <NotificationProvider>
        <Register toggleForm={fakeOnClick} />
      </NotificationProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
