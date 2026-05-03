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
    planet: 'Primum Mobile (First Swirlings) / ♆ Neptune',
    pillar: 'Mildness',
    world: 'Atziluth',
    colorVar: '--seph-kether',
    x: 250, y: 55,
    pipCards: ['ace-of-wands', 'ace-of-cups', 'ace-of-swords', 'ace-of-disks'],
    description: `Kether is the Crown, the first and highest Sephirah — the dimensionless point from which all existence emanates. It is pure Being, undifferentiated consciousness, the root of all roots. It cannot be comprehended by the mind because it precedes the mind; it can only be approached through the annihilation of thought itself.

Kether is attributed to the Primum Mobile — the First Swirlings — the initial movement that precedes even the first distinction between subject and object. Some post-Crowley Kabbalists also place Neptune here, as the planet of boundless, pre-differentiated unity — the oceanic consciousness that precedes all form, mirroring Kether's nature as the state before boundaries exist.

**Jungian Meaning:** Kether corresponds to the Self in its most abstract and unknowable form — the origin point of the psyche that can never be directly observed, only inferred from its effects. It is unknowable for the same reason the eye cannot see itself: Kether is the subject behind every act of consciousness, the "observer" that precedes observation. The four Aces reside here as the seeds of the four elements — not yet fire, water, air, or earth, but the sheer capacity to become them, the way an infant carries the whole trajectory of a life before a single choice has been made. Developmentally, Kether is the psychic ground zero before the first "I" has formed — prior even to the distinction between self and world. The danger is mistaking any experience of Kether for Kether itself: every image the mind produces to represent the Absolute is, by definition, not the Absolute. It is the ultimate source and the ultimate mystery.`
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

