# react-web

1. install webpack global:
```javascript
npm install webpack -g
```
2. install other required modules:
```javascript
npm install
```

4. run the server(development server):
```javascript
npm run start
```
5. run the server(production):
Directly execute the npm run prod command.You will get a bundle javascript package.

6. About the config, local.json is not exist in git command, when local.json exist in your project, webpack will bundle the loca.json, or not webpack will bundle the config.json as default setting.So, if you need to develop the code locally, then prepare a local.json configuration file.
