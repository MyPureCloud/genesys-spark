const fs = require('fs');

const target = process.argv[2];
try {
  fs.cpSync(`./devops/${target}/pipeline.d`, './pipeline.d', {
    recursive: true
  });
} catch (error) {
  console.log(error.message);
}
