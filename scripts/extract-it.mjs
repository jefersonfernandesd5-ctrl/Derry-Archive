/* Extrai de index.html só o que as páginas /it, /pennywise e /derry mostram.
   Rode: node scripts/extract-it.mjs */
import fs from 'fs';
import vm from 'vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function sliceConst(name, next) {
  const start = html.indexOf('const ' + name + ' = ');
  const end = html.indexOf('const ' + next + ' = ');
  if (start < 0 || end < 0 || end <= start) throw new Error('não achei ' + name);
  return html.slice(start, end).trim().replace(/;\s*$/, '');
}

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(
  sliceConst('WORKS', 'ADAPTS') + ';\n' +
  sliceConst('ADAPTS', 'UNIVERSES') + ';\n' +
  sliceConst('UNIVERSES', 'BIO') + ';\n' +
  'this.WORKS = WORKS; this.ADAPTS = ADAPTS; this.UNIVERSES = UNIVERSES;',
  sandbox
);

const mapMatch = html.match(/derry:\s*\{[^}]*pts:\s*(\[[\s\S]*?\])\s*\}/);
if (!mapMatch) throw new Error('mapa de Derry não encontrado');
const places = vm.runInNewContext(mapMatch[1]).map(function (p) { return p[0]; });

const pick = function (x) {
  return {
    id: x.id, t: x.t, pt: x.pt || '', y: x.y, k: x.k,
    s: x.s || '', g: x.g || [], on: x.on || '', d: x.d || '',
    st: x.st || '', src: x.src || []
  };
};

const derryIds = new Set(
  sandbox.WORKS.filter(function (w) { return (w.u || []).includes('derry'); }).map(function (w) { return w.id; })
);
const universe = sandbox.UNIVERSES.find(function (u) { return u.id === 'derry'; });
const novel = sandbox.WORKS.find(function (w) { return w.id === 'it'; });
const books = sandbox.WORKS.filter(function (w) { return derryIds.has(w.id); }).map(pick);
const adaptations = sandbox.ADAPTS.filter(function (a) {
  return (a.src || []).some(function (id) { return id === 'it' || derryIds.has(id); });
}).map(pick);

const data = {
  revisao: 'novembro de 2026',
  novel: pick(novel),
  universe: { id: universe.id, n: universe.n, sub: universe.sub, d: universe.d },
  books: books,
  adaptations: adaptations,
  map: {
    title: 'Mapa de Derry',
    note: 'Mapa ilustrado e esquemático, feito por fãs: as posições dos locais são aproximadas.',
    places: places
  }
};

const json = JSON.stringify(data, null, 2);
fs.writeFileSync(new URL('../data/it.json', import.meta.url), json + '\n');
fs.writeFileSync(
  new URL('../assets/it-data.js', import.meta.url),
  '/* Gerado por scripts/extract-it.mjs a partir da enciclopédia. Não edite à mão. */\nwindow.IT_DATA = ' + json + ';\n'
);
console.log('obras', books.length, 'adaptações', adaptations.length, 'locais', places.length);
