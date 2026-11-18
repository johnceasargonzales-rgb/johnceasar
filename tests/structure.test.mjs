import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (p) => readFileSync(join(root, p), 'utf8');

test('all required pages and scene assets exist', () => {
  for (const p of [
    'app/page.tsx', 'app/explore/page.tsx', 'app/culture/page.tsx', 'app/plan/page.tsx',
    'app/credits/page.tsx', 'app/destinations/[slug]/page.tsx', 'app/layout.tsx',
    'public/scenes/islands.svg', 'public/scenes/lighthouse.svg', 'public/scenes/springs.svg',
    'public/sw.js', 'public/offline.html', 'public/manifest.webmanifest'
  ]) assert.ok(existsSync(join(root, p)), `${p} should exist`);
});

test('content includes each of the three requested destinations', () => {
  const data = read('lib/destinations.ts');
  for (const name of ['Hundred Islands','Cape Bolinao Lighthouse','Balungao Hot Springs']) assert.ok(data.includes(name));
});

test('data-saving CSS does not download scenic SVG backgrounds', () => {
  const css = read('app/globals.css');
  assert.match(css, /html\[data-mode="low"\] \.visual:before\{background-image:none!important\}/);
  assert.ok(!read('public/sw.js').includes("'/scenes/islands.svg',"), 'No scene prefetch in service worker');
});

test('privacy, source credits, and accessibility features present', () => {
  assert.match(read('app/layout.tsx'), /skip-link/);
  assert.match(read('components/destination-explorer.tsx'), /aria-pressed/);
  assert.match(read('components/save-button.tsx'), /localStorage/);
  assert.match(read('app/credits/page.tsx'), /educational Next\.js tourism concept/);
});

test('app metadata and JSON config parse', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.ok(pkg.dependencies.next);
  JSON.parse(read('public/manifest.webmanifest'));
  assert.match(read('app/layout.tsx'), /metadataBase/);
});


test('all three destinations have optimized local visual assets and source statements', () => {
  for (const slug of ['hundred-islands', 'cape-bolinao-lighthouse', 'balungao-hot-springs']) {
    for (const size of [720, 1280]) {
      const p = join(root, `public/photos/${slug}-${size}.webp`);
      assert.ok(existsSync(p), `${p} should exist`);
      const magic = readFileSync(p).subarray(0, 12);
      assert.equal(magic.toString('ascii', 0, 4), 'RIFF');
      assert.equal(magic.toString('ascii', 8, 12), 'WEBP');
    }
  }
  const css = read('app/globals.css');
  assert.match(css, /image-set\(url\('\/photos\/hundred-islands-720\.webp'\)/);
  assert.match(css, /image-set\(url\('\/photos\/cape-bolinao-lighthouse-720\.webp'\)/);
  assert.match(css, /image-set\(url\('\/photos\/balungao-hot-springs-720\.webp'\)/);
  assert.match(read('app/credits/page.tsx'), /not authentic photographs/);
});
