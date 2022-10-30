import { createContext, useContext, useReducer } from "react";
import { initialState, AppState } from "./initialState";
import { Action } from "./reducerActions";

type DispatchActionType = (arg0: Action) => void;

type StateContextType = [AppState, DispatchActionType];

export const StateContext = createContext<StateContextType>([
  initialState,
  () => {},
]);

interface StateProviderType {
  reducer: React.Reducer<AppState, Action>;
  initialState: AppState;
  children: React.ReactNode;
}

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: StateProviderType) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
