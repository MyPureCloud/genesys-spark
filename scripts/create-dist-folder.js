const fs = require('fs');

try {
  fs.cpSync('./packages/genesys-spark-components/dist', './dist', {
    recursive: true
  });
} catch (error) {
  console.log(error.message);
}

try {
  fs.cpSync('./packages/genesys-spark-chart-components/dist', './dist/chart', {
    recursive: true
  });
} catch (error) {
  console.log(error.message);
}
