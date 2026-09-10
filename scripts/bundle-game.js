const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '../public/games/bat-escape/js');
const files = [
  'storage.js',
  'audio.js',
  'particles.js',
  'player.js',
  'difficulty.js',
  'world.js',
  'rewards.js',
  'obstacles.js',
  'ui.js',
  'game.js',
];

let bundle = '/* Bat Escape Unified Bundle - Standalone & Browser Safe */\n(() => {\n';

for (const file of files) {
  const filePath = path.join(jsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip imports
  content = content.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');

  // Replace export const / export class / export function with normal declarations
  content = content.replace(/export\s+(const|let|var|class|function)/g, '$1');
  content = content.replace(/export\s+default\s+/g, '');
  content = content.replace(/export\s*\{[\s\S]*?\};?/g, '');

  bundle += `\n// ==================== ${file} ====================\n` + content + '\n';
}

bundle += '\n})();\n';

const outPath = path.join(__dirname, '../public/games/bat-escape/game-bundle.js');
fs.writeFileSync(outPath, bundle, 'utf8');
console.log('Built game-bundle.js successfully at:', outPath);

