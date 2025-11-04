// /* global Bare, BareKit */

const path = require('bare-path')
const { pathToFileURL } = require('bare-url')
const pipe = require('pear-pipe')()
const run = require('pear-run')
const b4a = require('b4a')
const RPC = require('bare-rpc')

const rpc = new RPC(pipe, (req, error) => {
  if (req.command === 0) {
    const request = rpc.request(0)
    request.send('main worker connected')
  }
})

// PROBLEM: need to pass file URL (relative paths resolve inside the pear-run module (eg: /boot.bundle/node_modules/pear-run/app.js))
const subthreadPath = './app.js'
const { href } = pathToFileURL(path.join(__dirname, subthreadPath))

const subThreadPipe = run(href)

subThreadPipe.on('data', (d) => {
  const message = b4a.toString(d)
  console.log(message)
  const request = rpc.request(1)
  request.send(message)
})

subThreadPipe.write('ping')
