export const OPEN_VIEW_MODAL = "OPEN_VIEW_MODAL";
export const OPEN_EDIT_MODAL = "OPEN_EDIT_MODAL";
export const DELETE_MODAL = "DELETE_MODAL";
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

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
