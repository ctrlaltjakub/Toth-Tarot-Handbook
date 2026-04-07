// ============================================
// Astrology Data — Zodiac, Planets, Decans
// ============================================

export interface ZodiacSign {
  name: string;
  glyph: string;
  element: 'Fire' | 'Water' | 'Air' | 'Earth';
  quality: 'Cardinal' | 'Fixed' | 'Mutable';
  ruler: string;
  rulerGlyph: string;
  exaltation?: string;
  exaltationGlyph?: string;
  majorArcana: { cardId: string; cardName: string; romanNumeral: string };
  decans: Decan[];
  courtCards: { cardId: string; cardName: string; range: string }[];
  colorVar: string;
  description: string;
}

export interface Decan {
  degrees: string;
  subRuler: string;
  subRulerGlyph: string;
  cardId: string;
  cardName: string;
}

export interface Planet {
  name: string;
  glyph: string;
  sephirah: string;
  sephirahNumber: number;
  rules: string[];
  exaltedIn?: string;
  majorArcana: { cardId: string; cardName: string; romanNumeral: string };
  description: string;
}

export interface ElementEntry {
  name: string;
  symbol: string;
  suits: string;
  majorArcana?: { cardId: string; cardName: string; romanNumeral: string };
  signs: string[];
  colorVar: string;
  description: string;
}

// ============================================
// The 12 Zodiac Signs
// ============================================

