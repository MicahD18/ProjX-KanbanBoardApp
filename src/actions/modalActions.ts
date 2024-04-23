// TASKS
export const OPEN_VIEW_MODAL = "OPEN_VIEW_MODAL";
export const OPEN_EDIT_MODAL = "OPEN_EDIT_MODAL";
export const DELETE_MODAL = "DELETE_MODAL";
// NEW:
export const DELETE_TASK_MODAL = "DELETE_TASK_MODAL";
// NEW:
export const DELETE_BOARD_MODAL = "DELETE_BOARD_MODAL";
export const CREATE_MODAL = "CREATE_MODAL";
// BOARDS
export const EDIT_BOARD_MODAL = "EDIT_BOARD_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openViewModal = () => {
  return {
    type: OPEN_VIEW_MODAL,
  };
};

export const openEditModal = () => {
  return {
    type: OPEN_EDIT_MODAL,
  };
};

export const openDeleteModal = () => {
  return {
    type: DELETE_MODAL,
  };
};

// NEW:
export const openDeleteTaskModal = () => {
  return {
    type: DELETE_TASK_MODAL,
  };
};

// NEW:
export const openDeleteBoardModal = () => {
  return {
    type: DELETE_BOARD_MODAL,
  };
};

export const openCreateModal = () => {
  return {
    type: CREATE_MODAL,
  };
};

export const openEditBoardModal = () => {
  return {
    type: EDIT_BOARD_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