**Jungian Meaning:** Chokmah is the first stirring of conscious awareness — the initial "I AM" that precedes all differentiation into specific thoughts, feelings, or perceptions. Where Kether is the psyche before it knows it exists, Chokmah is the moment of knowing — pure will surging outward with no object yet to land on. It corresponds to the Zodiac because the zodiacal wheel contains every possible archetype in potentia, the way Chokmah contains every possible thought before any single thought has crystallised. It is attributed to Uranus because Uranus shatters existing structures to release raw creative force — the same lightning-flash energy that breaks Kether's silence into the first cosmic impulse. The shadow of Chokmah is force that never consents to limitation: endless creative drive that refuses the discipline of form, the visionary who generates but never completes.`
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
    description: `Binah is Understanding — the 3rd Sephirah, the great dark Sea, the supernal Mother who receives the force of Chokmah and gives it form. She is Maat, Isis, the Virgin Mary — the feminine principle in its most exalted and terrible aspect. She is Saturn because form requires limitation: to become something specific, energy must accept the boundary of what it is not. Saturn's rings, time, structure, the womb and the tomb — all expressions of the same principle that creation and constraint are inseparable.

As the first Sephirah on the Pillar of Severity, Binah represents the receptive, feminine, form-giving principle. The four Threes reside here — the first stable structures of each element, the triangle formulated, the idea fertilised and pregnant with manifestation.

**Jungian Meaning:** Binah completes the Supernal Triad — the three Sephiroth above the Abyss. She is the Collective Unconscious in its most primordial aspect — the dark matrix from which all specific forms emerge. She is "dark" not because she is evil but because form-giving operates beneath awareness: we never witness the moment an archetype crystallises into an image, only the image itself. This is why Binah is called Understanding rather than Knowledge — understanding grasps the pattern behind appearances, the structural law that shapes experience before the ego encounters it. Developmentally, Binah is the psyche's first capacity to organise: the infant's dawning ability to sort the chaos of sensation into "mother," "hunger," "warmth" — raw Chokmah-energy constrained into categories that make experience survivable. The shadow of Binah is structure that has forgotten it serves life — rigidity, dogma, the letter of the law that kills the spirit it was meant to protect.`
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
    description: `Chesed is Mercy — the first Sephirah below the Abyss, the benevolent Father-King who organizes the raw archetypal energy of the Supernals into the first comprehensible structure. It is Jupiter: expansion, generosity, authority, law, and the establishment of order. Because it sits just below the Abyss, it is the highest point where abstract truth becomes something a human mind can actually hold — the place where the unknowable first becomes knowable.

As this threshold between the incomprehensible and the structured, Chesed represents the Demiurge — the organizing intelligence that builds a functioning universe out of formless potential. It does not create from nothing; it receives the lightning-flash from above and gives it shape, boundary, and law. The four Fours reside here — completion, stability, the solid foundation of manifested reality — because four is the first number that encloses space, the minimum needed for a stable structure.

**Jungian Meaning:** Chesed corresponds to the great organizing systems of the psyche — the internal frameworks of meaning (religion, philosophy, moral law) through which a person makes sense of existence. It is the benevolent aspect of the Father archetype: not the father who commands obedience, but the one who builds a house the family can live in. Developmentally, this is the moment when the individual moves beyond raw experience and begins constructing a worldview — a coherent story about what the world is and how one fits within it. The shadow of Chesed is the system that has become an end in itself: dogma, the benevolent authority that smothers by refusing to let anything exist outside its order.`
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
    description: `Geburah is Severity — the 5th Sephirah, the great destructive force that purges, corrects, and breaks down all that has become stagnant or corrupt. It is Mars: war, aggression, discipline, the surgeon's knife that cuts away diseased tissue so that the organism can survive. Its position directly opposite Chesed on the Tree is not accidental — every structure that Mercy builds eventually calcifies, and Severity exists to prevent that death-by-rigidity.

Geburah is not evil — it is the necessary counterbalance to Chesed's boundless mercy. Without Geburah, Chesed's generosity would dissolve all structure into shapeless indulgence; without Chesed, Geburah would destroy everything, including what deserves to live. The four Fives reside here — disruption, conflict, the revolutionary energy that shatters the stability of the Fours — because five breaks the closed symmetry of four, introducing the instability that forces movement and change.

**Jungian Meaning:** Geburah is the critical function of the psyche — the inner judge, the ruthless honesty that examines every construction of the Ego and asks whether it is still true, still alive, still worthy. It corresponds to the psychological necessity of disillusionment: the process by which outgrown beliefs, relationships, and self-images are stripped away so that something more authentic can replace them. Developmentally, this is every crisis that forces growth — the collapse of a worldview that seemed permanent, the loss that reveals what was real beneath what was merely comfortable. The shadow of Geburah is cruelty mistaken for honesty — destruction that has forgotten it serves life, the inner critic that tears down without any intention to rebuild.`
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
    description: `Tiphareth is Beauty — the Sun at the centre of the Tree, the harmonizing point where all forces meet and are reconciled. It is the Son, the Christ-centre, the heart of the system. More paths converge here than at any other Sephirah because it functions as the great mediator: everything above must pass through it to reach below, and everything below must pass through it to reach above. It is not merely central by convention — it is structurally the place where the whole Tree communicates with itself.

Tiphareth is the sphere of the Holy Guardian Angel — the personal experience of the divine that stands at the centre of the individuation process. Where Kether is the source of unity and Malkuth its final expression, Tiphareth is the living experience of that unity within a human life. The four Sixes reside here — victory, pleasure, science, success — the fullest balanced expression of each element, because six is the midpoint of the decimal Sephiroth and represents each force in its most harmonious, least distorted state.

**Jungian Meaning:** Tiphareth is the Self as experienced by the Ego — not the abstract, unknowable totality of Kether, but the lived centre of the personality, the sense of being whole and in genuine harmony with one's own nature. It is what Jung meant by individuation as a practical achievement: not perfection, but the conscious integration of opposing forces into something that holds together and feels real. Developmentally, this is the moment when a person stops living from a single fragment of themselves — persona, ambition, wound — and begins to live from the centre, where all of those fragments are acknowledged and balanced. The shadow of Tiphareth is spiritual inflation: mistaking the experience of the Self for identity with it, the mystic who believes they have become the Sun rather than recognizing they are illuminated by it.`
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
    description: `Netzach is Victory — the 7th Sephirah, the sphere of Venus, desire, emotion, passion, and the instinctual drive toward beauty and connection. It is the creative, sensual aspect of the psyche — the realm where abstract energies take on the warmth and colour of lived experience, because force at this level is no longer structural but personal: it wants something.

As the lowest Sephirah on the Pillar of Mercy, Netzach represents the expansive, desiring nature at its most subjective level. The four Sevens reside here — valour, debauch, futility, failure — and their troubled character reflects a real problem: desire without sufficient form to sustain it. The force has descended far enough to feel intensely but not far enough to think clearly about what it feels.

**Jungian Meaning:** Netzach corresponds to the feeling function and the Anima — the inner feminine that evaluates experience not through logic but through attraction and repulsion, beauty and ugliness, love and hate. This is why it governs art, devotion, and romantic longing: all are acts of valuation, the psyche declaring "this matters to me" before it can explain why. Developmentally, it is the child's discovery that the world is not neutral — that some things are beautiful and some things hurt — and the lifelong task of refining raw preference into genuine aesthetic and moral judgment.`
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
    description: `Hod is Splendour — the 8th Sephirah, the sphere of Mercury, intellect, language, communication, and the analytical mind. It is thought in its most practical and articulate form — the capacity to name, categorize, and transmit information. Where Netzach feels, Hod explains — and explanation is itself a kind of power, because to name a thing is to gain leverage over it.

As the lowest Sephirah on the Pillar of Severity, Hod represents the discriminating, analytical function at its most concrete level. The four Eights reside here — swiftness, indolence, interference, prudence — the energy refined into intellectual form but showing signs of exhaustion, because analysis by its nature divides and reduces: the more precisely you dissect experience, the further you move from the living whole.

**Jungian Meaning:** Hod corresponds to the thinking function — the rational mind that organizes, analyzes, and communicates. Together with Netzach (feeling), it forms the pair of functions through which the personality engages with the everyday world — one evaluates, the other explains, and healthy functioning requires both. The shadow of Hod is intellect severed from feeling: the mind that can categorize everything and value nothing, clever speech deployed not to illuminate but to evade. Mercury is traditionally both the messenger and the trickster for exactly this reason.`
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
    description: `Yesod is the Foundation — the 9th Sephirah, the sphere of the Moon, the unconscious, dreams, imagination, and the psychic infrastructure upon which the material world is built. It is the last Sephirah before Malkuth — the final filter through which all energy passes before manifesting in physical reality, which is why it governs both dreams and habits: each is a rehearsal for action that has not yet become flesh.

Yesod is the realm of the "astral light" — the plastic, ever-changing medium that shapes and is shaped by the forces above it. The four Nines reside here — strength, happiness, cruelty, gain — representing the fullest practical development of each element before final materialization. The Nines carry a sense of completion-almost-achieved because the energy has done everything except arrive.

**Jungian Meaning:** Yesod is the personal unconscious — the repository of habits, instincts, dreams, and automatic responses that forms the foundation of all conscious activity. The Moon's cyclical, reflective nature shows that this foundation is not static but constantly shifting, like the tides — because the unconscious does not store experience passively but actively reworks it, replaying and recombining material every night in dreams. Developmentally, it is everything the personality has learned to do without thinking: the body's rhythms, the emotional reflexes, the assumptions so deep they feel like reality rather than interpretation. Individuation requires making this invisible foundation partially visible — not to control it, but to stop being controlled by it.`
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
    description: `Malkuth is the Kingdom — the 10th and final Sephirah, the physical, material world where all the energies of the Tree come to rest in tangible manifestation. It is the Earth, the body, the here-and-now of incarnated existence. It depends from the other nine Sephiroth but is not directly in communication with them — which is why ordinary consciousness experiences matter as separate from spirit: not because it is, but because Malkuth receives its influences indirectly, through Yesod, and has forgotten the source.

Malkuth is traditionally divided into four quarters corresponding to the four elements, coloured citrine, olive, russet, and black. In the New Aeon, its primary colour is restored to Emerald Green — the recognition that matter is not dead but alive, not a prison but a garden. This is a doctrinal correction, not merely an aesthetic one: the old Aeon treated incarnation as punishment, the new one treats it as opportunity.

The four Tens reside here — oppression, satiety, ruin, wealth — the force completely expended, showing both the achievement and the exhaustion of full materialization. Their heavy character reflects a genuine paradox: to fully manifest is also to fully solidify, and what is solid cannot easily change. But the doctrine of the revolving formula (the Daughter set upon the Throne of the Mother) means that Malkuth is always on the brink of returning to Kether — completion contains the seed of renewal.

**Jungian Meaning:** Malkuth is the Ego's everyday experience of physical reality — the body, the senses, the material conditions of life. It is the ground on which the entire individuation process must ultimately stand, because insight that does not eventually change how a person lives, works, and relates to the physical world remains abstract — impressive perhaps, but incomplete. The Kingdom is called the Kingdom because it is where sovereignty is actually exercised: not in vision but in conduct, not in the upper Sephiroth but here.`
  }
];

