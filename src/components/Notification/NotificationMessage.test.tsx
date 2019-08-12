/* eslint-disable */
import { mount } from "enzyme";
import NotificationMessage from "./NotificationMessage";

describe("Notifcation Message", () => {
    it("Render Component", () => {
        const wrapper = mount(
          <NotificationMessage message="lmao" success={true} id="random" />,
        );
        expect(wrapper).toMatchSnapshot();
    });
});