import React, { PureComponent, ReactComponentElement, ReactNode } from "react";
import { SessionProps } from '../../typings/express';
import Unauthorized from "../../src/components/Unauthorized";
import { isEmpty } from 'lodash';

interface StateTypes {
  loggedIn: boolean;
  loading: boolean;
}
export const withAuthorization = (WrapperComponent: any) => {
  return class AuthorizeCheck extends PureComponent<SessionProps, StateTypes> {
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
          loggedIn: this.props.session.hasOwnProperty("passport") && !isEmpty(this.props.session.passport)
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
        return <Unauthorized />;
      }
    }
  };
};