export const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries', glyph: '♈︎', element: 'Fire', quality: 'Cardinal',
    ruler: 'Mars', rulerGlyph: '♂', exaltation: 'Sun', exaltationGlyph: '☉',
    colorVar: '--color-fire',
    majorArcana: { cardId: '4-the-emperor', cardName: 'The Emperor', romanNumeral: 'IV' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Mars', subRulerGlyph: '♂', cardId: 'two-of-wands', cardName: 'Two of Wands — Dominion' },
      { degrees: '10°–20°', subRuler: 'Sun', subRulerGlyph: '☉', cardId: 'three-of-wands', cardName: 'Three of Wands — Virtue' },
      { degrees: '20°–30°', subRuler: 'Venus', subRulerGlyph: '♀', cardId: 'four-of-wands', cardName: 'Four of Wands — Completion' },
    ],
    courtCards: [
      { cardId: 'queen-of-wands', cardName: 'Queen of Wands', range: '20° Pisces – 20° Aries' },
      { cardId: 'prince-of-disks', cardName: 'Prince of Disks', range: '20° Aries – 20° Taurus' },
    ],
    description: `Aries (March 21 – April 19) is Cardinal Fire, the first sign of the zodiac and the beginning of Spring — pure will thrusting outward into manifestation, the most initiating of all configurations.

- **Body:** Rules the head and face — the body's leading edge and seat of identity
- **Symbol:** The Ram does not negotiate; it lowers its head and charges with full bodily force, the perfect emblem for unmediated forward thrust. Sacred to the Father-gods of antiquity (Amoun-Ra in Egypt, the God of Spring) because the spring equinox marked the solar year's beginning, the Father principle reasserting itself over winter darkness
- **Glyph:** Two curved lines rising and splitting outward — the Ram's horns, a force erupting upward into space
- **Character:** Pioneer, warrior, self-starter — impatient, direct, fearless, acting first and reflecting later
- **Shadow:** The Hero inflated — will that cannot receive, the I AM that becomes I AM ALONE

**Rulership & Exaltation:**
- **Mars rules** because both operate on the same frequency: directed, outward-moving force seeking the shortest path to its target — Mars in Aries is Mars at home, no subtlety, no strategy, no delay
- **Sun exalted** because this is where solar energy is most dynamic: the spring equinox, the moment of triumphant re-emergence — not the sustained fullness of Leo but the explosive first assertion, heroic world-creating solar power at its purest

**Decans — The Arc of Will:**
- **0°–10° ♂ Two of Wands — Dominion** — raw assertion of authority, Mars-force staking its claim
- **10°–20° ☉ Three of Wands — Virtue** — force elevated into principled leadership, will guided by solar clarity
- **20°–30° ♀ Four of Wands — Completion** — aggression resolved into harmony, the cycle achieving peaceful form

**Thoth Tarot:**
Aries is attributed to The Emperor (IV), will made sovereign — Mars-energy disciplined into command and authority. The Emperor sits on his throne of rams' heads, his fire not wildfire but the contained fire of governance, law, and dominion. Crowley places him in the sign of Spring to show that true power is the ability to initiate and then direct, not merely to explode.

**Jungian Meaning:** Aries is the Ego at the moment of its first assertion — the "I AM" that establishes the individual as a distinct being. It is the Hero archetype setting out before experience has tempered courage with wisdom. Cardinal Fire produces a psychic energy entirely concerned with self-establishment: the separation from the undifferentiated (Pisces, the ocean that preceded it) into the assertive "I." Developmentally, this corresponds to the infant's first dawning of selfhood — the organism recognising itself as distinct from the world and pushing outward against it. The shadow is this impulse inflated: the Hero who has not learned that other people exist, the will that cannot receive, the I AM that becomes I AM ALONE.`
  },
  {
    name: 'Taurus', glyph: '♉︎', element: 'Earth', quality: 'Fixed',
    ruler: 'Venus', rulerGlyph: '♀', exaltation: 'Moon', exaltationGlyph: '☽',
    colorVar: '--color-earth',
    majorArcana: { cardId: '5-the-hierophant', cardName: 'The Hierophant', romanNumeral: 'V' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Mercury', subRulerGlyph: '☿', cardId: 'five-of-disks', cardName: 'Five of Disks — Worry' },
      { degrees: '10°–20°', subRuler: 'Moon', subRulerGlyph: '☽', cardId: 'six-of-disks', cardName: 'Six of Disks — Success' },
      { degrees: '20°–30°', subRuler: 'Saturn', subRulerGlyph: '♄', cardId: 'seven-of-disks', cardName: 'Seven of Disks — Failure' },
    ],
    courtCards: [
      { cardId: 'prince-of-disks', cardName: 'Prince of Disks', range: '20° Aries – 20° Taurus' },
      { cardId: 'knight-of-swords', cardName: 'Knight of Swords', range: '20° Taurus – 20° Gemini' },
    ],
    description: `Taurus (April 20 – May 20) is Fixed Earth, the fertile mid-Spring ground that receives and holds the seed planted by Aries — stability, sensuality, material security, and the slow accumulation of value.

- **Body:** Rules the throat and neck — the body's instrument of voice and its most stubborn structural axis
- **Symbol:** The Bull is not a predator but an animal of enormous strength in service of cultivation, pulling the plough that breaks open the earth. Connected to earth-gods across cultures (Apis in Egypt, the Bull of Heaven in Mesopotamia, the Minoan Bull of Crete), reflecting the universal recognition of the earth's generative power, the fecundity of matter itself
- **Glyph:** A circle with two horns rising above it — both the Bull's head and, esoterically, the full Moon above the horizon: Venus (the complete circle) and Moon (the lunar crescent horns) encoded in the symbol itself
- **Character:** Builder, artist, sensualist — patient, persistent, pleasure-loving, fiercely resistant to change; once committed, nearly impossible to move
- **Shadow:** Consolidation rigidified — sensation imprisoned by comfort, security-seeking hardened into hoarding, love of beauty curdling into possessiveness

**Rulership & Exaltation:**
- **Venus rules** because Venus is the principle of attraction, beauty, and value, and Taurus is where these qualities take material, embodied form — Venus at home in the physical world: good food, beautiful objects, the slow appreciation of what endures
- **Moon exalted** because Taurus provides the fixed, fertile container the Moon's cyclical nurturing energy most needs — the garden that holds moisture, the soil that retains what is planted, receptivity meeting its perfect vessel

**Decans — The Arc of Material Effort:**
- **0°–10° ☿ Five of Disks — Worry** — the anxious awareness that resources are finite, mind calculating what the earth demands
- **10°–20° ☽ Six of Disks — Success** — the harvest that rewards patient cultivation, feeling nourished by steady growth
- **20°–30° ♄ Seven of Disks — Failure** — the sobering recognition that even the most enduring forms eventually reach their limit

**Thoth Tarot:**
Taurus is attributed to The Hierophant (V), keeper of established forms — tradition, doctrine, ceremony — the means by which spiritual impulse is given lasting, transmissible structure. The Hierophant performs the Taurean function at the level of spirit: not to invent but to preserve, embody, and pass on. Crowley's Hierophant mediates between the formless and the form, which is exactly what Fixed Earth does — giving permanent shape to what might otherwise dissipate.

**Jungian Meaning:** Where Aries asks "I AM," Taurus asks the question that follows: "What do I have? What can I make? What is truly mine?" It is the sensation function at its most grounded — the psyche's need for embodied stability, for building something tangible and lasting. Fixed Earth produces an orientation that finds meaning in solidity: a body that feels well, a home that is warm, a craft that shows the mark of care. Fixed means consolidation rather than initiation; Earth means the domain is physical reality, the body, material resources. Together they anchor identity in concrete experience. The shadow is this consolidation rigidified — sensation imprisoned by comfort, security-seeking hardened into hoarding, love of beauty curdling into possessiveness.`
  },
  {
    name: 'Gemini', glyph: '♊︎', element: 'Air', quality: 'Mutable',
    ruler: 'Mercury', rulerGlyph: '☿',
    colorVar: '--color-air',
    majorArcana: { cardId: '6-the-lovers', cardName: 'The Lovers', romanNumeral: 'VI' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Jupiter', subRulerGlyph: '♃', cardId: 'eight-of-swords', cardName: 'Eight of Swords — Interference' },
      { degrees: '10°–20°', subRuler: 'Mars', subRulerGlyph: '♂', cardId: 'nine-of-swords', cardName: 'Nine of Swords — Cruelty' },
      { degrees: '20°–30°', subRuler: 'Sun', subRulerGlyph: '☉', cardId: 'ten-of-swords', cardName: 'Ten of Swords — Ruin' },
    ],
    courtCards: [
      { cardId: 'knight-of-swords', cardName: 'Knight of Swords', range: '20° Taurus – 20° Gemini' },
      { cardId: 'queen-of-cups', cardName: 'Queen of Cups', range: '20° Gemini – 20° Cancer' },
    ],
    description: `Gemini (May 21 – June 20) is Mutable Air, the late-Spring sign of duality, communication, and the restless movement of intellect between polarities.

- **Body:** Rules the arms, hands, and lungs — the body's instruments of reach, manipulation, and the breath that carries speech
- **Symbol:** The Twins — Castor and Pollux of Greek myth, one mortal, one divine, alternating between Olympus and the underworld — encode the Geminian reality that the mind exists between worlds, never fully at home in either. There are always two voices, two perspectives, two possible paths
- **Glyph:** Two vertical lines joined by cross-bars — the Roman numeral II, the primordial dyad: subject and object, speaker and listener, consciousness splitting into two and asking what is the relationship between these things
- **Character:** Communicator, wit, perpetual student — curious, adaptable, quick, chronically of two minds; genuinely interested in everything, deeply committed to nothing for long
- **Shadow:** Thinking unmoored from feeling — brilliance becoming duplicity, versatility becoming unreliability, interest in everything becoming depth in nothing

**Rulership & Exaltation:**
- **Mercury rules** because Mercury governs thought, language, perception, and the movement of information between points — where Virgo uses the mercurial faculty for analysis, Gemini uses it for pure circulation: collecting, connecting, relaying, and recombining ideas
- **No exaltation** because Gemini is constitutionally plural and kinetic; exaltation means a planet reaching its highest, most singular expression, but any planet that became too settled here would stop being Geminian — the sign exists to keep things moving, not to elevate any single principle to its peak

**Decans — The Darkening Arc of Mind:**
- **0°–10° ♃ Eight of Swords — Interference** — thought scattered by too many possibilities, intellect paralysed by its own breadth
- **10°–20° ♂ Nine of Swords — Cruelty** — the mind sharpened into a weapon that cuts its own bearer, analysis turned inward as self-attack
- **20°–30° ☉ Ten of Swords — Ruin** — consciousness collapsing under the weight of its own divisions, the Twins unable to reconcile

**Thoth Tarot:**
Gemini is attributed to The Lovers (VI), the Hermetic Marriage — the alchemical union of opposites under the Sword's arch. The card is not called The Lovers because Gemini is romantic, but because it is the sign of duality seeking resolution: the unification of opposites through the mediating principle of Mind. The Sword descends between the royal couple not to separate but to consummate their union through discriminating intelligence.

**Jungian Meaning:** The archetype here is the Trickster-Messenger — the figure who stands at the boundary between established categories, not quite divine or mortal, not quite honest or deceptive, not quite serious or frivolous. Gemini is the thinking function in its most agile mode: the mind that sees both sides of every question but struggles to commit to either. Mutable Air produces a consciousness that is fundamentally connective — adapting, bridging, dissolving fixed positions. Its job is to link, translate, and transmit, not to judge or decide. The Trickster fits because Gemini's psychological home is the liminal space where identity is fluid and the rules of one realm do not yet apply to the next. The shadow is thinking unmoored from feeling and sensation: brilliance becoming duplicity, versatility becoming unreliability, interest in everything becoming depth in nothing.`
  },
  {
    name: 'Cancer', glyph: '♋︎', element: 'Water', quality: 'Cardinal',
    ruler: 'Moon', rulerGlyph: '☽', exaltation: 'Jupiter', exaltationGlyph: '♃',
    colorVar: '--color-water',
    majorArcana: { cardId: '7-the-chariot', cardName: 'The Chariot', romanNumeral: 'VII' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Venus', subRulerGlyph: '♀', cardId: 'two-of-cups', cardName: 'Two of Cups — Love' },
      { degrees: '10°–20°', subRuler: 'Mercury', subRulerGlyph: '☿', cardId: 'three-of-cups', cardName: 'Three of Cups — Abundance' },
      { degrees: '20°–30°', subRuler: 'Moon', subRulerGlyph: '☽', cardId: 'four-of-cups', cardName: 'Four of Cups — Luxury' },
    ],
    courtCards: [
      { cardId: 'queen-of-cups', cardName: 'Queen of Cups', range: '20° Gemini – 20° Cancer' },
      { cardId: 'prince-of-wands', cardName: 'Prince of Wands', range: '20° Cancer – 20° Leo' },
    ],
    description: `Cancer (June 21 – July 22) is the Cardinal Water sign and the beginning of Summer — the Crab, the armoured creature that protects its soft interior beneath a hard shell.

- **Body:** The chest and stomach — the body's seat of nourishment and gut-feeling, where we literally take the world in and decide what to absorb
- **Symbol:** The Crab, a threshold creature between land and sea, consciousness and the depths of feeling — its shell is not a cage but portable architecture, a home carried on the back, the original nomadic domestic
- **Glyph:** Two interlocked spirals, read as either two crab-heads or the waxing and waning Moon — encoding the tidal rhythm of the sign, the endless cycling between fullness and emptiness, reception and withdrawal
- **Character:** Approaches what it desires obliquely, moving sideways like the crab, feeling out the emotional temperature before committing — indirect, protective, deeply receptive
- **Shadow:** The indirect approach calcified into manipulation, the protector who smothers, the memory-keeper who becomes a hoarder of the past

**Rulership & Exaltation:**
- **☽ Moon rules** because the Moon governs what we feel rather than what we think, what we carry from the past rather than what we project into the future — and Cancer is the sign that most purely embodies these qualities, providing emotional depth, cyclical sensitivity, and the maternal instinct to protect and nourish
- **♃ Jupiter exalted** because Jupiter's expansive, meaning-making faculty is most nobly expressed not in abstract philosophy but in the lived experience of belonging and care — Jupiter here does not expand intellect or ambition but the heart, the capacity to find meaning in the fact that one is loved and loves in return

**Decans — The Arc of Emotional Maturation:**
- **0°–10° ♀ Two of Cups — Love** — the initial bond of mutual feeling, emotional connection first forming
- **10°–20° ☿ Three of Cups — Abundance** — that bond opens outward into shared joy and emotional communication
- **20°–30° ☽ Four of Cups — Luxury** — feeling, now fully established, risks turning inward toward satiation and withdrawal, the tidal pull back into the shell

**Thoth Tarot:**
Cancer is attributed to The Chariot (VII), the armoured vehicle carrying the Holy Grail through the world — Cancer's protective carapace containing the most sacred, vulnerable vessel of pure feeling and receptivity. The Charioteer moves forward by maintaining inner equilibrium while the four sphinxes pull in different directions: emotional steadiness as strength, the ability to carry feeling through a difficult world without spilling it.

**Jungian Meaning:**
The Cancerian archetype is the psyche's need for emotional containment — the safe, enclosed space (womb, home, shell) within which vulnerable new life can gestate. As Cardinal Water, Cancer does not passively receive feeling but actively constructs the container for it: the home, the relationship, the family. This maps to the positive mother complex — the archetypal Great Mother who provides the prima materia of psychic life, the matrix within which the self first comes into being. The shadow is the enclosure turned suffocating: the shell that becomes a prison, the nurturance that becomes control, the protection that refuses to let feeling grow beyond the nest.`
  },
  {
    name: 'Leo', glyph: '♌︎', element: 'Fire', quality: 'Fixed',
    ruler: 'Sun', rulerGlyph: '☉',
    colorVar: '--color-fire',
    majorArcana: { cardId: '11-lust', cardName: 'Lust', romanNumeral: 'XI' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Saturn', subRulerGlyph: '♄', cardId: 'five-of-wands', cardName: 'Five of Wands — Strife' },
      { degrees: '10°–20°', subRuler: 'Jupiter', subRulerGlyph: '♃', cardId: 'six-of-wands', cardName: 'Six of Wands — Victory' },
      { degrees: '20°–30°', subRuler: 'Mars', subRulerGlyph: '♂', cardId: 'seven-of-wands', cardName: 'Seven of Wands — Valour' },
    ],
    courtCards: [
      { cardId: 'prince-of-wands', cardName: 'Prince of Wands', range: '20° Cancer – 20° Leo' },
      { cardId: 'knight-of-disks', cardName: 'Knight of Disks', range: '20° Leo – 20° Virgo' },
    ],
    description: `Leo (July 23 – August 22) is the Fixed Fire sign of mid-Summer — the Lion, the Sun at its zenith.

- **Body:** The heart and spine — the body's central pump and structural axis, the organs that keep everything else upright and alive
- **Symbol:** The Lion, king of beasts not because it is the largest or most dangerous but because it carries itself as though it were — sovereignty is a quality of bearing, not merely of power
- **Glyph:** The lion's mane and tail — the curve of creative self-expression radiating outward from a fixed centre
- **Character:** Genuine magnanimity, the great-souled person who gives warmth because warmth is their nature — where Aries ignites fire and Sagittarius sends it outward, Leo holds the flame at its peak, fixed, sustaining, radiating
- **Shadow:** The tyranny of the ego that has confused its own performance for the sun itself — vanity, attention-seeking, the need to be seen eclipsing the capacity to see

**Rulership & Exaltation:**
- **☉ Sun rules** because Leo is the only sign that mirrors the Sun's nature back at it — both are singular, both are central, both illuminate everything around them; every other planet rules two signs, the Sun rules only Leo, just as there is only one Sun
- **No exaltation** because the Sun's own sign needs no additional elevation — it is already at home in its own throne room, already at the height of the year; Leo's fire is self-sufficient

**Decans — The Arc of Creative Struggle:**
- **0°–10° ♄ Five of Wands — Strife** — Leo's fixed fire first meets resistance and friction, the creative act encountering opposition
- **10°–20° ♃ Six of Wands — Victory** — the fire breaks through into full, triumphant expression
- **20°–30° ♂ Seven of Wands — Valour** — what has been won must now be defended against those who would take it, creation demands courage to the end

**Thoth Tarot:**
Leo is attributed to Lust (XI) — the ecstatic union of Babalon and the Lion-Serpent, not mere appetite but the full, unashamed outpouring of creative energy as cosmic eros. Crowley deliberately replaces the older Strength image (a woman gently closing a lion's mouth) with something wilder — not the taming of vitality but its ecstatic embrace, Fixed Fire riding its own power.

**Jungian Meaning:**
Leo is the archetype of the Creative Individual — the moment when the ego, fully aligned with the Self, shines without shame or apology. The Sun in astrology symbolises consciousness itself, the central organising principle of the psyche, and Leo is the sign in which that principle is fixed, amplified, and turned outward as creative act. Ego-inflation is the shadow: the ego that mistakes itself for the Self, performing sovereignty rather than embodying it. But at its highest, the Leo archetype is the individuation moment where a person stops asking permission to exist — the inner sovereign takes the throne not through conquest but through recognising this was always their seat. Genuine creativity, in Jungian thought, is not production for approval but the overflow of a psyche fully alive to itself.`
  },
  {
    name: 'Virgo', glyph: '♍︎', element: 'Earth', quality: 'Mutable',
    ruler: 'Mercury', rulerGlyph: '☿',
    colorVar: '--color-earth',
    majorArcana: { cardId: '9-the-hermit', cardName: 'The Hermit', romanNumeral: 'IX' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Sun', subRulerGlyph: '☉', cardId: 'eight-of-disks', cardName: 'Eight of Disks — Prudence' },
      { degrees: '10°–20°', subRuler: 'Venus', subRulerGlyph: '♀', cardId: 'nine-of-disks', cardName: 'Nine of Disks — Gain' },
      { degrees: '20°–30°', subRuler: 'Mercury', subRulerGlyph: '☿', cardId: 'ten-of-disks', cardName: 'Ten of Disks — Wealth' },
    ],
    courtCards: [
      { cardId: 'knight-of-disks', cardName: 'Knight of Disks', range: '20° Leo – 20° Virgo' },
      { cardId: 'queen-of-swords', cardName: 'Queen of Swords', range: '20° Virgo – 20° Libra' },
    ],
    description: `Virgo (August 23 – September 22) is the Mutable Earth sign of late Summer — the Virgin, the Harvest-Maiden.

- **Body:** The intestines and digestive system — the organs that sort the nourishing from the waste, discrimination made flesh
- **Symbol:** The Virgin, not moral purity but something older — the field not yet harvested, potential not yet actualised, the feminine principle that contains the seed without yet having released it into form; the sign of Yod, the secret seed of life, the Virgin Earth awaiting the Phallic Plough
- **Glyph:** The letter M with an inward-turning tail — the intestinal loop of self-contained analysis, matter folded back upon itself for examination
- **Character:** Notices what others miss — the misplaced comma, the off note, the ingredient that does not belong; the intelligence of the organism distinguishing the edible from the poisonous, the wheat from the chaff
- **Shadow:** Perfectionism's paralysis — endless refinement that never permits completion, service that becomes self-erasure

**Rulership & Exaltation:**
- **☿ Mercury rules** because Mercury is the planet of discrimination — the capacity to break a whole into parts and examine each — and Virgo is where that discrimination is most urgently practical: earth, matter, the body; Mercury in Gemini is quick and playful, Mercury in Virgo is the craftsman's hand rather than the debater's tongue
- **☿ Mercury also exalted** because the intellectual function reaches its most refined and spiritually productive expression here — Mercury is both ruler and exalted in Virgo, the only sign where a single planet holds both dignities, because Virgo's demand for practical precision forces Mercury's tendency toward abstraction into contact with matter and consequence, sharpening the mind to its finest edge

**Decans — The Arc of the Harvest:**
- **0°–10° ☉ Eight of Disks — Prudence** — the careful husbandry of energy, seed-planting with discipline
- **10°–20° ♀ Nine of Disks — Gain** — the quiet accumulation of real value as the crop matures and rewards patient tending
- **20°–30° ☿ Ten of Disks — Wealth** — the full materialisation of the principle, the harvest completed, abundance made concrete through attention rather than force

**Thoth Tarot:**
Virgo is attributed to The Hermit (IX), who withdraws into solitude to illuminate the dark earth with his lamp — not fleeing the world but penetrating it, turning consciousness inward and downward into matter, body, and unconscious life. Crowley's Hermit carries not merely a lantern but a serpent-staff: the solar phallic force descending into the earth, the Yod fertilising the field.

**Jungian Meaning:**
Where Scorpio descends to transform, Virgo descends to sort, to sift, to understand. It represents the analytical function turned upon the self — the grain-by-grain sorting of psychic contents that characterises the deepest, least glamorous phase of individuation. Jungian integration requires not only heroic confrontation with the Shadow but also the slow, meticulous work of finding each encountered content its proper place in the whole psyche. The Virgin is the psyche still in process — not yet complete, still holding the grain up to the light. Jung's concept of the inferior function, the least developed aspect of personality that must be painstakingly cultivated, is essentially Virgoan: it demands humility, patience, and a willingness to find meaning in what seems small. Virgo teaches that the sacred lives not only in peak experiences but in the faithful tending of daily life.`
  },
  {
    name: 'Libra', glyph: '♎︎', element: 'Air', quality: 'Cardinal',
    ruler: 'Venus', rulerGlyph: '♀', exaltation: 'Saturn', exaltationGlyph: '♄',
    colorVar: '--color-air',
    majorArcana: { cardId: '8-adjustment', cardName: 'Adjustment', romanNumeral: 'VIII' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Moon', subRulerGlyph: '☽', cardId: 'two-of-swords', cardName: 'Two of Swords — Peace' },
      { degrees: '10°–20°', subRuler: 'Saturn', subRulerGlyph: '♄', cardId: 'three-of-swords', cardName: 'Three of Swords — Sorrow' },
      { degrees: '20°–30°', subRuler: 'Jupiter', subRulerGlyph: '♃', cardId: 'four-of-swords', cardName: 'Four of Swords — Truce' },
    ],
    courtCards: [
      { cardId: 'queen-of-swords', cardName: 'Queen of Swords', range: '20° Virgo – 20° Libra' },
      { cardId: 'prince-of-cups', cardName: 'Prince of Cups', range: '20° Libra – 20° Scorpio' },
    ],
    description: `Libra (September 23 -- October 22) is the Cardinal Air sign and the beginning of Autumn -- the Scales, the principle of balance, justice, and the harmonization of opposites. As the first sign of the zodiac's second half, Libra marks where the self first encounters the not-self and must negotiate.

- **Body:** The kidneys and lower back -- the organs of filtration and structural support that maintain the body's internal equilibrium
- **Symbol:** The Scales -- the only zodiac symbol that is neither animal nor person but an instrument of measurement. The Sun crosses into Libra at the Autumnal Equinox, the instant day and night are equal before darkness gains on light; the Scales hold that moment of perfect poise before the tipping. Justice requires measurement and beauty requires proportion -- both demand the capacity to compare.
- **Glyph:** A horizon line with a half-circle rising above it, imaging the setting Sun balanced on the edge of the world -- equilibrium at the threshold between day and night
- **Character:** Relational, aesthetic, diplomatic; holds two opposing truths simultaneously and seeks the third thing that contains both. The first six signs develop the individual; Libra begins the six concerned with the other, which is why it is so powerfully relational.
- **Shadow:** Indecision, people-pleasing, and the compulsive smoothing-over of conflict that prevents real truth from emerging

**Rulership & Exaltation:**
- **♀ Venus rules** because Venus is the planet of attraction, the magnetic pull between things that belong together, and Libra is the sign of the relationship between things -- the balance point that only exists because two sides exist to be balanced. In Taurus, Venus is sensual and possessive; in Libra, it refines into proportion, fair exchange, and the mind that sees both sides.
- **♄ Saturn exalted** because Saturn is exact consequence, cause and effect, law without favouritism -- in the sign of the Scales this becomes justice in its purest form. Saturn here is not the tyrant but the impartial judge. Together, beauty and structure produce justice.

**Decans -- The Cost of Equilibrium:**
- **0°--10° ☽ Two of Swords -- Peace** -- the achieved moment of stillness, but it rests on the suppression of conflict -- two swords crossed over the heart
- **10°--20° ♄ Three of Swords -- Sorrow** -- what emerges when real balance is sought and the painful truth of imbalance must be faced
- **20°--30° ♃ Four of Swords -- Truce** -- the mature outcome: not perfect harmony, but a sustainable, negotiated resting point that has passed through grief

**Thoth Tarot:**
Libra is attributed to Adjustment (VIII) -- the dancer on her tiptoes, maintaining cosmic equilibrium through constant, active balancing. Crowley's choice of Adjustment over the traditional Justice is itself a Libran act: more precise, more honest about what balance actually requires. The figure is not seated passively with scales but in perpetual concentrated motion -- not static, achieved balance, but continuous micro-adjustment in a moving universe.

**Jungian Meaning:**
The psyche, like the Scales, is not random -- it tends toward balance. Jung's principle of psychic compensation holds that the unconscious always moves to correct the imbalances of the conscious attitude: when consciousness becomes too one-sided, the unconscious produces the compensating opposite in dreams, symptoms, and behaviour that surprises even the person performing it. Libra is the sign of this impersonal, structural law -- correction not as punishment but as the scale returning to level out of its own nature. The transcendent function, Jung's term for the psyche's capacity to hold two opposites in tension long enough for a third position to emerge, is Libra at its highest: not the forced resolution of conflict but the patient holding of both sides until something genuinely new appears.`
  },
  {
    name: 'Scorpio', glyph: '♏︎', element: 'Water', quality: 'Fixed',
    ruler: 'Mars', rulerGlyph: '♂',
    colorVar: '--color-water',
    majorArcana: { cardId: '13-death', cardName: 'Death', romanNumeral: 'XIII' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Mars', subRulerGlyph: '♂', cardId: 'five-of-cups', cardName: 'Five of Cups — Disappointment' },
      { degrees: '10°–20°', subRuler: 'Sun', subRulerGlyph: '☉', cardId: 'six-of-cups', cardName: 'Six of Cups — Pleasure' },
      { degrees: '20°–30°', subRuler: 'Venus', subRulerGlyph: '♀', cardId: 'seven-of-cups', cardName: 'Seven of Cups — Debauch' },
    ],
    courtCards: [
      { cardId: 'prince-of-cups', cardName: 'Prince of Cups', range: '20° Libra – 20° Scorpio' },
      { cardId: 'knight-of-wands', cardName: 'Knight of Wands', range: '20° Scorpio – 20° Sagittarius' },
    ],
    description: `Scorpio (October 23 -- November 21) is the Fixed Water sign of mid-Autumn and the only sign with three symbolic forms -- the sign of metamorphosis, of the self that does not remain what it was. In some traditions, a fourth form is named -- the Phoenix -- representing complete annihilation and resurrection from one's own ashes.

- **Body:** The reproductive organs -- the body's seat of generation, death, and regeneration
- **Symbol:** The Scorpion, the Serpent, and the Eagle -- three genuinely different levels of expression, three possible answers to the same question: what do you do with intensity? No other sign is given multiple symbols.
- **Glyph:** An M-shape with an arrow-tipped tail rising upward, encoding the Serpent's strike and the Eagle's ascent -- the sting that becomes aspiration
- **Character:** Intense, penetrating, loyal to the point of ferocity; sees through surfaces into hidden motivations. Fixed Water is the deep lake, the underground river -- water that does not move on the surface but whose currents run far below. It holds its form, remembers, carries its history in solution. Scorpio does not decide to feel things intensely; it simply has no other gear. Sexuality is rarely casual because the erotic is always bound up with power, vulnerability, and surrender.
- **Shadow:** The refusal to let go: resentment held for decades, jealousy that poisons love, control masquerading as protection, the scorpion that stings itself rather than be trapped. But this shadow exists because Scorpio's gift -- the capacity to go all the way in, to hold nothing back -- is real.

**The Three Forms:**
- **The Scorpion** -- the lowest form, Scorpionic energy in its unreflective state: the person who retaliates instinctively and disproportionately when threatened, who holds the grudge, who poisons the well. The sting is not malice but the reflex of a creature that has decided pre-emptive attack is the safest defence. The Scorpion is not evil; it is unconscious -- Scorpio before it has met itself.
- **The Serpent** -- the step from reaction to intention. The Serpent also deals in venom and moves in secret, but it is aware of what it is doing. Crucially, it sheds its skin -- building a new skin beneath the old and walking out of its former self. In the Western mystery tradition, the Serpent is the symbol of wisdom and the Kundalini force, the life-fire that must be raised rather than suppressed.
- **The Eagle** -- the leap from depth to height, from the ground-dweller to the one that sees the whole terrain from above. In Hermetic and alchemical tradition, the Eagle represents sublimation: transforming a lower substance into a higher one through heat. On the Tarot's Wheel of Fortune and the World card, the Eagle appears among the four Kerubic creatures -- and there it has become the Angel of water, the winged form of what was once the creature of the sting.

**Rulership & Exaltation:**
- **♂ Mars rules** because Mars is the planet of will, the cutting edge, the force that does not look away -- and in Scorpio that force is directed inward and downward, into the underworld of the unconscious. Mars in Aries charges forward; Mars in Scorpio is the surgeon -- precise, cold, cutting into the body of reality to find what is diseased. Modern astrology adds Pluto as co-ruler: Mars cuts; Pluto dissolves. Together they give Scorpio both the will to penetrate and the capacity to endure total dissolution.
- **No traditional exaltation** -- Scorpio's depths are self-sufficient. Where other signs are elevated by a guest planet that adds something they lack, Scorpio's fixed water is already at maximum depth. The underworld contains its own completeness.

**Decans -- The Corruption of Depth:**
- **0°--10° ♂ Five of Cups -- Disappointment** -- the bitterness when deep emotional investment is not met -- the Scorpion who gave everything
- **10°--20° ☉ Six of Cups -- Pleasure** -- the remembered sweetness of what was, the cup of memory tipping toward nostalgia
- **20°--30° ♀ Seven of Cups -- Debauch** -- Fixed Water deprived of genuine depth seeking substitute intensity in excess -- the corruption of the profound into the merely indulgent

**Thoth Tarot:**
Scorpio is attributed to Death (XIII) -- the skeleton dancing amid bubbles of new life. Death in the Thoth system is not cessation but transformation: the skeleton dances, and from the earth around it rise spheres, serpents, and new forms. Crowley's card compresses all three forms into one image: the Scorpion (decaying material), the Serpent (the transformative force itself), and the Eagle (souls rising from dissolution into new life).

**Jungian Meaning:**
Jung's central discovery was that the contents the ego refuses to acknowledge do not disappear -- they accumulate in the Shadow, growing in power with each refusal, until they return in compulsive, projected, or symptomatic form. The only escape from this tyranny is the Scorpionic move: turn toward it, descend deliberately, face what is ugly and shameful not with self-punishment but with the clear, unflinching gaze of the Serpent. Scorpio cannot look away; this is its structure. Shadow integration is a Scorpionic initiation: you descend (the Scorpion's sting, the first wounding), encounter what you have hidden (the Serpent's wisdom, the knowledge that was always there), and return transformed (the Eagle's height, the capacity to see your former compulsions from above). The three Jungian stages of the night sea journey -- descent, encounter with the monster, rebirth -- map directly onto the three forms. And Scorpio's fixed quality is essential: the transformation it undergoes is not superficial. Fixed Water does not merely ripple at the surface; it changes all the way through.`
  },
  {
    name: 'Sagittarius', glyph: '♐︎', element: 'Fire', quality: 'Mutable',
    ruler: 'Jupiter', rulerGlyph: '♃',
    colorVar: '--color-fire',
    majorArcana: { cardId: '14-art', cardName: 'Art', romanNumeral: 'XIV' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Mercury', subRulerGlyph: '☿', cardId: 'eight-of-wands', cardName: 'Eight of Wands — Swiftness' },
      { degrees: '10°–20°', subRuler: 'Moon', subRulerGlyph: '☽', cardId: 'nine-of-wands', cardName: 'Nine of Wands — Strength' },
      { degrees: '20°–30°', subRuler: 'Saturn', subRulerGlyph: '♄', cardId: 'ten-of-wands', cardName: 'Ten of Wands — Oppression' },
    ],
    courtCards: [
      { cardId: 'knight-of-wands', cardName: 'Knight of Wands', range: '20° Scorpio – 20° Sagittarius' },
      { cardId: 'queen-of-disks', cardName: 'Queen of Disks', range: '20° Sagittarius – 20° Capricorn' },
    ],
    description: `Sagittarius (November 22 -- December 21) is the Mutable Fire sign of late Autumn -- the Archer, the Centaur who is both animal and philosopher, aiming the arrow of aspiration at the distant stars. It is the sign of the wandering scholar, the pilgrimage, the seeker who must move in order to think.

- **Body:** The thighs and hips -- the parts of the body that propel us forward and give us our stride, the musculature of the quest itself
- **Symbol:** The Centaur -- encoding the essential Sagittarian tension between the lower, instinctual nature (the horse body, appetite, animal vitality) and the higher, reasoning mind (the human torso, the philosopher, the priest). The upward-aimed arrow is the act of will that synthesizes these two natures into a single directed force -- not the suppression of instinct but its ennoblement.
- **Glyph:** A diagonal arrow pointing upward and to the right -- aspiration reduced to its simplest gesture, the line of aim between where one stands and where one intends to go
- **Character:** Restless, honest, philosophical; hunger for the horizon and sometimes painful directness -- the arrow goes straight and does not curve politely around the truth. Love of travel, foreign cultures, and the open road.
- **Shadow:** Inflation -- the grandiose conviction that one's restlessness is wisdom rather than avoidance, the preacher who does not practice, the archer perpetually aiming at horizons never reached

**Rulership & Exaltation:**
- **♃ Jupiter rules** because Jupiter is the planet of growth, abundance, and the urge to exceed the boundaries of what is already known -- and Sagittarius is the sign that experiences limitation as a personal affront and responds by aiming higher. Jupiter is the god of sky and law, of the covenant between humanity and cosmos; Sagittarius is where that covenant is sought through philosophy, religion, and the open road.
- **No traditional exaltation** -- Jupiter's own expansiveness is sufficient, and the mutable quality itself, the capacity to shift, adapt, and synthesize opposites (horse and human, body and mind, instinct and reason), is the mechanism by which Sagittarius does its work

**Decans -- The Arc of Aspiration:**
- **0°--10° ☿ Eight of Wands -- Swiftness** -- the brilliant first rush of Fiery purpose, all momentum and no friction
- **10°--20° ☽ Nine of Wands -- Strength** -- the embattled endurance required to sustain the quest once the initial fire fades -- the Archer who must hold the bow drawn when arms begin to tremble
- **20°--30° ♄ Ten of Wands -- Oppression** -- the crushing weight of Saturnine limitation that threatens to overwhelm even the most ardent seeker, the moment the quest becomes a burden rather than a liberation

**Thoth Tarot:**
Sagittarius is attributed to Art (XIV) -- the Alchemical Marriage, the consummation of the Great Work. Crowley's figure literally combines solar and lunar, fire and water, Red Lion and White Eagle into a single androgynous alchemist -- mirroring the Centaur's synthesis of animal and philosopher. The Great Work is not escape from matter but its transfiguration, and the upward-aimed arrow promises the same: not escape from the body but the ennobling of bodily energy into spirit.

**Jungian Meaning:**
The psyche is not merely reactive but purposive -- it moves toward something. Jung understood that symptoms, dreams, and compulsions are not only about the past but about what is trying to be born. Sagittarius is the zodiacal image of that forward-facing, teleological orientation: the part of the psyche that experiences the present as insufficient and the future as charged with promise. The Centaur is particularly apt as a Jungian symbol -- the instinctual self (the horse) being ridden and directed, but not destroyed, by consciousness. The arrow is the act of individuation itself: the deliberate, chosen aim at what is highest and most distant, the refusal to remain merely animal or merely intellectual, but to synthesize both into a single purposive gesture. The psychological danger is inflation -- identifying with the archetype of the Quest so completely that one's personal restlessness feels cosmically significant, and the perpetual aim at the horizon becomes a way of never arriving anywhere at all.`
  },
  {
    name: 'Capricorn', glyph: '♑︎', element: 'Earth', quality: 'Cardinal',
    ruler: 'Saturn', rulerGlyph: '♄', exaltation: 'Mars', exaltationGlyph: '♂',
    colorVar: '--color-earth',
    majorArcana: { cardId: '15-the-devil', cardName: 'The Devil', romanNumeral: 'XV' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Jupiter', subRulerGlyph: '♃', cardId: 'two-of-disks', cardName: 'Two of Disks — Change' },
      { degrees: '10°–20°', subRuler: 'Mars', subRulerGlyph: '♂', cardId: 'three-of-disks', cardName: 'Three of Disks — Work' },
      { degrees: '20°–30°', subRuler: 'Sun', subRulerGlyph: '☉', cardId: 'four-of-disks', cardName: 'Four of Disks — Power' },
    ],
    courtCards: [
      { cardId: 'queen-of-disks', cardName: 'Queen of Disks', range: '20° Sagittarius – 20° Capricorn' },
      { cardId: 'prince-of-swords', cardName: 'Prince of Swords', range: '20° Capricorn – 20° Aquarius' },
    ],
    description: `Capricorn (December 22 – January 19) is the Cardinal Earth sign — the Mountain Goat, the most ambitious and materially powerful sign in the zodiac. The sign begins at the Winter Solstice, the ancient "gate of the gods," the moment of maximum darkness when the Sun reverses its decline and begins its northward return — the Pan mystery at the heart of Capricorn: life erupting from the dead of winter, the creative force of matter at its most primal precisely when the world appears most dead.

- **Body:** the knees and skeleton — the joints that bend under load and the bones that give the body its architecture, its capacity to bear weight and remain upright
- **Symbol:** the ancient Sea-Goat — half goat, half fish — is older than the purely terrestrial image, encoding a creature that navigates both material heights and primal depths, carrying something oceanic within its ambition
- **Glyph:** a twisted horn curving inward upon itself, evoking the goat's horn and the coiled tail of the sea-creature — the spiral of patient ascent through dense matter
- **Character:** ambition, dry wit, austerity, long-term planning, deep hunger for achievement — the executive, the elder, the person who has paid their dues and intends to collect
- **Shadow:** ruthless careerism, emotional austerity hardening into coldness, sacrificing every present moment to a future that never arrives, confusing accumulated external authority with actual inner worth

**Rulership & Exaltation:**
- **♄ Saturn rules** because Capricorn experiences limitation not as imprisonment but as the cliff face itself — necessary, defining, the medium through which ascent becomes possible; Saturn rules time and Capricorn thinks in decades
- **♂ Mars exalted** because Mars here is channeled, strategic, and devastating in precision — Earth gives fire its lasting form, building fierce energy into the architecture of achievement rather than burning it out

**Decans — The Arc of Material Mastery:**
- **0°–10° ♃ Two of Disks (Change)** — the initial flux of conditions brought under management, Jupiter lending adaptability to Saturnian discipline
- **10°–20° ♂ Three of Disks (Work)** — disciplined craft and labor applied with Mars-driven precision, the actual building phase
- **20°–30° ☉ Four of Disks (Power)** — the achieved position consolidated into enduring material security, solar authority made concrete

**Thoth Tarot:**
Capricorn is attributed to The Devil (XV) — Pan Pangenetor, the All-Begetter, the goat leaping with lust upon the summits of the earth. Crowley's Devil is not evil but primal: the generative force of matter itself, the creative power embedded in the physical world. The card's loose chains encode the Capricornian mystery: what appears to be bondage is chosen discipline, and the apparent demon is the raw creative power of Earth.

**Jungian Meaning:** Capricorn is the archetype of worldly mastery through discipline — the capacity to work within reality's constraints and find the sacred within the material. The outer world is not an obstacle to inner development but a necessary arena in which the psyche actualizes its potential. The Devil attribution maps directly onto Jung's Shadow principle made productive: ambition, status-hunger, and material drive, when consciously directed, build the structures within which human life becomes possible. The danger is the pathological superego — the internalized Saturn that turns discipline into self-punishment and reaches the summit only to find it empty. The unlived Capricorn sacrifices every present moment to a future that never arrives, confusing accumulated external authority with actual inner authority. Integration means understanding that the mountain is not conquered but inhabited — mastery is not a destination but a manner of moving through difficulty.`
  },
  {
    name: 'Aquarius', glyph: '♒︎', element: 'Air', quality: 'Fixed',
    ruler: 'Saturn', rulerGlyph: '♄',
    colorVar: '--color-air',
    majorArcana: { cardId: '17-the-star', cardName: 'The Star', romanNumeral: 'XVII' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Venus', subRulerGlyph: '♀', cardId: 'five-of-swords', cardName: 'Five of Swords — Defeat' },
      { degrees: '10°–20°', subRuler: 'Mercury', subRulerGlyph: '☿', cardId: 'six-of-swords', cardName: 'Six of Swords — Science' },
      { degrees: '20°–30°', subRuler: 'Moon', subRulerGlyph: '☽', cardId: 'seven-of-swords', cardName: 'Seven of Swords — Futility' },
    ],
    courtCards: [
      { cardId: 'prince-of-swords', cardName: 'Prince of Swords', range: '20° Capricorn – 20° Aquarius' },
      { cardId: 'knight-of-cups', cardName: 'Knight of Cups', range: '20° Aquarius – 20° Pisces' },
    ],
    description: `Aquarius (January 20 – February 18) is the Fixed Air sign of mid-Winter — the Water-Bearer, the paradoxical figure who pours water (life, emotion, nourishment) while being an Air sign (intellect, detachment, universal vision). Aquarius does not contain or drink the water but carries it for others, a servant of the collective who distributes what sustains life with the detachment of one who understands function over possession.

- **Body:** the ankles and circulatory system — the ankles that keep us upright and mobile, the circulation that distributes vital force throughout the body equally, a fitting correspondence for the sign of universal distribution
- **Symbol:** the Water-Bearer — the paradox is the key: deep commitment to humanity in the abstract, personal detachment from the difficult reality of individual persons
- **Glyph:** two parallel wavy lines, often mistaken for water but representing electromagnetic energy — the invisible force that connects and animates, the Uranian signature embedded in the ancient symbol, suggesting that what Aquarius pours is not water but information, current, revelation
- **Character:** intellectual originality, humanitarian idealism, fierce independence, social awkwardness, resistance to authority — the revolutionary, the scientist, the eccentric who sees twenty years ahead and cannot understand why no one else does yet
- **Shadow:** cold detachment masquerading as objectivity, the simultaneous longing for community and inability to fully belong to any, loving humanity while failing the human in the room

**Rulership & Exaltation:**
- **♄ Saturn rules** because thought must be disciplined and transmissible — ideas must be structured into language, theory, and social organization, or they remain private inspiration
- **♅ Uranus co-rules** because those structures must periodically be disrupted by paradigm shifts, by the discovery that the map no longer matches the territory; Saturn is the letter of the law, Uranus the spirit that reinterprets it
- No traditional exaltation — the dual rulership already contains the productive friction between order and revolution, form and freedom, that an exaltation would flatten

**Decans — The Cost of the Aquarian Ideal:**
- **0°–10° ♀ Five of Swords (Defeat)** — the necessary surrender of purely personal desire, Venus's warmth chilled by the sign's impersonal atmosphere
- **10°–20° ☿ Six of Swords (Science)** — cool rational analysis replaces what was lost, Mercury finding clarity in abstraction
- **20°–30° ☽ Seven of Swords (Futility)** — the haunting recognition that even the most perfectly reasoned plan may fail to reach its mark, instinct and feeling rendered diffuse

**Thoth Tarot:**
Aquarius is attributed to The Star (XVII) — Nuith, Our Lady of the Stars, pouring the waters of life upon barren earth. The Star depicts the Water-Bearer at cosmic scale: the naked goddess straddling celestial and terrestrial, pouring endless streams of starlight without depletion. It is the card of hope and renewed vision — the highest Aquarian gift: maintaining the vision of what is possible even in midwinter.

**Jungian Meaning:** Jung's concept of the Self as a transpersonal center finds its astrological home in Aquarius: the recognition that the individual psyche is not a sealed unit but a node in a larger network of meaning, that one's insights are participations in the collective unconscious rather than merely personal property. The Water-Bearer who carries but does not drink images a psyche permeable to collective currents, channeling archetypes rather than expressing personal wishes. The Aquarian psychological function is abstraction — seeing pattern rather than instance, universal rather than particular — what Jung identified as the Thinking function in its most impersonal mode. The shadow is dissociation: the love of humanity that cannot love the human in the room. Inflated, this archetype produces the cold ideologue who sacrifices actual persons to theoretical principles, mistaking the system for the living beings it was meant to serve. Integration requires the Water-Bearer to eventually drink from the vessel — to receive the life and feeling the sign so fluently distributes to others.`
  },
  {
    name: 'Pisces', glyph: '♓︎', element: 'Water', quality: 'Mutable',
    ruler: 'Jupiter', rulerGlyph: '♃',
    colorVar: '--color-water',
    majorArcana: { cardId: '18-the-moon', cardName: 'The Moon', romanNumeral: 'XVIII' },
    decans: [
      { degrees: '0°–10°', subRuler: 'Saturn', subRulerGlyph: '♄', cardId: 'eight-of-cups', cardName: 'Eight of Cups — Indolence' },
      { degrees: '10°–20°', subRuler: 'Jupiter', subRulerGlyph: '♃', cardId: 'nine-of-cups', cardName: 'Nine of Cups — Happiness' },
      { degrees: '20°–30°', subRuler: 'Mars', subRulerGlyph: '♂', cardId: 'ten-of-cups', cardName: 'Ten of Cups — Satiety' },
    ],
    courtCards: [
      { cardId: 'knight-of-cups', cardName: 'Knight of Cups', range: '20° Aquarius – 20° Pisces' },
      { cardId: 'queen-of-wands', cardName: 'Queen of Wands', range: '20° Pisces – 20° Aries' },
    ],
    description: `Pisces (February 19 – March 20) is the Mutable Water sign of late Winter — the Fishes, the last sign of the zodiac, where all things dissolve back into the primal ocean before the cycle begins again with Aries. The two Fishes swimming in opposite directions encode the simultaneous pull toward transcendence (outward, toward the infinite) and incarnation (inward, toward the specific, embodied, suffering life).

- **Body:** the feet — the part of the body in constant contact with the earth, the most humbled and neglected, the foundation on which all upright striving depends
- **Symbol:** two Fishes swimming in opposite directions — what appears as Piscean vagueness is the difficulty of inhabiting two directions of being at once; as the final sign, Pisces contains all twelve within itself, which is why its empathy is less a personality trait than an existential condition
- **Glyph:** two crescents bound by a line — two souls tethered yet yearning apart, the tension that keeps dissolution from becoming annihilation
- **Character:** sensitivity, mysticism, artistic vision, compassion, difficulty with boundaries, a haunting ability to sense what has not yet been said — the poet, the mystic, the healer, the saint, and the martyr
- **Shadow:** escapism, addiction, boundarylessness, spiritual bypassing — retreat from the unbearable specificity of incarnated life into fantasy or intoxication

**Rulership & Exaltation:**
- **♃ Jupiter rules** because it provides meaning and benevolence to Piscean dissolution — without it, the sign would be mere disintegration; Jupiter supplies the conviction that the ocean one returns to is not void but plenitude
- **♀ Venus exalted** because in Pisces love becomes agape — love that does not require the beloved to be lovable, that finds the divine in the broken and suffering; love reaches its most selfless expression when the boundaries of self are most porous
- **Neptune as modern co-ruler** deepens the dissolution: where Jupiter provided a theological framework for returning to the ocean, Neptune is the ocean itself — boundless, imaginal, the medium of mystical experience, dream, and the collective psychic field

**Decans — The Full Emotional Arc of Dissolution:**
- **0°–10° ♄ Eight of Cups (Indolence)** — the grief of abandonment and withdrawal, the figure walking away from what once sustained
- **10°–20° ♃ Nine of Cups (Happiness)** — the fullness of emotional completion and wish-fulfillment, Jupiter opening into plenitude
- **20°–30° ♂ Ten of Cups (Satiety)** — the oppressive overcrowding where even the fulfilled wish becomes burdensome, pointing beyond desire itself toward the final dissolution

**Thoth Tarot:**
Pisces is attributed to The Moon (XVIII) — the dark midnight landscape through which Khephra, the sacred scarab beetle, carries the Sun toward dawn. The Moon card is the unconscious in its most raw form: the twilight landscape where the boundary between real and imagined dissolves. Khephra rolling the solar disc through the underworld images the Piscean existential task — carrying the flame of individual awareness through the waters of dissolution without extinguishing it.

**Jungian Meaning:** What Jung called the solutio — the state of psychic liquefaction in which rigid personality structures break down so a new configuration can form — is the Piscean territory. It is the end that contains the beginning, and Jung mapped it carefully as both the most dangerous and the most generative region of the psyche. The Piscean archetype is not pathology but the precondition of genuine transformation: the ego must become permeable before the Self can reorganize it at a higher level. The two Fishes point in opposite directions psychologically: one toward mystical merger with the transpersonal (oceanic bliss), the other toward depressive dissolution (loss of structure without compensating transcendence). Navigating between them requires what Jung called the transcendent function — holding the tension without collapsing into either pole. The Piscean contribution to the psyche is the Feeling function in its most impersonal form: not the personal emotions of Scorpio or Cancer, but direct resonance with the collective emotional field, feeling with and through others without losing one's own witnessing awareness. The shadow is escapism — retreat from the unbearable specificity of incarnated life into fantasy, intoxication, or spiritual bypassing. Integration is the willingness to dissolve consciously, to be the Khephra beetle rolling the sun through the underworld — present, patient, and purposive even in total darkness.`
  },
];

