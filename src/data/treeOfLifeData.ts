// ============================================
// Tree of Life — Sephiroth, Paths, and Worlds
// ============================================

export interface Sephirah {
  number: number;
  name: string;
  hebrew: string;
  meaning: string;
  planet: string;
  pillar: 'Severity' | 'Mildness' | 'Mercy';
  world: 'Atziluth' | 'Briah' | 'Yetzirah' | 'Assiah';
  colorVar: string;     // CSS variable for the Sephirah's color
  x: number;            // SVG x position (in viewBox units)
  y: number;            // SVG y position
  pipCards: string[];    // IDs of the pip cards that sit on this Sephirah
  description: string;
}

export interface TreePath {
  number: number;        // Path number (11-32)
  from: number;          // Sephirah number
  to: number;            // Sephirah number
  cardId: string;        // Tarot card ID
  cardName: string;
  hebrewLetter: string;
  letterMeaning: string;
  romanNumeral: string;  // Major Arcana number
  astrology: string;
}

export interface QabalisticWorld {
  name: string;
  hebrew: string;
  meaning: string;
  element: string;
  elementSymbol: string;
  colorVar: string;
  sephiroth: number[];
  description: string;
}

// ============================================
// SVG Coordinate System — viewBox 0 0 500 720
// ============================================
// Three Pillars:
//   Left (Severity):  x = 120
//   Center (Mildness): x = 250
//   Right (Mercy):    x = 380

