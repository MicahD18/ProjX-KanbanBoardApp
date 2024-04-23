/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CLOSE_MODAL,
  CREATE_BOARD_MODAL,
  CREATE_MODAL,
  DELETE_BOARD_MODAL,
  DELETE_MODAL,
  DELETE_TASK_MODAL,
  EDIT_BOARD_MODAL,
  OPEN_EDIT_MODAL,
  OPEN_VIEW_MODAL,
} from "../actions/modalActions";

export type ModalState = {
  currentModal:
    | "view"
    | "edit"
    | "delete"
    | "create"
    | "edit_board"
    | "delete_task_modal"
    | "delete_board_modal"
    | "create_board"
    | null;
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
    // NEW:
    case DELETE_TASK_MODAL:
      return { ...state, currentModal: "delete_task_modal" };
    // NEW:
    case DELETE_BOARD_MODAL:
      return { ...state, currentModal: "delete_board_modal" };
    case CREATE_MODAL:
      return { ...state, currentModal: "create" };
    case CREATE_BOARD_MODAL:
      return { ...state, currentModal: "create_board" };
    case EDIT_BOARD_MODAL:
      return { ...state, currentModal: "edit_board" };
    case CLOSE_MODAL:
      return { ...state, currentModal: null };
    default:
      return state;
  }
}
