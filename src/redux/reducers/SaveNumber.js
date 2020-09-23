export const SaveNumberReducer = (number = {}, action) => {
  switch (action.type) {
    case 'SAVE_NUMBER':
      number = action.payload;
      console.warn(number);
      break;
    default:
      return number;
  }
  return number;
};