export const sephiroth: Sephirah[] = [
  {
    number: 1,
    name: 'Kether',
    hebrew: 'כתר',
    meaning: 'Crown',
    planet: 'Primum Mobile (First Swirlings)',
    pillar: 'Mildness',
    world: 'Atziluth',
    colorVar: '--seph-kether',
    x: 250, y: 55,
    pipCards: ['ace-of-wands', 'ace-of-cups', 'ace-of-swords', 'ace-of-disks'],
    description: `Kether is the Crown, the first and highest Sephirah — the dimensionless point from which all existence emanates. It is pure Being, undifferentiated consciousness, the root of all roots. It cannot be comprehended by the mind because it precedes the mind; it can only be approached through the annihilation of thought itself.

In Jungian terms, Kether corresponds to the Self in its most abstract and unknowable form — the origin point of the psyche that can never be directly observed, only inferred from its effects. The four Aces reside here as the seeds of the four elements, containing within them the entire Tree in potential but not yet in manifestation.

Kether is attributed to the Primum Mobile — the First Swirlings — the initial movement that precedes even the first distinction between subject and object. It is the ultimate source and the ultimate mystery.`
  },
  {
    number: 2,
    name: 'Chokmah',
    hebrew: 'חכמה',
    meaning: 'Wisdom',
    planet: '♅ Uranus / The Zodiac',
    pillar: 'Mercy',
    world: 'Briah',
    colorVar: '--ctp-overlay2',
    x: 380, y: 140,
    pipCards: ['two-of-wands', 'two-of-cups', 'two-of-swords', 'two-of-disks'],
    description: `Chokmah is Wisdom — the 2nd Sephirah, the first flash of creative energy emerging from the unknowable unity of Kether. It is the supernal Father, the great stimulating force of the Universe, the Logos — the Word that initiates all creation. It is pure dynamic force without form.

Chokmah is attributed to the Zodiac as a whole (the sphere of the fixed stars) and to the planet Uranus. As the first Sephirah on the Pillar of Mercy, it represents the active, masculine, projecting principle in its highest form. The four Twos reside here — the first real manifestation of each element in its original, uncontaminated purity.

In Jungian terms, Chokmah is the first stirring of conscious awareness — the initial "I AM" that precedes all differentiation into specific thoughts, feelings, or perceptions.`
  },
  {
    number: 3,
    name: 'Binah',
    hebrew: 'בינה',
    meaning: 'Understanding',
    planet: '♄ Saturn',
    pillar: 'Severity',
    world: 'Briah',
    colorVar: '--seph-binah',
    x: 120, y: 140,
    pipCards: ['three-of-wands', 'three-of-cups', 'three-of-swords', 'three-of-disks'],
    description: `Binah is Understanding — the 3rd Sephirah, the great dark Sea, the supernal Mother who receives the force of Chokmah and gives it form. She is Maat, Isis, the Virgin Mary — the feminine principle in its most exalted and terrible aspect. She is Saturn: limitation, time, structure, the womb and the tomb.

As the first Sephirah on the Pillar of Severity, Binah represents the receptive, feminine, form-giving principle. The four Threes reside here — the first stable structures of each element, the triangle formulated, the idea fertilized and pregnant with manifestation.

Binah completes the Supernal Triad — the three Sephiroth above the Abyss. Together with Kether and Chokmah, she represents the realm of pure archetypes that transcend human understanding. In Jungian terms, Binah is the Collective Unconscious in its most primordial aspect — the dark matrix from which all specific forms emerge.`
  },
  {
    number: 4,
    name: 'Chesed',
    hebrew: 'חסד',
    meaning: 'Mercy',
    planet: '♃ Jupiter',
    pillar: 'Mercy',
    world: 'Yetzirah',
    colorVar: '--ctp-blue',
    x: 380, y: 300,
    pipCards: ['four-of-wands', 'four-of-cups', 'four-of-swords', 'four-of-disks'],
    description: `Chesed is Mercy — the first Sephirah below the Abyss, the benevolent Father-King who organizes the raw archetypal energy of the Supernals into the first comprehensible structure. It is Jupiter: expansion, generosity, authority, law, and the establishment of order.

As the highest idea that can be grasped by the human intellect, Chesed represents the Demiurge — the organizing intelligence that builds a functioning universe out of the formless potential above. The four Fours reside here — completion, stability, the solid foundation of manifested reality.

In Jungian terms, Chesed corresponds to the organized systems of meaning (religion, philosophy, law) that give structure to the personality. It is the benevolent aspect of the Father archetype — the part of the psyche that establishes order not through force but through wisdom and generosity.`
  },
  {
    number: 5,
    name: 'Geburah',
    hebrew: 'גבורה',
    meaning: 'Severity',
    planet: '♂ Mars',
    pillar: 'Severity',
    world: 'Yetzirah',
    colorVar: '--ctp-red',
    x: 120, y: 300,
    pipCards: ['five-of-wands', 'five-of-cups', 'five-of-swords', 'five-of-disks'],
    description: `Geburah is Severity — the 5th Sephirah, the great destructive force that purges, corrects, and breaks down all that has become stagnant or corrupt. It is Mars: war, aggression, discipline, the surgeon's knife that cuts away diseased tissue so that the organism can survive.

Geburah is not evil — it is the necessary counterbalance to Chesed's boundless mercy. Without Geburah, Chesed's generosity would dissolve all structure into shapeless indulgence. The four Fives reside here — disruption, conflict, the revolutionary energy that shatters the stability of the Fours.

In Jungian terms, Geburah is the critical function — the inner judge, the ruthless honesty that examines every construction of the Ego and asks whether it is still true, still alive, still worthy. It is the destructive aspect of the Self that serves growth by destroying stagnation.`
  },
  {
    number: 6,
    name: 'Tiphareth',
    hebrew: 'תפארת',
    meaning: 'Beauty',
    planet: '☉ Sun',
    pillar: 'Mildness',
    world: 'Yetzirah',
    colorVar: '--ctp-yellow',
    x: 250, y: 385,
    pipCards: ['six-of-wands', 'six-of-cups', 'six-of-swords', 'six-of-disks'],
    description: `Tiphareth is Beauty — the Sun at the centre of the Tree, the harmonizing point where all forces meet and are reconciled. It is the Son, the Christ-centre, the heart of the system. More paths converge here than at any other Sephirah, making it the great mediator between the higher and lower worlds.

Tiphareth is the sphere of the Holy Guardian Angel — the personal experience of the divine that stands at the centre of the individuation process. The four Sixes reside here — victory, pleasure, science, success — the fullest balanced expression of each element.

In Jungian terms, Tiphareth is the Self as experienced by the Ego: not the abstract, unknowable Self of Kether, but the lived centre of the personality — the sense of being whole, balanced, and in harmony with one's own nature. It is the goal of individuation as a practical, liveable achievement.`
  },
  {
    number: 7,
    name: 'Netzach',
    hebrew: 'נצח',
    meaning: 'Victory',
    planet: '♀ Venus',
    pillar: 'Mercy',
    world: 'Yetzirah',
    colorVar: '--ctp-green',
    x: 380, y: 465,
    pipCards: ['seven-of-wands', 'seven-of-cups', 'seven-of-swords', 'seven-of-disks'],
    description: `Netzach is Victory — the 7th Sephirah, the sphere of Venus, desire, emotion, passion, and the instinctual drive toward beauty and connection. It is the creative, artistic, sensual aspect of the psyche — the realm where abstract energies begin to take on the warmth and colour of lived experience.

As the lowest Sephirah on the Pillar of Mercy, Netzach represents the expansive, desiring nature at its most personal and subjective level. The four Sevens reside here — valour, debauch, futility, failure — showing the weakening of the original force as it descends further from its source.

In Jungian terms, Netzach corresponds to the feeling function and the Anima — the inner feminine that evaluates experience not through logic but through attraction and repulsion, beauty and ugliness, love and hate.`
  },
  {
    number: 8,
    name: 'Hod',
    hebrew: 'הוד',
    meaning: 'Splendour',
    planet: '☿ Mercury',
    pillar: 'Severity',
    world: 'Yetzirah',
    colorVar: '--ctp-peach',
    x: 120, y: 465,
    pipCards: ['eight-of-wands', 'eight-of-cups', 'eight-of-swords', 'eight-of-disks'],
    description: `Hod is Splendour — the 8th Sephirah, the sphere of Mercury, intellect, language, communication, and the analytical mind. It is the realm of thought in its most practical and articulate form — the capacity to name, categorize, and transmit information.

As the lowest Sephirah on the Pillar of Severity, Hod represents the discriminating, analytical function at its most concrete level. The four Eights reside here — swiftness, indolence, interference, prudence — the energy refined into intellectual form but showing signs of exhaustion.

In Jungian terms, Hod corresponds to the thinking function — the rational mind that organizes, analyzes, and communicates. Together with Netzach (feeling), it forms the pair of psychological functions through which the personality engages with the everyday world.`
  },
  {
    number: 9,
    name: 'Yesod',
    hebrew: 'יסוד',
    meaning: 'Foundation',
    planet: '☽ Moon',
    pillar: 'Mildness',
    world: 'Yetzirah',
    colorVar: '--ctp-mauve',
    x: 250, y: 545,
    pipCards: ['nine-of-wands', 'nine-of-cups', 'nine-of-swords', 'nine-of-disks'],
    description: `Yesod is the Foundation — the sphere of the Moon, the unconscious, dreams, imagination, and the psychic infrastructure upon which the material world is built. It is the last Sephirah before Malkuth — the final filter through which all energy passes before manifesting in physical reality.

Yesod is the realm of the "astral light" — the plastic, ever-changing medium that shapes and is shaped by the forces above it. The four Nines reside here — strength, happiness, cruelty, gain — representing the fullest practical development of each element before final materialization.

In Jungian terms, Yesod is the personal unconscious — the repository of habits, instincts, dreams, and automatic responses that forms the foundation of all conscious activity. The Moon's cyclical, reflective nature shows that this foundation is not static but constantly shifting, like the tides.`
  },
  {
    number: 10,
    name: 'Malkuth',
    hebrew: 'מלכות',
    meaning: 'Kingdom',
    planet: '🜃 Earth / ♁ Terra',
    pillar: 'Mildness',
    world: 'Assiah',
    colorVar: '--ctp-flamingo',
    x: 250, y: 660,
    pipCards: ['ten-of-wands', 'ten-of-cups', 'ten-of-swords', 'ten-of-disks'],
    description: `Malkuth is the Kingdom — the physical, material world, the final Sephirah where all the energies of the Tree come to rest in tangible manifestation. It is the Earth, the body, the here-and-now of incarnated existence. It depends from the other nine Sephiroth but is not directly in communication with them.

Malkuth is traditionally divided into four quarters corresponding to the four elements, coloured citrine, olive, russet, and black. In the New Aeon, its primary colour is restored to Emerald Green — the recognition that matter is not dead but alive, not a prison but a garden.

The four Tens reside here — oppression, satiety, ruin, wealth — the force completely expended, showing both the achievement and the exhaustion of full materialization. But the doctrine of the revolving formula (the Daughter set upon the Throne of the Mother) means that Malkuth is always on the brink of returning to Kether.

In Jungian terms, Malkuth is the Ego's everyday experience of physical reality — the body, the world, the material conditions of life. It is the ground on which the entire individuation process must ultimately stand.`
  }
];

