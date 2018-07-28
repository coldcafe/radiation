import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects'
import axios from 'axios'

import { HomeChildSaga } from '../routes/home_child/models/saga'

function* RootSaga() {
  yield fork(HomeChildSaga)
}

export default RootSaga