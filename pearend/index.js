// /* global Bare, BareKit */

const path = require('bare-path')
const { pathToFileURL } = require('bare-url')
const pipe = require('pear-pipe')()
const run = require('pear-run')
const b4a = require('b4a')
const RPC = require('bare-rpc')
require('./app')

// setup rpc
const rpc = new RPC(pipe, (req, error) => {
  if (req.command === 0) {
    const request = rpc.request(0)
    request.send('main worker connected')
  }
})

// run a sub-worker localy
const subthreadPath = './app.js'
const { href } = pathToFileURL(path.join(__dirname, subthreadPath)) // use file URL
runSubWorker(href)

// run a sub-worker through link
// const pearlink = 'pear://ojjsxgd3qf7upay877b687p78h8u1k1r4buujkmnbrqowtp6faqo'
// runSubWorker(pearlink)

function runSubWorker(link){
  // start thread
  const pipe = run(link)
  
  pipe.on('data', (d) => {
    const message = b4a.toString(d)
    console.log(message)
    // send response to frontend
    const request = rpc.request(1)
    request.send(message)
  })
  // ping thread to init response
  pipe.write('ping')
  return pipe
}
