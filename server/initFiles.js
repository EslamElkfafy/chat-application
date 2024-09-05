import fs from "fs"

const createFileIfNotExist = (filename, initValue) => {
    try {
        if (!fs.existsSync(filename)) {
            fs.writeFileSync(filename, JSON.stringify(initValue))
        }
    } catch(e) {
        console.error(e)
    }
}
export default () => {
    createFileIfNotExist("abbreviations.json", {})
    createFileIfNotExist("emojis.json", {})
    createFileIfNotExist("filter.json", [])
    createFileIfNotExist("welcomedailymessages.json", [])
}