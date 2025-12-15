const Hyperswarm = require('hyperswarm')
const crypto = require('hypercore-crypto')
const build = require('pear-mobile/build')
const { bundle } = require('pear-mobile/build')
const path = require('bare-path')
const plink = require('pear-link')
console.log(bundle)
// const swarm = new Hyperswarm()
// Pear.teardown(() => {swarm.destroy()})

async function main (){
    const builder = await build()
    const links = builder.bundleOrder

    const rootDir = path.resolve('./')
const entryPath = path.join(rootDir, 'pearend', 'index.js')
const targetPath = path.join(rootDir, 'app', 'index.bundle.js')
bundle(entryPath, targetPath)

// links.forEach((link) => {
//     const {drive} = plink.parse(link)

//     const topic = crypto.discoveryKey(drive.key)
//     swarm.on('connection', async (conn) => {
//         console.log('connected to worker', link)
//         conn.on('update', (d) => {
//             console.log('got data', d)
//         })
//     })
//     swarm.join(topic, {server:false, client:true})
// })
}
main()