// Daath — the hidden Sephirah (not numbered, sits in the Abyss)
export const daath = {
  name: 'Daath',
  hebrew: 'דעת',
  meaning: 'Knowledge',
  x: 250, y: 178,
  description: `Daath is Knowledge — the hidden, unnumbered Sephirah that sits in the Abyss between the Supernal Triad and the lower seven. It is not truly a Sephirah but a *hole* in the Tree — the place where the Abyss yawns, where the ordered structure of emanation breaks down.

Daath represents the experience of crossing the Abyss — the terrifying dissolution of the Ego that is required for genuine spiritual attainment. It is the "false crown" that tempts the Adept with the illusion of Knowledge (as opposed to the genuine Understanding of Binah). Those who fail at the crossing become "Black Brothers" — trapped in Daath, possessing knowledge without understanding, power without wisdom.

In Jungian terms, Daath corresponds to the experience of psychic dissolution — the breakdown of all categories, all certainties, all structures of meaning — that precedes genuine transformation. It is the dark night of the soul at its most extreme.`
};

// ============================================
// The 22 Paths (Major Arcana on the Tree)
// ============================================

export const paths: TreePath[] = [
  { number: 11, from: 1, to: 2, cardId: '0-the-fool', cardName: 'The Fool', hebrewLetter: 'א', letterMeaning: 'Aleph (Ox)', romanNumeral: '0', astrology: '🜁 Air' },
  { number: 12, from: 1, to: 3, cardId: '1-the-magus', cardName: 'The Magus', hebrewLetter: 'ב', letterMeaning: 'Beth (House)', romanNumeral: 'I', astrology: '☿ Mercury' },
  { number: 13, from: 1, to: 6, cardId: '2-the-high-priestess', cardName: 'The High Priestess', hebrewLetter: 'ג', letterMeaning: 'Gimel (Camel)', romanNumeral: 'II', astrology: '☽ Moon' },
  { number: 14, from: 2, to: 3, cardId: '3-the-empress', cardName: 'The Empress', hebrewLetter: 'ד', letterMeaning: 'Daleth (Door)', romanNumeral: 'III', astrology: '♀ Venus' },
  { number: 15, from: 2, to: 6, cardId: '17-the-star', cardName: 'The Star', hebrewLetter: 'ה', letterMeaning: 'Heh (Window)', romanNumeral: 'XVII', astrology: '♒ Aquarius' },
  { number: 16, from: 2, to: 4, cardId: '5-the-hierophant', cardName: 'The Hierophant', hebrewLetter: 'ו', letterMeaning: 'Vau (Nail)', romanNumeral: 'V', astrology: '♉ Taurus' },
  { number: 17, from: 3, to: 6, cardId: '6-the-lovers', cardName: 'The Lovers', hebrewLetter: 'ז', letterMeaning: 'Zain (Sword)', romanNumeral: 'VI', astrology: '♊ Gemini' },
  { number: 18, from: 3, to: 5, cardId: '7-the-chariot', cardName: 'The Chariot', hebrewLetter: 'ח', letterMeaning: 'Cheth (Fence)', romanNumeral: 'VII', astrology: '♋ Cancer' },
  { number: 19, from: 4, to: 5, cardId: '11-lust', cardName: 'Lust', hebrewLetter: 'ט', letterMeaning: 'Teth (Serpent)', romanNumeral: 'XI', astrology: '♌ Leo' },
  { number: 20, from: 4, to: 6, cardId: '9-the-hermit', cardName: 'The Hermit', hebrewLetter: 'י', letterMeaning: 'Yod (Hand)', romanNumeral: 'IX', astrology: '♍ Virgo' },
  { number: 21, from: 4, to: 7, cardId: '10-fortune', cardName: 'Fortune', hebrewLetter: 'כ', letterMeaning: 'Kaph (Palm)', romanNumeral: 'X', astrology: '♃ Jupiter' },
  { number: 22, from: 5, to: 6, cardId: '8-adjustment', cardName: 'Adjustment', hebrewLetter: 'ל', letterMeaning: 'Lamed (Ox Goad)', romanNumeral: 'VIII', astrology: '♎ Libra' },
  { number: 23, from: 5, to: 8, cardId: '12-the-hanged-man', cardName: 'The Hanged Man', hebrewLetter: 'מ', letterMeaning: 'Mem (Water)', romanNumeral: 'XII', astrology: '🜄 Water' },
  { number: 24, from: 6, to: 7, cardId: '13-death', cardName: 'Death', hebrewLetter: 'נ', letterMeaning: 'Nun (Fish)', romanNumeral: 'XIII', astrology: '♏ Scorpio' },
  { number: 25, from: 6, to: 9, cardId: '14-art', cardName: 'Art', hebrewLetter: 'ס', letterMeaning: 'Samekh (Prop)', romanNumeral: 'XIV', astrology: '♐ Sagittarius' },
  { number: 26, from: 6, to: 8, cardId: '15-the-devil', cardName: 'The Devil', hebrewLetter: 'ע', letterMeaning: 'Ayin (Eye)', romanNumeral: 'XV', astrology: '♑ Capricorn' },
  { number: 27, from: 7, to: 8, cardId: '16-the-tower', cardName: 'The Tower', hebrewLetter: 'פ', letterMeaning: 'Peh (Mouth)', romanNumeral: 'XVI', astrology: '♂ Mars' },
  { number: 28, from: 7, to: 9, cardId: '4-the-emperor', cardName: 'The Emperor', hebrewLetter: 'צ', letterMeaning: 'Tzaddi (Fish-hook)', romanNumeral: 'IV', astrology: '♈ Aries' },
  { number: 29, from: 7, to: 10, cardId: '18-the-moon', cardName: 'The Moon', hebrewLetter: 'ק', letterMeaning: 'Qoph (Back of Head)', romanNumeral: 'XVIII', astrology: '♓ Pisces' },
  { number: 30, from: 8, to: 9, cardId: '19-the-sun', cardName: 'The Sun', hebrewLetter: 'ר', letterMeaning: 'Resh (Head)', romanNumeral: 'XIX', astrology: '☉ Sun' },
  { number: 31, from: 8, to: 10, cardId: '20-the-aeon', cardName: 'The Aeon', hebrewLetter: 'ש', letterMeaning: 'Shin (Tooth)', romanNumeral: 'XX', astrology: '🜂 Fire' },
  { number: 32, from: 9, to: 10, cardId: '21-the-universe', cardName: 'The Universe', hebrewLetter: 'ת', letterMeaning: 'Tau (Cross)', romanNumeral: 'XXI', astrology: '♄ Saturn' },
];

