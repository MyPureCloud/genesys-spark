function getDeployVersion() {
  return require('../package.json').version;
}

module.exports = {
  getDeployVersion: getDeployVersion
};
