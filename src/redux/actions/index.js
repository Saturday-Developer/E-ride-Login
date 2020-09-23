import axios from 'axios';
export const setNewColor = val => {
  return {
    type: 'CHANGE_COLOR',
    payload: val,
  };
};

export const getNewColor = () => {
  return dispatch => {
    return axios.get('http://www.colr.org/json/color/random').then(response => {
      console.log(response);
      dispatch(setNewColor('#' + response.data.new_color));
      console.log(response.data.new_color);
    });
  };
};

export const saveNumber = number => {
  return {
    type: 'SAVE_NUMBER',
    payload: number,
  };
};
