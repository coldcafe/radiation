import { createAction, handleAction, createActions, handleActions, combineActions } from 'redux-actions';

const initial_state = {};

export const UPDATE_HOME_CHILD = 'home_child/update_home_child';

export const FETCH_SERVER_DATA = 'home_child/fetch_server_data';
export const fetch_server_data = createAction(FETCH_SERVER_DATA);

export const { updateHomeChild } = createActions({
  UPDATE_HOME_CHILD: (data) => {
    return data;
  }
});

export const home_child_reducer = handleActions({
  [updateHomeChild] (state, action) {
    return Object.assign({}, state, action.payload);
  }
}, initial_state);