// ============================================
// The Four Worlds
// ============================================

export const worlds: QabalisticWorld[] = [
  {
    name: 'Atziluth',
    hebrew: 'אצילות',
    meaning: 'The Archetypal World — Emanation',
    element: 'Fire',
    elementSymbol: '🜂',
    colorVar: '--color-fire',
    sephiroth: [1],
    description: `Atziluth is the World of Emanation — the highest, most abstract, most divine of the four worlds. It corresponds to the element of Fire and to the suit of Wands. Only Kether truly belongs to Atziluth, for it is the world of pure archetypes that exist before and beyond all manifestation.

In Atziluth, the divine names are expressed in their purest form. The energy here is so exalted that it cannot be perceived by any human faculty — it can only be inferred from its effects on the worlds below. Atziluth is the realm of the Yod of Tetragrammaton — the initial creative spark, the Father's seed.

In Jungian terms, Atziluth corresponds to the deepest layer of the Collective Unconscious — the realm of the archetypes in themselves, prior to any specific manifestation in dream, myth, or psychological experience.`
  },
  {
    name: 'Briah',
    hebrew: 'בריאה',
    meaning: 'The Creative World — Creation',
    element: 'Water',
    elementSymbol: '🜄',
    colorVar: '--color-water',
    sephiroth: [2, 3],
    description: `Briah is the World of Creation — the realm where the pure archetypes of Atziluth first take on distinct form. It corresponds to the element of Water and to the suit of Cups. Chokmah and Binah belong to Briah — the supernal Father and Mother whose union generates all subsequent manifestation.

In Briah, the Archangels operate — the great creative intelligences that give shape to the divine will. The energy here is still supernal, still above the Abyss, but it has differentiated into the two fundamental principles: the active/projecting (Chokmah) and the receptive/form-giving (Binah).

In Jungian terms, Briah corresponds to the level of the Collective Unconscious where archetypes first begin to take on recognizable form — the realm of the Great Mother, the Wise Old Man, the Divine Child, and the other primordial images that shape all human experience.`
  },
  {
    name: 'Yetzirah',
    hebrew: 'יצירה',
    meaning: 'The Formative World — Formation',
    element: 'Air',
    elementSymbol: '🜁',
    colorVar: '--color-air',
    sephiroth: [4, 5, 6, 7, 8, 9],
    description: `Yetzirah is the World of Formation — the realm where the archetypal forms of Briah are elaborated into the complex, detailed structures that will eventually manifest in the physical world. It corresponds to the element of Air and to the suit of Swords. The six Sephiroth from Chesed to Yesod belong to Yetzirah.

This is the world of the Angels — the specific intelligences that carry out the detailed work of creation. It is also the world of the Ruach — the intellect, the rational mind, the personality in its psychological sense. Most of the Tree's complexity resides in Yetzirah: the interplay of mercy and severity, expansion and contraction, desire and analysis.

In Jungian terms, Yetzirah corresponds to the personal unconscious and the Ego — the level of the psyche where archetypes are translated into specific complexes, beliefs, relationships, and patterns of behaviour. It is the world where individuation actually takes place.`
  },
  {
    name: 'Assiah',
    hebrew: 'עשיה',
    meaning: 'The Material World — Action',
    element: 'Earth',
    elementSymbol: '🜃',
    colorVar: '--color-earth',
    sephiroth: [10],
    description: `Assiah is the World of Action — the physical, material world of incarnated existence. It corresponds to the element of Earth and to the suit of Disks. Only Malkuth belongs to Assiah — the Kingdom, the body, the here-and-now of sensory experience.

In Assiah, the shells (*Qliphoth*) are most active — the broken, unbalanced forces that represent the shadow-side of creation. But Assiah is also the world where the Great Work is ultimately accomplished, for it is only in the material world that spirit can be fully realized. The New Aeon doctrine insists that Assiah is not a prison but a garden — that matter is sacred, that the body is a temple, and that the physical world is the proper arena for spiritual achievement.

In Jungian terms, Assiah corresponds to the Ego's everyday experience of physical reality — but also to the profound recognition that this everyday reality, fully embraced, is itself the ground of transformation.`
  }
];

