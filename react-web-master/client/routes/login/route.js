import  {LoginForm}  from './index';
export const login_route = {
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(undefined, require('./index').LoginForm)
    })
  }
}