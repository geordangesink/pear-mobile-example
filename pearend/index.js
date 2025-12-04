// /* global Bare, BareKit */
const pipe = require('pear-pipe')()
const run = require('pear-run')
const b4a = require('b4a')
const RPC = require('bare-rpc')

// setup rpc to frontend
const rpc = new RPC(pipe, (req, error) => {
  if (req.command === 0) {
    const request = rpc.request(0)
    request.send('Main worker connected!\n👷🔌')
  } 
})

runSubWorker(require.resolve('./nested.js'))

async function runSubWorker(link){
  const pipe = await run(link)

  pipe.on('data', (d) => {
    const message = b4a.toString(d)
    console.log(message) // -> see log in terminal with: log stream --level debug --predicate "subsystem == 'bare'" 
    // send response to frontend
    const request = rpc.request(0)
    request.send(message)
  })
  // ping thread to init response
  pipe.write('ping')
  return pipe
}
