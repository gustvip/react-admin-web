const fs = require('fs')
fs.readdir('../__tests__', (err, files) => {
  console.log(files)
})