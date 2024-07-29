const process = require("node:process")
if (!["make", "start"].includes(process.argv[2])) {
  console.error("Invalid Usage!")
  console.log("usage: node forge.build.js [make|start]")
  process.exit(1) 
}

const { execSync } = require("node:child_process")
const fs = require("fs")

const package_str = fs.readFileSync("./package.json", { encoding: "utf8" })
const package_json = JSON.parse(package_str)

const oldMain = "node_modules/expo/AppEntry.js"
package_json.main = "resources/js/electron.js"
fs.writeFileSync("./package.json", JSON.stringify(package_json))

console.log(`\x1b[35m > Executing 'npm electron-forge ${process.argv[2]}'...\x1b[0m`)
console.warn("  - it may take a while...")

const stdout = execSync(`npx electron-forge ${process.argv[2]}`, { encoding: "utf8" })
console.log(stdout)

console.log("\x1b[35m > recovering package.json...\x1b[0m")
package_json.main = oldMain
fs.writeFileSync("./package.json", JSON.stringify(package_json))

console.log("\x1b[35m > reformatting package.json...\x1b[0m")
execSync(`npx prettier ./package.json --write`)

console.log("\x1b[32m - exited. \x1b[0m")

