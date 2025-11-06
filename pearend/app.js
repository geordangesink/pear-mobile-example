// ESM imports dont seem to work
const pipe = require('pear-pipe')()

pipe.on('data', (d) => {
    if (d.toString() === 'ping') pipe.write('response from sub-thread')
})
