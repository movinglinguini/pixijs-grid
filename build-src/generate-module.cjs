const fs = require('fs');

const className = 'PixiJSGrid';
let contents = fs.readFileSync('src/pixijs-grid.js', 'utf-8');
contents += `export { ${className} };`;
fs.writeFileSync('src/pixijs-grid.mjs', contents, 'utf-8');
