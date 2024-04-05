const initialState = {
  data: null,
};
// 3. Reducer handles the "SET_SELECTED_BOARD" action, by updating the state.data
// with the new action.payload
export default function selectedBoardReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED_BOARD":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
