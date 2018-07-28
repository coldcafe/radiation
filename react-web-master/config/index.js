const fs = require('fs');
const path = require('path');
const config_dir = path.join(__dirname);

let config;
let local_config = path.join(config_dir, 'local.json');
let default_config = path.join(config_dir, 'config.json');

if (file_exists(local_config)) {
  config = require(local_config);
} else {
  config = require(default_config);
}

module.exports = config;

function file_exists(path) {
  try {
    fs.lstatSync(path);
    return true;
  } catch (e) {
    return false;
  }
}