import { HomeChild } from './index';
export const home_child_route = {
  path: 'home_child',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(undefined, require('./index').HomeChild)
    })
  }
}