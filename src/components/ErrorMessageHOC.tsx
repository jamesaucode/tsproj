import React, { Component } from "react";

const ErrorMessage = (props: any) => {
  if (props.show) {
    return (
      <React.Fragment>
        <p>{props.text}</p>
      </React.Fragment>
    );
  } else {
    return null;
  }
};
export const withErrorMessage = (WrapperComponent : any) => {

  return class extends Component {
    componentDidMount() {
      console.log("Mounted a component with error message");
    }
    render() {
      return (
        <React.Fragment>
          <ErrorMessage show={true} text={"ERROR!"} /> 
          <WrapperComponent {...this.props} />
        </React.Fragment>
      )
    }
  }
}