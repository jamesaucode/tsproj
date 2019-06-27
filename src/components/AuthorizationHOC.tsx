import React, { PureComponent } from "react";
import { SessionProps } from '../../typings/express';
import Unauthorized from "../../src/components/Unauthorized";

interface StateTypes {
  loggedIn: boolean;
  loading: boolean;
}
export const withAuthorization = (WrapperComponent: any) => {
  return class extends PureComponent<SessionProps, StateTypes> {
    constructor(props: SessionProps) {
      super(props);
      this.state = {
        loggedIn: false,
        loading: true,
      };
    }
    componentDidMount() {
      console.log("Mounted a component that requires authorization");
      console.log(this.props);
      try {
        this.setState({
          loggedIn: this.props.session.hasOwnProperty("passport"),
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    render() {
      if (this.state.loggedIn) {
          console.log('User is logged in');
        return (
          <React.Fragment>
            <WrapperComponent {...this.props} />
          </React.Fragment>
        );
      } else {
          console.log('User is not logged in');
        return (
          <React.Fragment>
              <Unauthorized />
          </React.Fragment>
        );
      }
    }
  };
};
