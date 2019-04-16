const fs = require('fs');
const entry = {};

function getEntry(pagePath) {
  let files = fs.readdirSync(pagePath);
  files.forEach((file,index) => {
    if(file.indexOf('.js') != -1) {
      let path = `${pagePath}/${file}`;
      let chunkName = file.split('.js')[0];
      entry[chunkName] = path;
    }
  })
  return { entry }
}
module.exports = getEntry;
