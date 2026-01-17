import theds from './theds.mjs'
import fs from 'node:fs'

// bun only knows the filename of the css files, it doesn't actually load them
// so do that manually here
for (let entry in theds.css) {
	const contents = fs.readFileSync(theds.css[entry], 'utf-8')
	theds.css[entry] = contents
}

const sheet = await theds.actions.dsBuildSheet.call(theds)
fs.writeFileSync(process.cwd()+'/dist/theds.css', sheet, 'utf-8')
console.log('build done: '+sheet.split("\n").length+' lines')