// Daath — the hidden Sephirah (not numbered, sits in the Abyss)
export const daath = {
  name: 'Daath',
  hebrew: 'דעת',
  meaning: 'Knowledge',
  x: 250, y: 178,
  description: `Daath is Knowledge — the hidden, unnumbered Sephirah that sits in the Abyss between the Supernal Triad and the lower seven. It is not truly a Sephirah but a *hole* in the Tree — the place where the Abyss yawns, where the ordered structure of emanation breaks down.

Daath represents the experience of crossing the Abyss — the terrifying dissolution of the Ego that is required for genuine spiritual attainment. It is the "false crown" that tempts the Adept with the illusion of Knowledge (as opposed to the genuine Understanding of Binah) — false because knowledge without understanding is mere accumulation, a collection of facts that never cohere into wisdom. Those who fail at the crossing become "Black Brothers" — trapped in Daath, possessing knowledge without understanding, power without wisdom. Some modern Kabbalists place Pluto here — the planet of total, irreversible transformation that annihilates everything inauthentic. Pluto's demand for absolute honesty mirrors Daath's function as the void that swallows all pretension.

**Jungian Meaning:** Daath corresponds to the experience of psychic dissolution — the breakdown of all categories, all certainties, all structures of meaning — that precedes genuine transformation. This dissolution is necessary because the ego's existing framework was built to navigate ordinary life; it cannot cross into transpersonal awareness while still intact, any more than a caterpillar can fly without first becoming liquid. It is the dark night of the soul at its most extreme — the point where every identity, every story the self tells about itself, is stripped away, and what remains is either nothing or everything. The "Black Brother" is the Jungian parallel of an individuation that fails at the critical threshold: the ego, terrified of annihilation, reassembles itself around its own knowledge and declares itself God — inflation masquerading as enlightenment, the shadow of the Self mistaken for the Self.`
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
    description: `Atziluth is the World of Emanation — the highest, most abstract, most divine of the four worlds. It corresponds to the element of Fire and to the suit of Wands. Only Kether truly belongs to Atziluth, because emanation by definition precedes differentiation: this is the world of pure archetypes that exist before and beyond all manifestation.

In Atziluth, the divine names are expressed in their purest form. The energy here is so exalted that it cannot be perceived by any human faculty — it can only be inferred from its effects on the worlds below, the way a cause is known only through its consequences. Atziluth is the realm of the Yod of Tetragrammaton — the initial creative spark, the Father's seed — because Yod is the smallest letter, the dimensionless point from which all extension proceeds.

**Jungian Meaning:** Atziluth corresponds to the deepest layer of the Collective Unconscious — the realm of the archetypes in themselves, prior to any specific manifestation in dream, myth, or psychological experience. Jung insisted these archetypes can never be observed directly, only through their distorted reflections in image and emotion. This is why Atziluth is assigned to Fire: it is pure energy without form, the psychic equivalent of a drive that has not yet found its object.`
  },
  {
    name: 'Briah',
    hebrew: 'בריאה',
    meaning: 'The Creative World — Creation',
    element: 'Water',
    elementSymbol: '🜄',
    colorVar: '--color-water',
    sephiroth: [2, 3],
    description: `Briah is the World of Creation — the realm where the pure archetypes of Atziluth first take on distinct form. It corresponds to the element of Water and to the suit of Cups. Chokmah and Binah belong to Briah — the supernal Father and Mother — because creation requires polarity: a force and something to receive it.

In Briah, the Archangels operate — the great creative intelligences that give shape to the divine will. The energy here is still supernal, still above the Abyss, but it has differentiated into two fundamental principles: the active and projecting (Chokmah) and the receptive and form-giving (Binah). Water is assigned here because water is the first element capable of holding a reflection — and Briah is where the formless first sees its own image.

**Jungian Meaning:** Briah corresponds to the level of the Collective Unconscious where archetypes first begin to take on recognizable form — the Great Mother, the Wise Old Man, the Divine Child. These are not yet personal memories or individual complexes; they are the universal moulds into which all human experience is poured. Briah is why a child who has never heard a myth can still dream of dragons — the forms exist before the individual encounters them.`
  },
  {
    name: 'Yetzirah',
    hebrew: 'יצירה',
    meaning: 'The Formative World — Formation',
    element: 'Air',
    elementSymbol: '🜁',
    colorVar: '--color-air',
    sephiroth: [4, 5, 6, 7, 8, 9],
    description: `Yetzirah is the World of Formation — the realm where the archetypal forms of Briah are elaborated into the complex, detailed structures that will eventually manifest in the physical world. It corresponds to the element of Air and to the suit of Swords. The six Sephiroth from Chesed to Yesod belong to Yetzirah, because formation is not a single act but an extended process of refinement, negotiation, and balance.

This is the world of the Angels — the specific intelligences that carry out the detailed work of creation. It is also the world of the Ruach — the intellect, the personality in its psychological sense. Most of the Tree's complexity resides here: the interplay of mercy and severity, expansion and contraction, desire and analysis. Air is assigned because thought mediates between impulse and act, shaping raw energy into workable plans.

**Jungian Meaning:** Yetzirah corresponds to the personal unconscious and the Ego — the level of the psyche where universal archetypes are translated into specific complexes, habits, relationships, and beliefs. A person does not encounter "the Mother" in the abstract; they encounter their mother, and from that encounter a complex forms. This is where individuation actually takes place, because individuation is precisely the work of making the unconscious pattern conscious — pulling the Angel, so to speak, into the light of Air.`
  },
  {
    name: 'Assiah',
    hebrew: 'עשיה',
    meaning: 'The Material World — Action',
    element: 'Earth',
    elementSymbol: '🜃',
    colorVar: '--color-earth',
    sephiroth: [10],
    description: `Assiah is the World of Action — the physical, material world of incarnated existence. It corresponds to the element of Earth and to the suit of Disks. Only Malkuth belongs to Assiah — the Kingdom, the body, the here-and-now of sensory experience — because matter is where the entire chain of emanation finally comes to rest and becomes real.

In Assiah, the shells (Qliphoth) are most active — the broken, unbalanced forces that represent the shadow-side of creation — because materiality, being furthest from the source, is most vulnerable to distortion. But Assiah is also the world where the Great Work is ultimately accomplished. The New Aeon doctrine insists that Assiah is not a prison but a garden — that matter is sacred, the body a temple, and the physical world the proper arena for spiritual achievement, precisely because only here can an abstraction be tested against reality.

**Jungian Meaning:** Assiah corresponds to the Ego's everyday experience of physical reality — but also to the profound recognition that this everyday reality, fully embraced, is itself the ground of transformation. Jung made the same point when he argued that individuation does not happen in retreat from the world but through engaged, embodied life. The mystic who flees the body is still split; wholeness requires that the highest insight be carried into the simplest act.`
  }
];