// ============================================
// The 7 Classical Planets + Uranus
// ============================================

export const planets: Planet[] = [
  {
    name: 'Sun', glyph: '☉', sephirah: 'Tiphareth', sephirahNumber: 6,
    rules: ['Leo'], exaltedIn: 'Aries',
    majorArcana: { cardId: '19-the-sun', cardName: 'The Sun', romanNumeral: 'XIX' },
    description: `The Sun is the central luminary — consciousness, vitality, the creative source, and the integrated Self. It is the heart of the solar system and the heart of the Tree of Life (Tiphareth). Its Major Arcana card is The Sun (XIX) — radiant, joyful, the light that illuminates everything it touches.

**Rulership:** The Sun rules Leo — the Fixed Fire sign where solar energy is most fully and naturally expressed. In Leo, the Sun's radiance, sovereignty, and creative authority operate without constraint. The Lion is the Sun's animal — the king of beasts, the solar predator.

**Exaltation:** The Sun is exalted in Aries — the Cardinal Fire sign of initiation and new beginnings. Here the Sun's vitality is at its most dynamic and initiating, reaching its highest expression not in the sustained glow of Leo but in the explosive first spark of creative will.

**Jungian Meaning:** The Sun is the archetype of the Self made visible — the direct experience of one's own centre, felt as simple, immediate, radiant aliveness. As the ruler of Tiphareth, it represents the goal of individuation: the conscious Ego aligned with the transpersonal Self, shining with its own authentic light.`
  },
  {
    name: 'Moon', glyph: '☽', sephirah: 'Yesod', sephirahNumber: 9,
    rules: ['Cancer'], exaltedIn: 'Taurus',
    majorArcana: { cardId: '2-the-high-priestess', cardName: 'The High Priestess', romanNumeral: 'II' },
    description: `The Moon is the great mirror — receptivity, reflection, the unconscious, dreams, and the cyclical rhythms that govern all organic life. Attributed to Yesod (the Foundation), she is the psychic infrastructure upon which the material world is built. Her Major Arcana card is The High Priestess (II).

**Rulership:** The Moon rules Cancer — the Cardinal Water sign of the home, the womb, and emotional protection. In Cancer, the Moon's nurturing, protective, and cyclical nature operates at its fullest. The Crab is the Moon's creature — armoured without, soft and vulnerable within.

**Exaltation:** The Moon is exalted in Taurus — the Fixed Earth sign of material stability and sensual abundance. Here the Moon's receptivity reaches its highest and most fertile expression, grounded in the richness of the physical world. The Moon in Taurus produces the most tangible, most nourishing form of emotional security.

**Jungian Meaning:** The Moon is the unconscious itself — the realm that does not generate its own light but reflects the light of consciousness in a softer, altered, endlessly changing form. As ruler of Yesod, she represents the psychic foundation that supports all conscious activity: habits, instincts, dreams, and the body's ancient wisdom.`
  },
  {
    name: 'Mercury', glyph: '☿', sephirah: 'Hod', sephirahNumber: 8,
    rules: ['Gemini', 'Virgo'],
    majorArcana: { cardId: '1-the-magus', cardName: 'The Magus', romanNumeral: 'I' },
    description: `Mercury is the Messenger — intellect, communication, language, and the capacity to translate between the conscious and the unconscious. Attributed to Hod (Splendour), he is the analytical mind at its most articulate. His Major Arcana card is The Magus (I).

**Rulership:** Mercury rules two signs. In Gemini (Mutable Air), Mercury expresses his communicative, versatile, and intellectually agile nature — the quick-witted messenger darting between ideas. In Virgo (Mutable Earth), Mercury expresses his analytical, discriminating, and service-oriented nature — the meticulous craftsman who refines raw material into useful form. Mercury is also traditionally exalted in Virgo, where the intellectual function reaches its most refined and practically productive expression.

**Jungian Meaning:** Mercury is the archetype of psychic mobility — the Transcendent Function that moves freely between levels of the psyche, carrying messages, making connections, and translating the untranslatable. He is both the Logos (the Word that creates) and the Trickster (the awareness that every word is a limitation).`
  },
  {
    name: 'Venus', glyph: '♀', sephirah: 'Netzach', sephirahNumber: 7,
    rules: ['Taurus', 'Libra'], exaltedIn: 'Pisces',
    majorArcana: { cardId: '3-the-empress', cardName: 'The Empress', romanNumeral: 'III' },
    description: `Venus is the principle of attraction — love, beauty, pleasure, and the desire for connection. Attributed to Netzach (Victory), she is the driving force of desire, emotion, and the instinctual pull toward beauty. Her Major Arcana card is The Empress (III).

**Rulership:** Venus rules two signs. In Taurus (Fixed Earth), Venus expresses her sensual, material, and beauty-cultivating nature — the goddess of the garden, the lover of physical pleasure and tangible beauty. In Libra (Cardinal Air), Venus expresses her harmonizing, relationship-oriented, and aesthetic nature — the goddess of justice and partnership, who seeks balance and beauty in the intellectual and social realm.

**Exaltation:** Venus is traditionally exalted in Pisces, where the love principle reaches its most unconditional, self-sacrificing, and spiritually transcendent expression — love that dissolves all boundaries.

**Jungian Meaning:** Venus is the Eros principle — the binding force that draws things together, creates relationships, and generates new life from the union of opposites. As ruler of Netzach, she represents the psyche's instinctual drive toward beauty and connection — the feeling function that evaluates experience through attraction and repulsion.`
  },
  {
    name: 'Mars', glyph: '♂', sephirah: 'Geburah', sephirahNumber: 5,
    rules: ['Aries', 'Scorpio'], exaltedIn: 'Capricorn',
    majorArcana: { cardId: '16-the-tower', cardName: 'The Tower', romanNumeral: 'XVI' },
    description: `Mars is the Warrior — aggression, destruction, discipline, and the purifying force that tears down what is false or stagnant. Attributed to Geburah (Severity), he is the cosmic surgeon whose knife cuts away diseased tissue. His Major Arcana card is The Tower (XVI).

**Rulership:** Mars rules two signs. In Aries (Cardinal Fire), Mars expresses his most direct, initiating, and headlong aggressive nature — the charge, the first strike, the explosion of will into action. In Scorpio (Fixed Water), Mars expresses his most penetrating, strategic, and transformative nature — the surgeon's scalpel, the detective's relentless pursuit, the alchemist's acid that dissolves to purify.

**Exaltation:** Mars is exalted in Capricorn — the Cardinal Earth sign of disciplined ambition. Here the aggressive instinct reaches its highest expression: not the impulsive charge of Aries or the obsessive penetration of Scorpio, but the focused, constructive, enduring application of force toward material mastery. Mars in Capricorn builds empires.

**Jungian Meaning:** Mars is the aggressive instinct in its most impersonal form — the universal principle that all structures must eventually fall, not out of malice but because destruction is the necessary precondition for renewal. As ruler of Geburah, he represents the critical function that examines everything the Ego has built and ruthlessly dismantles what is no longer true.`
  },
  {
    name: 'Jupiter', glyph: '♃', sephirah: 'Chesed', sephirahNumber: 4,
    rules: ['Sagittarius', 'Pisces'], exaltedIn: 'Cancer',
    majorArcana: { cardId: '10-fortune', cardName: 'Fortune', romanNumeral: 'X' },
    description: `Jupiter is the Greater Benefic — expansion, meaning, generosity, and the benevolent ordering of creation. Attributed to Chesed (Mercy), he is the Demiurge who builds a functioning universe. His Major Arcana card is Fortune (X).

**Rulership:** Jupiter rules two signs. In Sagittarius (Mutable Fire), Jupiter expresses his most philosophical, aspirational, and meaning-seeking nature — the Archer aiming at distant truths, the teacher, the priest, the explorer. In Pisces (Mutable Water), Jupiter expresses his most compassionate, oceanic, and spiritually dissolving nature — the benevolent force that gives meaning to suffering and purpose to dissolution.

**Exaltation:** Jupiter is exalted in Cancer — the Cardinal Water sign of nurture and emotional protection. Here Jupiter's expansive generosity reaches its highest expression through the medium of care, family, and the creation of emotional abundance. Jupiter in Cancer is the overflowing chalice, the feast that nourishes all.

**Jungian Meaning:** Jupiter is the psyche's drive to find meaning in experience — to see pattern where there is chaos, purpose where there is accident, and to transform mere events into a narrative. As ruler of Chesed, he represents the benevolent organizing principle that builds the first comprehensible structure out of the raw archetypal energy above the Abyss.`
  },
  {
    name: 'Saturn', glyph: '♄', sephirah: 'Binah', sephirahNumber: 3,
    rules: ['Capricorn', 'Aquarius'], exaltedIn: 'Libra',
    majorArcana: { cardId: '21-the-universe', cardName: 'The Universe', romanNumeral: 'XXI' },
    description: `Saturn is the Taskmaster — limitation, time, structure, and the form-giving principle that crystallizes the formless into matter. Attributed to Binah (Understanding), he is the Great Mother in her restrictive aspect — the womb that confines and shapes. His Major Arcana card is The Universe (XXI).

**Rulership:** Saturn rules two signs. In Capricorn (Cardinal Earth), Saturn expresses his most ambitious, disciplined, and structurally masterful nature — the architect, the governor, the mountain that endures. In Aquarius (Fixed Air), Saturn expresses his most systematic, idealistic, and socially structuring nature — the lawgiver, the reformer, the framework that gives form to collective vision.

**Exaltation:** Saturn is exalted in Libra — the Cardinal Air sign of balance and justice. Here the principle of limitation reaches its highest expression as *exact justice*: the implacable mathematics of karma, the Scale that weighs all things with ruthless precision. Saturn exalted in Libra is beautiful in its severity.

**Jungian Meaning:** Saturn is the senex — the old, strict, implacable principle that demands structure, discipline, and the acceptance of limitation as the precondition for genuine achievement. As ruler of Binah, he represents the Great Mother's dark face: the womb that confines in order to give form, the tomb that receives the dead in order to return them to life.`
  },
  {
    name: 'Uranus', glyph: '♅', sephirah: 'Chokmah', sephirahNumber: 2,
    rules: ['Aquarius'],
    majorArcana: { cardId: '0-the-fool', cardName: 'The Fool', romanNumeral: '0' },
    description: `Uranus is the Awakener — sudden revolution, breakthrough, the shattering of outdated structures, and the eruption of the genuinely new. Associated with Chokmah (Wisdom), he is the lightning flash of creative energy that precedes all form. His Major Arcana association is The Fool (0).

**Rulership:** Uranus is the modern co-ruler of Aquarius (alongside Saturn). In Aquarius, Uranus expresses the revolutionary, boundary-dissolving, visionary dimension of the Fixed Air sign — the flash of insight that shatters convention, the genius that sees what no one else can see.

**Exaltation:** Uranus has no traditional Exaltation — as a modern planet discovered in 1781, it falls outside the classical dignity system. Its nature is inherently anti-traditional, making the concept of a fixed "highest expression" somewhat alien to its character.

**Jungian Meaning:** Uranus corresponds to the eruption of unconscious contents that cannot be predicted, controlled, or understood in advance — the psychic earthquake that shatters the old to make way for what has never existed before. As the planet associated with Chokmah, it represents the first lightning flash of awareness before it has been tamed by form or structure.`
  },
];

