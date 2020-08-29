
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const glob = require('glob')

require('@babel/register')

if (!argv._ || !argv._.length) {
  console.log('Please supply a file glob')
  process.exit(1)
}

glob(argv._[0], (err, files) => {
  if (err) {
    throw new Error(err)
  }

  for (const file of files) {
    const filepath = path.join(process.cwd(), file)
    console.log('Requiring', filepath)
    require(filepath)
  }
})
