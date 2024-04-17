/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CLOSE_MODAL,
  DELETE_MODAL,
  OPEN_EDIT_MODAL,
  OPEN_VIEW_MODAL,
} from "../actions/modalActions";

export type ModalState = {
  currentModal: "view" | "edit" | "delete" | null;
};

export const initialModalState: ModalState = {
  currentModal: null,
};

export default function modalReducer(
  state = initialModalState,
  action: any
): ModalState {
  switch (action.type) {
    case OPEN_VIEW_MODAL:
      return { currentModal: "view" };
    case OPEN_EDIT_MODAL:
      return { ...state, currentModal: "edit" };
    case DELETE_MODAL:
      return { ...state, currentModal: "delete" };
    case CLOSE_MODAL:
      return { ...state, currentModal: null };
    default:
      return state;
  }
}