// The Three Pillars
export const pillars = [
  { name: 'Pillar of Severity', hebrew: 'עמוד הדין', x: 120, sephiroth: [3, 5, 8], description: 'The left pillar — the feminine, restrictive, form-giving principle. Binah (Saturn), Geburah (Mars), Hod (Mercury).' },
  { name: 'Pillar of Mildness', hebrew: 'עמוד הרחמים', x: 250, sephiroth: [1, 6, 9, 10], description: 'The middle pillar — the equilibrating, balancing principle. Kether, Tiphareth (Sun), Yesod (Moon), Malkuth (Earth).' },
  { name: 'Pillar of Mercy', hebrew: 'עמוד החסד', x: 380, sephiroth: [2, 4, 7], description: 'The right pillar — the masculine, expansive, force-projecting principle. Chokmah (Uranus), Chesed (Jupiter), Netzach (Venus).' },
];

// The Abyss
export const abyss = {
  y: 235,
  description: `The Abyss is the great gulf that separates the Supernal Triad (Kether, Chokmah, Binah) from the lower seven Sephiroth. It cannot be crossed by the intellect or the personality — only by the complete annihilation of the Ego.

In the Abyss dwells Choronzon — the Demon of Dispersion, the lord of chaos and dissolution. The Adept who attempts to cross the Abyss must surrender everything — every attachment, every identity, every certainty — or be trapped in the false Sephirah of Daath, possessing knowledge without understanding.

In Jungian terms, the Abyss represents the boundary between the personal and the transpersonal — the point where the Ego's structures of meaning collapse entirely, and the individual either achieves genuine transformation or fragments into psychosis.`
};
