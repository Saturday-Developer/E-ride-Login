import {combineReducers} from 'redux';
import {ColorReducer} from './ColorReducer';
import {SaveNumberReducer} from './SaveNumber';

export default combineReducers({
  ColorReducer,
  SaveNumberReducer,
});
