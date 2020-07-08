import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "./actions";

export default function ReduxHOC(WrappedComponent, Name = "default") {
  return connect(
    (state) => ({ dynamicData: state.dynamicData }),
    (dispatch) => ({
      reduxActions: bindActionCreators(Actions, dispatch),
    })
  )(function WrapperCompnent(wrapperProps) {
    const { dynamicData, reduxActions } = wrapperProps;
    const componentName =
      WrappedComponent.displayName ||
      WrappedComponent.name ||
      Name ||
      "default";
    const componentData = dynamicData[componentName] || {
      data: {},
      error: {},
      loading: false,
    };
    let injectedprops = {
      data: componentData.data,
      error: componentData.error,
      loading: componentData.loading,
      updateData: (newData = {}) => {
        reduxActions.UpdateData(componentName, newData);
      },
      updateError: (error = {}) => {
        console.error(`Error in ${componentName}`, error);
        reduxActions.UpdateError(componentName, error);
      },
      toggleLoader: () => {
        reduxActions.ToggleLoader(componentName);
      },
      callAPI: (name = "") => {
        console.log(`Calling API ${name} and then updating the Data`);
        reduxActions.CallAPI(componentName, name);
      },
    };
    let toBePassedProps = { ...wrapperProps };
    delete toBePassedProps.dynamicData;
    delete toBePassedProps.reduxActions;

    const combinedProps = Object.assign({}, toBePassedProps, injectedprops);
    return (
      <>
        <WrappedComponent {...combinedProps} />
      </>
    );
  });
}
