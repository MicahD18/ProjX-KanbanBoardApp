/* eslint-disable @typescript-eslint/no-explicit-any */
import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from "../actions/sidebarActions";

export type ModalState = {
  currentState: boolean;
};

export const initialModalState: ModalState = {
  currentState: false,
};

export default function sidebarReducer(
  state = initialModalState,
  action: any
): ModalState {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return { currentState: true };
    case CLOSE_SIDEBAR:
      return { currentState: false };
    default:
      return state;
  }
}
