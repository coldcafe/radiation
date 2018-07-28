import {combineReducers} from 'redux';
import test from './test';
import { home_child_reducer } from '../routes/home_child/models/reducer';

export default combineReducers({
  test: test,
  home_child: home_child_reducer
});