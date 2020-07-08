import DynamicTypes from "./Types";
const baseComponentData = {
  error: {},
  data: {},
  loading: false,
};

export default (state = {}, action) => {
  switch (action.type) {
    case DynamicTypes.CreateComponentData:
    case DynamicTypes.DeleteComponentData: {
      const { componentName } = action.data;
      return Object.assign({}, state, { [componentName]: baseComponentData });
    }
    case DynamicTypes.UpdateComponentData: {
      const { componentName, updatedData } = action.data;
      let componentData = Object.assign(
        {},
        baseComponentData,
        state[componentName],
        updatedData
      );
      return Object.assign({}, state, { [componentName]: componentData });
    }
    case DynamicTypes.AddDataInComponent: {
      const { componentName, loadData } = action.data;
      let componentData = Object.assign(
        {},
        baseComponentData,
        state[componentName],
        { data: loadData }
      );
      return Object.assign({}, state, { [componentName]: componentData });
    }
    case DynamicTypes.AddErrorInComponent: {
      const { componentName, errorData } = action.data;
      let componentData = Object.assign(
        {},
        baseComponentData,
        state[componentName],
        { error: errorData }
      );
      return Object.assign({}, state, { [componentName]: componentData });
    }
    case DynamicTypes.ToggleLoaderInComponent: {
      const { componentName } = action.data;
      let componentData = Object.assign(
        {},
        baseComponentData,
        state[componentName]
      );
      return Object.assign({}, state, {
        [componentName]: { ...componentData, loading: !componentData.loading },
      });
    }
    default:
      return state;
  }
};
