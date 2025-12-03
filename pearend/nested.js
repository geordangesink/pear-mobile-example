// ESM imports dont seem to work
const pipe = require('pear-pipe')()
const run = require('pear-run')

pipe.on('data', (d) => {
    if (d.toString() === 'ping') pipe.write('Local Child worker connected!🧒🔌')
})

const subPipe = run(require.resolve('./double-nested.js'))
subPipe.on('data', (d) => {
    pipe.write(d)
})
subPipe.write('ping')
