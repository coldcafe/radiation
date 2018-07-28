import { call, put, takeEvery, takeLatest, take, fork } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_SERVER_DATA, updateHomeChild } from './reducer';

export function* HomeChildSaga() {
  yield fork(getServerData);
}

function* getServerData() {
  while (true) {
    yield take(FETCH_SERVER_DATA);
    const res = yield axios.get(`/get_data`);
    yield put(updateHomeChild({ server_data: res.data }));
  }
}