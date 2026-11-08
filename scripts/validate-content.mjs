import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Independent reference fixtures are documented in the in-app sources article.
// Keep this check data-only: no browser, network, or additional test dependency.
async function data(name) {
  const source = await readFile(new URL(`../src/data/${name}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const [{ tarotData: cards }, { sephiroth, paths, worlds }, { zodiacSigns: signs, planets, elements }, { spreads }, { articles }, { glossary }] = await Promise.all([
  'tarotData', 'treeOfLifeData', 'astrologyData', 'spreadsData', 'libraryData', 'glossaryData',
].map(data));
const byId = new Map(cards.map(card => [card.id, card]));
const unique = (values, label) => assert.equal(new Set(values).size, values.length, `Duplicate ${label}`);
const ranks = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const suits = ['Wands', 'Cups', 'Swords', 'Disks'];
assert.equal(cards.length, 78);
unique(cards.map(card => card.id), 'card IDs');
for (const [arcana, count] of [['Major', 22], ['Minor', 40], ['Court', 16]]) {
  assert.equal(cards.filter(card => card.arcana === arcana).length, count, arcana);
}
for (const suit of suits) {
  assert.equal(cards.filter(card => card.suit === suit).length, 14, suit);
  for (const rank of [...ranks, 'knight', 'queen', 'prince', 'princess']) {
    assert.ok(byId.has(`${rank}-of-${suit.toLowerCase()}`), `${rank} of ${suit}`);
  }
}
assert.equal(sephiroth.length, 10);
assert.equal(paths.length, 22);
unique(paths.map(path => path.number), 'path numbers');
unique(paths.map(path => path.cardId), 'path cards');
// [path, endpoints, trump ID, letter, printed number, primary astrology]
const pathTable = [
  [11,1,2,'0-the-fool','א','0','Air'], [12,1,3,'1-the-magus','ב','I','Mercury'],
  [13,1,6,'2-the-high-priestess','ג','II','Moon'], [14,2,3,'3-the-empress','ד','III','Venus'],
  [15,2,6,'17-the-star','ה','XVII','Aquarius'], [16,2,4,'5-the-hierophant','ו','V','Taurus'],
  [17,3,6,'6-the-lovers','ז','VI','Gemini'], [18,3,5,'7-the-chariot','ח','VII','Cancer'],
  [19,4,5,'11-lust','ט','XI','Leo'], [20,4,6,'9-the-hermit','י','IX','Virgo'],
  [21,4,7,'10-fortune','כ','X','Jupiter'], [22,5,6,'8-adjustment','ל','VIII','Libra'],
  [23,5,8,'12-the-hanged-man','מ','XII','Water'], [24,6,7,'13-death','נ','XIII','Scorpio'],
  [25,6,9,'14-art','ס','XIV','Sagittarius'], [26,6,8,'15-the-devil','ע','XV','Capricorn'],
  [27,7,8,'16-the-tower','פ','XVI','Mars'], [28,7,9,'4-the-emperor','צ','IV','Aries'],
  [29,7,10,'18-the-moon','ק','XVIII','Pisces'], [30,8,9,'19-the-sun','ר','XIX','Sun'],
  [31,8,10,'20-the-aeon','ש','XX','Fire'], [32,9,10,'21-the-universe','ת','XXI','Saturn'],
];
for (const [number, from, to, id, letter, numeral, astrology] of pathTable) {
  const path = paths.find(path => path.number === number);
  assert.ok(path, `Missing Path ${number}`);
  assert.deepEqual([path.from,path.to,path.cardId,path.hebrewLetter,path.romanNumeral], [from,to,id,letter,numeral], `Path ${number}`);
  const card = byId.get(id);
  assert.equal(card.number, numeral, id);
  assert.ok(card.hebrewLetter.includes(letter), `${id} letter`);
  assert.ok(path.astrology.includes(astrology) && card.astrology.includes(astrology), `${id} astrology`);
  assert.ok(card.path.includes(`Path ${number} `), `${id} path metadata`);
  const narrative = card.jungianMeaning.match(/\*\*Path (\d+)\*\*,[^\n]+/);
  assert.ok(narrative, `${id} path narrative`);
  assert.equal(Number(narrative[1]), number, `${id} narrative path number`);
  for (const endpoint of [from,to].map(n => sephiroth.find(s => s.number === n).name)) {
    assert.ok(card.path.includes(endpoint) && narrative[0].includes(endpoint), `${id}: ${endpoint}`);
  }
}
for (const [i, seph] of sephiroth.entries()) {
  assert.equal(seph.number, i + 1);
  assert.deepEqual(seph.pipCards, suits.map(suit => `${ranks[i]}-of-${suit.toLowerCase()}`));
  for (const id of seph.pipCards) assert.ok(byId.get(id).path.includes(seph.name), id);
}
const signOrder = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const rulers = ['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
const exaltations = ['Sun','Moon',undefined,'Jupiter',undefined,'Mercury','Saturn',undefined,undefined,'Mars',undefined,'Venus'];
const signElements = ['Fire','Earth','Air','Water'];
const qualities = ['Cardinal','Fixed','Mutable'];
const suitByElement = { Fire:'Wands', Water:'Cups', Air:'Swords', Earth:'Disks' };
const decanRulers = ['Mars','Sun','Venus','Mercury','Moon','Saturn','Jupiter'];
const allDecans = [];
for (const [i, sign] of signs.entries()) {
  assert.equal(sign.name, signOrder[i]);
  assert.equal(sign.element, signElements[i % 4]);
  assert.equal(sign.quality, qualities[i % 3]);
  assert.equal(sign.ruler, rulers[i]);
  assert.equal(sign.exaltation, exaltations[i], `${sign.name} exaltation`);
  const card = byId.get(sign.majorArcana.cardId);
  assert.ok(card?.astrology.includes(sign.name));
  assert.equal(sign.majorArcana.romanNumeral, card.number);
  assert.equal(sign.decans.length, 3);
  for (const [d, decan] of sign.decans.entries()) {
    const ruler = decanRulers[(i * 3 + d) % 7];
    const rank = ranks[1 + (i % 3) * 3 + d];
    const id = `${rank}-of-${suitByElement[sign.element].toLowerCase()}`;
    assert.equal(decan.cardId, id, `${sign.name} decan ${d + 1}`);
    assert.equal(decan.subRuler, ruler, id);
    assert.equal(decan.degrees, `${d * 10}°–${(d + 1) * 10}°`);
    assert.equal(byId.get(id).name, decan.cardName, `${id} title`);
    assert.ok(byId.get(id).astrology.includes(ruler) && byId.get(id).astrology.includes(sign.name), id);
    allDecans.push(id);
  }
}
assert.equal(allDecans.length, 36);
unique(allDecans, 'decan cards');
for (const planet of planets) {
  assert.ok(byId.has(planet.majorArcana.cardId), planet.name);
  assert.equal(planet.majorArcana.romanNumeral, byId.get(planet.majorArcana.cardId).number);
  assert.ok(planet.sephirahNumber === 0 ? planet.sephirah === 'Daath' : sephiroth.some(s => s.number === planet.sephirahNumber && s.name === planet.sephirah));
  if (planet.modern) continue;
  assert.deepEqual(planet.rules, signs.filter(sign => sign.ruler === planet.name).map(sign => sign.name), `${planet.name} rulerships`);
  assert.equal(planet.exaltedIn, signs.find(sign => sign.exaltation === planet.name)?.name, `${planet.name} exaltation`);
}
assert.equal(planets.filter(planet => !planet.modern).length, 7);
for (const [name, element, suit] of [['Atziluth','Fire','Wands'],['Briah','Water','Cups'],['Yetzirah','Air','Swords'],['Assiah','Earth','Disks']]) {
  const world = worlds.find(world => world.name === name);
  assert.deepEqual([world.element,world.suit], [element,suit]);
  assert.deepEqual(world.sephiroth, sephiroth.map(s => s.number), `${name}: complete Tree`);
}
for (const [name, id] of [['Air','0-the-fool'],['Water','12-the-hanged-man'],['Fire','20-the-aeon'],['Earth','21-the-universe']]) {
  assert.equal(elements.find(element => element.name === name).majorArcana?.cardId, id);
}
const courts = [
  ['queen-of-wands','Pisces','Aries'], ['prince-of-disks','Aries','Taurus'],
  ['knight-of-swords','Taurus','Gemini'], ['queen-of-cups','Gemini','Cancer'],
  ['prince-of-wands','Cancer','Leo'], ['knight-of-disks','Leo','Virgo'],
  ['queen-of-swords','Virgo','Libra'], ['prince-of-cups','Libra','Scorpio'],
  ['knight-of-wands','Scorpio','Sagittarius'], ['queen-of-disks','Sagittarius','Capricorn'],
  ['prince-of-swords','Capricorn','Aquarius'], ['knight-of-cups','Aquarius','Pisces'],
];
for (const [id, start, end] of courts) {
  const card = byId.get(id);
  assert.ok(card.astrology.includes(`20° ${signs.find(s => s.name === start).glyph.replaceAll('︎','')} ${start}`), `${id} start`);
  assert.ok(card.astrology.includes(end), `${id} end`);
  const refs = signs.flatMap(sign => sign.courtCards.map(court => ({ ...court, sign:sign.name }))).filter(court => court.cardId === id);
  assert.deepEqual(new Set(refs.map(ref => ref.sign)), new Set([start,end]), `${id} sign links`);
  for (const ref of refs) assert.equal(ref.range, `20° ${start} – 20° ${end}`, id);
}
for (const spread of spreads) {
  assert.equal(spread.positions.length, spread.cardCount, spread.id);
  unique(spread.positions.map(pos => pos.number), `${spread.id} positions`);
  for (const pos of spread.positions) {
    assert.ok(pos.x - 35 >= 0 && pos.x + 35 <= spread.svgWidth, `${spread.id} horizontal bounds`);
    assert.ok(pos.y - 52.5 >= 0 && pos.y + 52.5 <= spread.svgHeight, `${spread.id} vertical bounds`);
  }
}
unique(articles.map(article => article.id), 'article IDs');
// Validate every explicit internal content link, including the special Daath route.
for (const match of JSON.stringify({cards,sephiroth,paths,worlds,signs,planets,elements,spreads,articles,glossary}).matchAll(/(?:"|\]\()(\/(?:tarot|library|tree-of-life|astrology)[^\s"'<>\\]*)/g)) {
  const url = new URL(match[1].replace(/[).,;]+$/, ''), 'https://tarot.invalid');
  const [section, id] = url.pathname.slice(1).split('/');
  if (section === 'tarot' && id) assert.ok(byId.has(id), `Missing card: ${url.pathname}`);
  if (section === 'library' && id) assert.ok(articles.some(a => a.id === id), `Missing article: ${url.pathname}`);
  if (section === 'tree-of-life' && url.searchParams.has('id')) {
    const kind = url.searchParams.get('view');
    const n = Number(url.searchParams.get('id'));
    assert.ok((kind === 'path' ? paths : sephiroth).some(item => item.number === n), `Invalid Tree link ${url}`);
  }
}
console.log('Content verified: 78 cards, 22 paths, 36 decans, 12 court ranges, 7 classical planets, 4 complete Worlds, spreads and internal data links.');
