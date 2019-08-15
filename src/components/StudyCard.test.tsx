/* eslint-disable */
import { mount } from "enzyme";
import StudyCard from "./StudyCard";
import { NotificationProvider } from "./Notification/Notification";
import { UserProvider } from "../context/UserContext";

describe("StudyCard", () => {
  // const mockPushNotification = jest.fn(() => {});
  it("Component renders", () => {
    const wrapper = mount(
      <UserProvider>
        <NotificationProvider>
          <StudyCard />
        </NotificationProvider>
      </UserProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
