export const ColorReducer = (state = 'black', action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      state = action.payload;
      break;
    default:
      return state;
  }
  return state;
};
