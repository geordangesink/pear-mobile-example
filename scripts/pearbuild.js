const Hyperswarm = require('hyperswarm')
const crypto = require('hypercore-crypto')
const build = require('pear-mobile/build')
const plink = require('pear-link')

// const swarm = new Hyperswarm()
// Pear.teardown(() => {swarm.destroy()})

async function main (){
    const builder = await build()
    const links = builder.bundleOrder

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