// ============================================
// The Elements (for the elemental Major Arcana)
// ============================================

export const elements: ElementEntry[] = [
  {
    name: 'Fire', symbol: '🜂', suits: 'Wands',
    majorArcana: { cardId: '20-the-aeon', cardName: 'The Aeon', romanNumeral: 'XX' },
    signs: ['Aries', 'Leo', 'Sagittarius'],
    colorVar: '--color-fire',
    description: `Fire is the active, creative, initiating element — will, spiritual energy, and the drive to manifest. It is the first element in the hierarchy of creation, corresponding to the letter Yod of the Tetragrammaton and the Qabalistic world of Atziluth (Emanation). Fire does not exist as a substance but as a phenomenon — it is pure energy in the act of transforming matter, the visible face of the invisible will.

In nature, Fire is the lightning bolt, the volcanic eruption, the spark of combustion. It creates by destroying — every act of fire consumes what was in order to release what will be. The alchemists called the fiery principle Sulphur: the active, masculine, volatile essence that initiates all transformation.

**Thoth Tarot:** The suit of Wands carries the element of Fire through the entire Tree of Life. The elemental Fire itself is attributed to The Aeon (XX) through the Hebrew letter Shin — one of the three Mother Letters. Shin means "Tooth," the instrument of biting and breaking down, reflecting Fire's nature as the transformative force that consumes the old to generate the new. The three Fire signs represent the three modes of creative will: Aries initiates (Cardinal), Leo sustains and radiates (Fixed), and Sagittarius adapts and aims (Mutable). The Court Cards of Wands follow the Tetragrammaton: Knight (Yod/fiery part of Fire), Queen (Heh/watery part), Prince (Vau/airy part), Princess (Heh final/earthy part).

**Jungian Meaning:** In Jungian terms, Fire corresponds to the *intuition function* — the psychic capacity that perceives possibilities, grasps wholes rather than parts, and leaps beyond the evidence to seize what is not yet manifest. Fire is the libido in its most forward-thrusting form: the drive to create, to act, to will something into existence. The shadow of Fire is inflation — the identification of the Ego with the creative impulse, leading to grandiosity, burnout, and the confusion of personal desire with divine mandate.`
  },
  {
    name: 'Water', symbol: '🜄', suits: 'Cups',
    majorArcana: { cardId: '12-the-hanged-man', cardName: 'The Hanged Man', romanNumeral: 'XII' },
    signs: ['Cancer', 'Scorpio', 'Pisces'],
    colorVar: '--color-water',
    description: `Water is the receptive, emotional, dissolving element — feeling, intuition, and the unconscious depths. It corresponds to the first letter Heh of the Tetragrammaton and the Qabalistic world of Briah (Creation). Where Fire projects outward, Water draws inward; where Fire separates and ignites, Water merges and dissolves. Water is the medium of life — every living cell is a vessel of water, and every emotion is a tide.

In nature, Water is the ocean, the rain, the underground river. It seeks the lowest point, it takes the shape of whatever contains it, and over time it erodes the hardest stone. The alchemists called the watery principle Salt: the passive, feminine, crystallizing essence that receives the fire's impulse and gives it tangible form.

**Thoth Tarot:** The suit of Cups carries the element of Water. The elemental Water itself is attributed to The Hanged Man (XII) through the Hebrew letter Mem — another of the three Mother Letters. Mem means "Water," and the card depicts the suspended, surrendered state that is Water's essential gesture: the willingness to be acted upon, to dissolve, to let go. The three Water signs represent the three modes of emotional experience: Cancer protects and nurtures (Cardinal), Scorpio transforms and penetrates (Fixed), and Pisces dissolves and transcends (Mutable). The Court Cards of Cups follow the Tetragrammaton through the watery element.

**Jungian Meaning:** In Jungian terms, Water corresponds to the *feeling function* — the psychic capacity that evaluates experience through attraction and repulsion, assigning personal value and emotional significance. Water is the unconscious itself: the dark, deep, oceanic realm from which dreams arise and into which consciousness dissolves each night. The shadow of Water is emotional flooding — the loss of Ego boundaries, the inability to distinguish one's own feelings from those of others, and the passive surrender to moods that the Ego mistakes for fate.`
  },
  {
    name: 'Air', symbol: '🜁', suits: 'Swords',
    majorArcana: { cardId: '0-the-fool', cardName: 'The Fool', romanNumeral: '0' },
    signs: ['Gemini', 'Libra', 'Aquarius'],
    colorVar: '--color-air',
    description: `Air is the intellectual, communicative, discriminating element — thought, analysis, and the mind's capacity to separate and connect. It corresponds to the letter Vau of the Tetragrammaton and the Qabalistic world of Yetzirah (Formation). Air is the product of Fire and Water's union — it lacks the purity of either parent but possesses a unique capacity: the ability to *mediate* between them, to carry messages, to create the structures of meaning through which experience becomes intelligible.

In nature, Air is the wind, the breath, the atmosphere. It is invisible yet all-pervading, gentle yet capable of devastating force. The Sword — Air's weapon — cuts, separates, discriminates: every act of naming is an act of division, and every thought is a blade that separates "this" from "not-this."

**Thoth Tarot:** The suit of Swords carries the element of Air. The elemental Air itself is attributed to The Fool (0) through the Hebrew letter Aleph — the third Mother Letter. Aleph means "Ox," the primal beast of burden, representing the enormous, undirected energy that precedes all intellectual structure. This is Air before it has been shaped into thought — the vacuum, the absolute Nothingness from which all intellectual construction must emerge. The three Air signs represent the three modes of intellectual activity: Gemini connects and communicates (Mutable), Libra balances and judges (Cardinal), and Aquarius fixes vision into universal principle (Fixed).

**Jungian Meaning:** In Jungian terms, Air corresponds to the *thinking function* — the psychic capacity that organizes experience through logic, analysis, and the construction of rational frameworks. Air is the Logos — the Word that creates reality by naming it, but also the Sword that wounds by dividing what was once whole. The shadow of Air is intellectual dissociation — the retreat into abstract thought as a defence against feeling, the substitution of analysis for experience, and the paralysis of a mind that can see all sides of a question but cannot commit to any.`
  },
  {
    name: 'Earth', symbol: '🜃', suits: 'Disks',
    signs: ['Taurus', 'Virgo', 'Capricorn'],
    colorVar: '--color-earth',
    description: `Earth is the material, stable, manifesting element — the body, practical life, and the physical world. It corresponds to the final letter Heh of the Tetragrammaton and the Qabalistic world of Assiah (Action). Earth is where the creative cycle completes itself: the fiery impulse (Yod), received by the watery vessel (Heh), projected through the airy intellect (Vau), finally crystallizes into tangible, material reality (Heh final). Earth is not the lowest element but the *culmination* — the point where spirit becomes flesh.

In nature, Earth is the mountain, the soil, the body itself. It is the densest and most resistant of the elements, but also the most patient and the most enduring. The New Aeon doctrine insists that Earth is not black (dead, inert, fallen) but Emerald Green — alive, sacred, the garden in which the Great Work is accomplished.

**Thoth Tarot:** The suit of Disks carries the element of Earth. Earth has no elemental Major Arcana of its own — the element of Spirit (also attributed to Shin/Fire) does double duty, reflecting the esoteric doctrine that the highest and lowest are ultimately identical. The Ace of Disks affirms this: it is simultaneously a glyph of Earth and of the Sun, asserting the identity of Sol and Terra. The three Earth signs represent the three modes of material engagement: Taurus sustains and accumulates (Fixed), Virgo refines and serves (Mutable), and Capricorn builds and governs (Cardinal). The Court Cards of Disks complete the Tetragrammaton — and the Princess of Disks, the very last Court Card, stands on the brink of transfiguration: the Daughter set upon the Throne of the Mother, awakening the Eld of the All-Father.

**Jungian Meaning:** In Jungian terms, Earth corresponds to the *sensation function* — the psychic capacity that perceives the immediate, concrete, physical reality of the present moment. Earth is the body's knowledge: the hand that knows the weight of a tool, the tongue that knows the taste of bread, the feet that know the ground. The shadow of Earth is materialism — the reduction of all reality to what can be touched, measured, and owned, and the denial of the spirit's reality. But Earth redeemed is the recognition that the body *is* the temple, that matter *is* sacred, and that the physical world — far from being a prison — is the arena in which the Great Work of individuation is ultimately accomplished.`
  },
];
