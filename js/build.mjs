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

// create combined mjs file:
let combinedMJS = "const theds = {\n";

for (const section in theds) {
	combinedMJS += "    "+section+": {\n"
	for (const part in theds[section]) {
		switch (typeof theds[section][part]) {
			case 'string':
				combinedMJS += "        '"+part+"': `"+theds[section][part]+"`,\n"
			break;
			case 'function':
				combinedMJS += "        '"+part+"': "+theds[section][part]+",\n"
			break;
			case 'object':
				combinedMJS += "        '"+part+"': "+JSON.stringify(theds[section][part])+",\n"
			break;
			default:
				console.log('unknown type',section,part,typeof theds[section][part])
			break;
		}
	}
	combinedMJS += "    },\n"
}
combinedMJS += "}\n"
combinedMJS += `
	export default theds
	if (!globalThis.theds) {
		globalThis.theds = theds
	}
`
fs.writeFileSync(process.cwd()+'/dist/theds.mjs', combinedMJS, 'utf-8')

await Bun.build({
 	entrypoints: ['./dist/theds.mjs'],
 	outdir: './dist/',
 	format: 'iife'
})
console.log('Bun done')