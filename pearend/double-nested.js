const pipe = require('pear-pipe')()

pipe.on('data', (d) => {
    if (d.toString() === 'ping') {
        pipe.write('Deeply Local Child worker connected!🧒🔌')
        console.log()
    }
})
