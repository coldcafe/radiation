export const home_route = {
  path: 'home',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(undefined, require('./index').default)
    })
  },
  childRoutes: [
  ]
}