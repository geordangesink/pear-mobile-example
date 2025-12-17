const Hyperswarm = require('hyperswarm')
const crypto = require('bare-crypto')
const build = require('pear-mobile')
const { bundle } = require('pear-mobile')
const path = require('bare-path')
const plink = require('pear-link')
const fs = require('bare-fs')
const os = require('bare-os')
// TODO: npm i react-native-bare-kit (needs to be in package.json deps)

const pearendsPath = path.join(os.cwd(), 'pearends')
const bundlesPath = path.join(os.cwd(), '.pear', 'bundles')

async function main (){
    await build()
    const pearends = (await fs.readdir(pearendsPath, { withFileTypes: true })).filter((app) => app.isDirectory())
    for (const app of pearends) {
        const appPath = path.join(app.parentPath, app.name)
        const pkgPath = path.join(appPath, 'package.json')
        if (!await fs.exists(pkgPath)) throw new Error(`pearend "${app.name}" needs a package.json`)
        const pkgContent = await fs.readFile(pkgPath, 'utf8')
        const pkg = JSON.parse(pkgContent)
        const entry = pkg.main ?? 'index.js'
        const entryPath = path.join(appPath, entry)
        const targetPath = path.join(bundlesPath , `${crypto.createHash('sha256').update(app.name).digest('hex')}.bundle.js`)
        const basePath = await fs.exists(path.join(appPath, 'node_modules')) ? appPath : os.cwd()
        bundle(entryPath, targetPath, basePath)
    }
}
main()