// The Three Pillars
export const pillars = [
  {
    name: 'Pillar of Severity',
    hebrew: 'עמוד הדין',
    x: 120,
    sephiroth: [3, 5, 8],
    description: `The Pillar of Severity is the great limiting column of the Tree — the principle that says no, that gives shape by refusing, that defines a thing by drawing its boundary. It is the left-hand pillar (עמוד הדין, literally "Pillar of Judgement"), feminine and receptive in polarity, and its work is restriction: turning unbounded force into something specific, structured, and therefore real.

Three Sephiroth stand on this column — Binah (Saturn), Geburah (Mars), and Hod (Mercury) — and they form a coherent descent of the form-giving principle through three octaves. Binah is form at its most cosmic: the Great Sea that imposes shape on the supernal Father's outpouring. Geburah is form as judgement and severance: Mars cutting away what cannot stand. Hod is form as analysis: Mercury dividing experience into nameable categories. Each is a more concrete expression of the same gesture — limitation in service of definition. Without the opposing Pillar of Mercy to feed it raw force, this column would have nothing to shape; without it, Mercy would dissipate into formlessness.

**Jungian Meaning:** The Pillar of Severity corresponds to the discriminating function of the psyche — the part that judges, separates, and says "this, not that." It is the work of consciousness drawing a line around the self, the inner critic at its healthiest, the necessary cruelty of saying no to one possibility so another can become real. Every act of individuation is an act of severity: you cannot become someone in particular without ceasing to be everyone in general.`,
  },
  {
    name: 'Pillar of Mildness',
    hebrew: 'עמוד הרחמים',
    x: 250,
    sephiroth: [1, 6, 9, 10],
    description: `The Pillar of Mildness is the central column of the Tree — the axis of equilibrium that runs straight down its spine, mediating between force and form. Its Hebrew name (עמוד הרחמים) translates literally as "Pillar of Mercy," but the tradition calls it Mildness or Equilibrium because its function is not active mercy but reconciliation: it is the path of moderation, the still axis around which the two outer pillars revolve.

Four Sephiroth — Kether, Tiphareth (Sun), Yesod (Moon), and Malkuth (Earth) — stand on this column, with Daath hidden in the Abyss between Kether and Tiphareth. Together they form the descent of pure consciousness through every level of being: from the unmanifest crown, through the solar self at the heart of the Tree, through the lunar foundation that gathers the lower forces, down into the kingdom of incarnation. These Sephiroth share no single planet because they are the column that synthesises every planet — the place where the polar opposition of Mercy and Severity is held, balanced, and resolved.

**Jungian Meaning:** The Pillar of Mildness is the axis of individuation itself — the path Jung called the transcendent function, where opposites are not chosen between but held together until a third thing emerges. Tiphareth at its centre is the Self: the integrating principle that mediates between every pair of contraries the psyche generates. To walk this pillar is to refuse both the over-control of Severity and the over-expansion of Mercy, and instead to grow into the person who can contain them both.`,
  },
  {
    name: 'Pillar of Mercy',
    hebrew: 'עמוד החסד',
    x: 380,
    sephiroth: [2, 4, 7],
    description: `The Pillar of Mercy is the great expansive column of the Tree — the principle that says yes, that gives by overflowing, that creates by reaching outward. It is the right-hand pillar (עמוד החסד, literally "Pillar of Loving-kindness"), masculine and projecting in polarity, and its work is force: the unbounded outpouring of energy that must occur before any form can be imposed upon it.

Three Sephiroth stand on this column — Chokmah (Uranus and the Zodiac), Chesed (Jupiter), and Netzach (Venus) — and they form a coherent descent of the force-giving principle through three octaves. Chokmah is force at its most cosmic: the supernal Father's lightning-flash of pure dynamic will. Chesed is force as benevolent rulership: Jupiter's expansive generosity, the king who gives because he has more than enough. Netzach is force as desire and attraction: Venus reaching outward toward what she loves. Each is a more concrete expression of the same gesture — expansion in service of becoming. Without the opposing Pillar of Severity to constrain it, this column would dissipate; without it, Severity would have nothing to limit.

**Jungian Meaning:** The Pillar of Mercy corresponds to the libidinal, outward-flowing function of the psyche — the part that desires, that loves, that opens toward the world and reaches for connection. It is Eros in the broadest Jungian sense: the principle of relatedness, the urge that draws the self out of isolation and into participation with what is other. Every act of growth begins as an act of mercy — the willingness to expand beyond what you already are.`,
  },
];

