import DynamicTypes from "./Types";
// import DataCalls from "../DataCalls";

export const UpdateData = (componentName = "", componentData = {}) => (
  dispatch,
  getState
) => {
  dispatch({
    type: DynamicTypes.AddDataInComponent,
    data: {
      componentName,
      loadData: componentData,
    },
  });
};

export const UpdateError = (componentName = "", componentData = {}) => (
  dispatch,
  getState
) => {
  dispatch({
    type: DynamicTypes.AddErrorInComponent,
    data: {
      componentName,
      errorData: componentData,
    },
  });
};

export const ToggleLoader = (componentName = "") => (dispatch, getState) => {
  dispatch({
    type: DynamicTypes.ToggleLoaderInComponent,
    data: { componentName },
  });
};

export const CallAPI = (componentName = "", apiMappingName = "") => (
  dispatch,
  getState
) => {
  console.log("GetState", getState());
  dispatch(ToggleLoader(componentName));
  Promise.resolve({
    payload: [{ name: "a" }, { name: "b" }],
  })
    .then((data) => {
      dispatch(UpdateData(componentName, data));
      dispatch(ToggleLoader(componentName));
    })
    .catch((Errr) => {
      dispatch(ToggleLoader(componentName));
      console.error(Errr);
    });
};
