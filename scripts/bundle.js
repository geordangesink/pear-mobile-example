const pack = require('bare-pack-drive')
const { resolve } = require('bare-module-traverse')
const Localdrive = require('localdrive')
const os = require('bare-os')
const path = require('bare-path')

async function bundle() {
    console.log(os.cwd())
    const pathname = path.join(os.cwd())
    const target = ['android', 'ios']
    const builtins = [
    'electron', 'net', 'assert', 'console', 'events', 'fs', 'fs/promises', 'http', 'https', 'os',
    'path', 'child_process', 'repl', 'url', 'tty', 'module', 'process', 'timers', 'inspector'
  ]
  const drive = new Localdrive(pathname)
  const bundle = await pack(drive, '/pearend/index.js', { target, builtins, resolve: resolve.node })
  await drive.put('./app/app.bundle.js', bundle.toBuffer())
}

bundle()