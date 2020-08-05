const prereleaseRegex = /-(alpha|beta)\.\d+$/;

function getDeployVersion() {
  const packageVersion = require('../package.json').version;
  if (prereleaseRegex.test(packageVersion)) {
    return packageVersion.replace(prereleaseRegex, '-$1');
  } else {
    return packageVersion;
  }
}

module.exports = {
  getDeployVersion: getDeployVersion
};
