const fs = require('fs')
const path = require('path')
const src = "./src/extension/"
const dst = "./dist"
fs.readdirSync(src).forEach(file => {
    let srcPath = path.join(src, file)
    let dstPath = path.join(dst, file)
    fs.copyFileSync(srcPath, dstPath)
    console.log(`Copy: ${srcPath} => ${dstPath}`)
})

const manifestRaw = fs.readFileSync("./extension-manifest.json", "utf-8")
const manifest = JSON.parse(manifestRaw)

const pkgRaw = fs.readFileSync("./package.json", "utf-8")
const pkg = JSON.parse(pkgRaw)

verExt = pkg["version"]
if (verExt.startsWith("v")) verExt = verExt.slice(1)
if (verExt.includes("-")) verExt = verExt.split("-")[0]
manifest["version"] = `${verExt}.${pkg["ext_build"]}`
manifest["version_name"] = pkg["version"]

fs.writeFileSync("./dist/manifest.json", JSON.stringify(manifest), "utf-8")
console.log("Write: manifest.json")