// The Abyss
export const abyss = {
  y: 235,
  description: `The Abyss is the great gulf that separates the Supernal Triad (Kether, Chokmah, Binah) from the lower seven Sephiroth. It cannot be crossed by the intellect or the personality — only by the complete annihilation of the Ego — because the structures that make ordinary experience coherent are precisely what prevent access to what lies beyond them.

In the Abyss dwells Choronzon — the Demon of Dispersion, the lord of chaos and dissolution. Choronzon does not attack from outside; he is the Ego's own fragmentation turned against itself, every partial identity demanding to be the whole. The Adept who attempts the crossing must surrender everything — every attachment, every identity, every certainty — or be trapped in the false Sephirah of Daath, possessing knowledge without understanding, which is to say: holding the map while refusing to enter the territory.

**Jungian Meaning:** The Abyss represents the boundary between the personal and the transpersonal — the point where the Ego's structures of meaning collapse entirely. Jung encountered this boundary during his own confrontation with the unconscious in 1913–14 and recognized that the outcome is not guaranteed: the individual either achieves genuine transformation or fragments into psychosis. The difference is not courage but surrender — the Ego that tries to cross the Abyss while remaining intact becomes Choronzon, endlessly dispersing. The one that consents to die is reconstituted on the other side as something larger than a self.`
};
