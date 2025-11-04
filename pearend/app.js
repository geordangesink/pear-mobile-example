import pearPipe from 'pear-pipe'
const pipe = pearPipe()

pipe.on('data', (d) => {
    if (d.toString() === 'ping') pipe.write('response from sub-thread')
})
