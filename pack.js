const fs = require('fs');
const archiver = require('archiver');

const zip = archiver('zip', { zlib: { level: 9 } });

console.log('Reading manifest.json file...');
const manifest = JSON.parse(fs.readFileSync(__dirname + '/manifest.json'));
console.log(`Version: ${manifest.meta.version}`)

const filename = `${manifest.meta.version}-${new Date().toISOString()}.zip`;
console.log(`Creating pack: ${filename}`);

const output = fs.createWriteStream(__dirname + '/packs/' + filename);

output.on('close', function () {
  console.log(zip.pointer() + ' total bytes written');
});

zip.pipe(output);

console.log('Adding css folder');
zip.directory('css');

console.log('Adding dist folder');
zip.directory('dist');

console.log('Adding icons folder');
zip.directory('icons');

console.log('Adding img folder');
zip.directory('img');

console.log('Adding manifest.json');
zip.file('manifest.json');

console.log('Saving...');
zip.finalize();
