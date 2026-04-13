// ============================================
// Universal Glossary — short definitions for
// all important terms used throughout the app
// ============================================

export interface GlossaryEntry {
  term: string;          // Display name (used for matching)
  shortDef: string;      // 2-3 sentence definition (can contain glossary term references wrapped in {curly braces})
  link?: string;         // Optional "See more" route
}

// {Term Name} in shortDef marks nested glossary links
// The GlossaryTerm component will parse these and render them as clickable

export const glossary: Record<string, GlossaryEntry> = {
  // === Sephiroth ===
  'Kether': {
    term: 'Kether',
    shortDef: 'The Crown — the 1st {Sephirah}, the dimensionless point from which all existence emanates. Pure undifferentiated being, attributed to the {Primum Mobile}. Holds the four Aces.',
    link: '/tree-of-life?view=sephirah&id=1',
  },
  'Chokmah': {
    term: 'Chokmah',
    shortDef: 'Wisdom — the 2nd {Sephirah}, the supernal Father. The first flash of creative energy, attributed to {Uranus} and the Zodiac. Holds the four Twos.',
    link: '/tree-of-life?view=sephirah&id=2',
  },
  'Binah': {
    term: 'Binah',
    shortDef: 'Understanding — the 3rd {Sephirah}, the supernal Mother, the Great Sea. The receptive feminine principle that gives form to force, attributed to {Saturn}. Holds the four Threes.',
    link: '/tree-of-life?view=sephirah&id=3',
  },
  'Chesed': {
    term: 'Chesed',
    shortDef: 'Mercy — the 4th {Sephirah}, the first below the {Abyss}. The benevolent Father-King, the Demiurge who organizes creation into its first comprehensible structure. Attributed to {Jupiter}. Holds the four Fours.',
    link: '/tree-of-life?view=sephirah&id=4',
  },
  'Geburah': {
    term: 'Geburah',
    shortDef: 'Severity — the 5th {Sephirah}. The great destructive force that purges and corrects. The surgeon\'s knife, the necessary counterbalance to {Chesed}. Attributed to {Mars}. Holds the four Fives.',
    link: '/tree-of-life?view=sephirah&id=5',
  },
  'Tiphareth': {
    term: 'Tiphareth',
    shortDef: 'Beauty — the 6th {Sephirah}, the Sun at the centre of the {Tree of Life}. The harmonizing point where all forces meet. The sphere of the Holy Guardian Angel. Attributed to the {Sun}. Holds the four Sixes.',
    link: '/tree-of-life?view=sephirah&id=6',
  },
  'Netzach': {
    term: 'Netzach',
    shortDef: 'Victory — the 7th {Sephirah}. The sphere of {Venus}, desire, emotion, and the instinctual drive toward beauty. Holds the four Sevens.',
    link: '/tree-of-life?view=sephirah&id=7',
  },
  'Hod': {
    term: 'Hod',
    shortDef: 'Splendour — the 8th {Sephirah}. The sphere of {Mercury}, intellect, language, and the analytical mind. Holds the four Eights.',
    link: '/tree-of-life?view=sephirah&id=8',
  },
  'Yesod': {
    term: 'Yesod',
    shortDef: 'Foundation — the 9th {Sephirah}. The sphere of the {Moon}, dreams, imagination, and the unconscious infrastructure of the psyche. Holds the four Nines.',
    link: '/tree-of-life?view=sephirah&id=9',
  },
  'Malkuth': {
    term: 'Malkuth',
    shortDef: 'The Kingdom — the 10th and final {Sephirah}. The physical, material world. Attributed to {Earth}. Holds the four Tens. The endpoint of the descent from spirit into matter.',
    link: '/tree-of-life?view=sephirah&id=10',
  },
  'Sephirah': {
    term: 'Sephirah',
    shortDef: 'A sphere or station on the {Tree of Life}. Plural: Sephiroth. The 10 Sephiroth are the emanations through which the divine manifests, from {Kether} (Crown) to {Malkuth} (Kingdom).',
    link: '/tree-of-life',
  },
  'Sephiroth': {
    term: 'Sephiroth',
    shortDef: 'The 10 spheres of the {Tree of Life} — the stations through which divine energy descends from {Kether} (Crown) to {Malkuth} (Kingdom). Each holds four pip cards, one from each suit.',
    link: '/tree-of-life',
  },

  // === Tree Structure ===
  'Tree of Life': {
    term: 'Tree of Life',
    shortDef: 'The Kabbalistic map of creation — 10 {Sephiroth} connected by 22 paths. The framework upon which the entire Thoth Tarot is built. Each path carries a Major Arcana card.',
    link: '/tree-of-life',
  },
  'Abyss': {
    term: 'Abyss',
    shortDef: 'The great gulf separating the Supernal Triad ({Kether}, {Chokmah}, {Binah}) from the lower seven {Sephiroth}. Can only be crossed by the complete dissolution of the Ego. {Daath} sits within it.',
    link: '/tree-of-life?view=abyss',
  },
  'Daath': {
    term: 'Daath',
    shortDef: 'Knowledge (דעת) — the hidden, unnumbered {Sephirah} in the {Abyss}. Represents knowledge without understanding — the temptation of intellectual mastery without genuine transformation.',
    link: '/tree-of-life?view=daath',
  },
  'Supernal Triad': {
    term: 'Supernal Triad',
    shortDef: 'The three highest {Sephiroth} — {Kether}, {Chokmah}, and {Binah} — which exist above the {Abyss}. They represent the realm of pure archetypes, beyond the reach of the ordinary mind.',
  },
  'Pillar of Severity': {
    term: 'Pillar of Severity',
    shortDef: 'The left column of the {Tree of Life} — the feminine, restrictive, form-giving principle. Contains {Binah} ({Saturn}), {Geburah} ({Mars}), and {Hod} ({Mercury}).',
    link: '/tree-of-life?view=pillar&name=Severity',
  },
  'Pillar of Mercy': {
    term: 'Pillar of Mercy',
    shortDef: 'The right column of the {Tree of Life} — the masculine, expansive, force-projecting principle. Contains {Chokmah} ({Uranus}), {Chesed} ({Jupiter}), and {Netzach} ({Venus}).',
    link: '/tree-of-life?view=pillar&name=Mercy',
  },
  'Pillar of Mildness': {
    term: 'Pillar of Mildness',
    shortDef: 'The central column of the {Tree of Life} — the equilibrating, balancing principle. Contains {Kether}, {Tiphareth} ({Sun}), {Yesod} ({Moon}), and {Malkuth} ({Earth}).',
    link: '/tree-of-life?view=pillar&name=Mildness',
  },

  // === Four Worlds ===
  'Atziluth': {
    term: 'Atziluth',
    shortDef: 'The Archetypal World — the highest of the {Four Worlds}, corresponding to Fire and the suit of Wands. Only {Kether} belongs here. The realm of pure divine emanation.',
    link: '/tree-of-life?view=world&name=Atziluth',
  },
  'Briah': {
    term: 'Briah',
    shortDef: 'The Creative World — the second of the {Four Worlds}, corresponding to Water and the suit of Cups. {Chokmah} and {Binah} belong here. The realm where archetypes first take form.',
    link: '/tree-of-life?view=world&name=Briah',
  },
  'Yetzirah': {
    term: 'Yetzirah',
    shortDef: 'The Formative World — the third of the {Four Worlds}, corresponding to Air and the suit of Swords. Contains {Chesed} through {Yesod}. The realm where forms are elaborated into detailed structures.',
    link: '/tree-of-life?view=world&name=Yetzirah',
  },
  'Assiah': {
    term: 'Assiah',
    shortDef: 'The Material World — the lowest of the {Four Worlds}, corresponding to {Earth} and the suit of Disks. Only {Malkuth} belongs here. The physical world of incarnated existence.',
    link: '/tree-of-life?view=world&name=Assiah',
  },
  'Four Worlds': {
    term: 'Four Worlds',
    shortDef: 'The four levels of reality in Kabbalah: {Atziluth} (Fire/Emanation), {Briah} (Water/Creation), {Yetzirah} (Air/Formation), and {Assiah} (Earth/Action). Each corresponds to an element and a suit of the Tarot.',
  },

  // === Planets ===
  'Sun': {
    term: 'Sun',
    shortDef: '☉ The Sun — the central luminary, attributed to {Tiphareth}. Represents consciousness, vitality, the integrated Self, and the creative source. Rules Leo.',
    link: '/astrology?view=planet&name=Sun',
  },
  'Moon': {
    term: 'Moon',
    shortDef: '☽ The Moon — attributed to {Yesod}. Represents the unconscious, dreams, imagination, cycles, and the reflective/receptive principle. Rules Cancer.',
    link: '/astrology?view=planet&name=Moon',
  },
  'Mercury': {
    term: 'Mercury',
    shortDef: '☿ Mercury — attributed to {Hod}. The messenger god, representing intellect, communication, language, and the capacity to translate between conscious and unconscious. Rules Gemini and Virgo.',
    link: '/astrology?view=planet&name=Mercury',
  },
  'Venus': {
    term: 'Venus',
    shortDef: '♀ Venus — attributed to {Netzach}. The principle of attraction, beauty, love, and the desire for connection. Rules Taurus and Libra.',
    link: '/astrology?view=planet&name=Venus',
  },
  'Mars': {
    term: 'Mars',
    shortDef: '♂ Mars — attributed to {Geburah}. The aggressive, destructive, purifying force. The energy of war, discipline, and the surgeon\'s knife. Rules Aries and Scorpio.',
    link: '/astrology?view=planet&name=Mars',
  },
  'Jupiter': {
    term: 'Jupiter',
    shortDef: '♃ Jupiter — attributed to {Chesed}. The planet of expansion, meaning, benevolence, and the ordering of creation. The Demiurge. Rules Sagittarius and Pisces.',
    link: '/astrology?view=planet&name=Jupiter',
  },
  'Saturn': {
    term: 'Saturn',
    shortDef: '♄ Saturn — attributed to {Binah}. The principle of limitation, time, structure, and form. The Great Mother in her restrictive aspect. Rules Capricorn and Aquarius.',
    link: '/astrology?view=planet&name=Saturn',
  },
  'Uranus': {
    term: 'Uranus',
    shortDef: '♅ Uranus — associated with {Chokmah}. The planet of sudden revolution, breakthrough, and the shattering of outdated structures. The eruption of the new.',
    link: '/astrology?view=planet&name=Uranus',
  },

  // === Zodiac Signs ===
  'Aries': { term: 'Aries', shortDef: '♈ Aries — the Ram. Cardinal Fire sign, ruled by {Mars}, {Sun} exalted. The initiating impulse, aggression, Spring, new beginnings.', link: '/astrology?view=sign&name=Aries' },
  'Taurus': { term: 'Taurus', shortDef: '♉ Taurus — the Bull. Fixed Earth sign, ruled by {Venus}, {Moon} exalted. Stability, sensuality, material security, the fertile earth.', link: '/astrology?view=sign&name=Taurus' },
  'Gemini': { term: 'Gemini', shortDef: '♊ Gemini — the Twins. Mutable Air sign, ruled by {Mercury}. Duality, communication, intellectual versatility, the restless mind.', link: '/astrology?view=sign&name=Gemini' },
  'Cancer': { term: 'Cancer', shortDef: '♋ Cancer — the Crab. Cardinal Water sign, ruled by the {Moon}, {Jupiter} exalted. The home, the womb, emotional protection, nurture.', link: '/astrology?view=sign&name=Cancer' },
  'Leo': { term: 'Leo', shortDef: '♌ Leo — the Lion. Fixed Fire sign, ruled by the {Sun}. Creative self-expression, sovereignty, radiance, the heart.', link: '/astrology?view=sign&name=Leo' },
  'Virgo': { term: 'Virgo', shortDef: '♍ Virgo — the Virgin. Mutable Earth sign, ruled by {Mercury}. Analysis, service, the harvest, meticulous inner work.', link: '/astrology?view=sign&name=Virgo' },
  'Libra': { term: 'Libra', shortDef: '♎ Libra — the Scales. Cardinal Air sign, ruled by {Venus}, {Saturn} exalted. Balance, justice, harmony, beauty, relationship.', link: '/astrology?view=sign&name=Libra' },
  'Scorpio': { term: 'Scorpio', shortDef: '♏ Scorpio — the Scorpion/Eagle. Fixed Water sign, ruled by {Mars}. Death, transformation, hidden depths, the three stages of evolution (scorpion → serpent → eagle).', link: '/astrology?view=sign&name=Scorpio' },
  'Sagittarius': { term: 'Sagittarius', shortDef: '♐ Sagittarius — the Archer. Mutable Fire sign, ruled by {Jupiter}. Aspiration, philosophy, the far-reaching arrow of thought and will.', link: '/astrology?view=sign&name=Sagittarius' },
  'Capricorn': { term: 'Capricorn', shortDef: '♑ Capricorn — the Goat. Cardinal Earth sign, ruled by {Saturn}, {Mars} exalted. Ambition, structure, material mastery, the mountain summit.', link: '/astrology?view=sign&name=Capricorn' },
  'Aquarius': { term: 'Aquarius', shortDef: '♒ Aquarius — the Water-Bearer. Fixed Air sign, ruled by {Saturn} and {Uranus}. Universal vision, humanitarian idealism, revolution.', link: '/astrology?view=sign&name=Aquarius' },
  'Pisces': { term: 'Pisces', shortDef: '♓ Pisces — the Fishes. Mutable Water sign, ruled by {Jupiter}. Dissolution, compassion, the oceanic unconscious, the end and return to the beginning.', link: '/astrology?view=sign&name=Pisces' },

  // === Elements ===
  'Fire': { term: 'Fire', shortDef: '🜂 Fire — the active, creative, initiating element. Corresponds to the suit of Wands, the world of {Atziluth}, and the letter Yod of {Tetragrammaton}. Will, creativity, spiritual energy.', link: '/astrology?view=element&name=Fire' },
  'Water': { term: 'Water', shortDef: '🜄 Water — the receptive, emotional, dissolving element. Corresponds to the suit of Cups, the world of {Briah}, and the letter Heh of {Tetragrammaton}. Feeling, intuition, the unconscious.', link: '/astrology?view=element&name=Water' },
  'Air': { term: 'Air', shortDef: '🜁 Air — the intellectual, communicative, discriminating element. Corresponds to the suit of Swords, the world of {Yetzirah}, and the letter Vau of {Tetragrammaton}. Thought, analysis, conflict.', link: '/astrology?view=element&name=Air' },
  'Earth': { term: 'Earth', shortDef: '🜃 Earth — the material, stable, manifesting element. Corresponds to the suit of Disks, the world of {Assiah}, and the final Heh of {Tetragrammaton}. Matter, body, practical life.', link: '/astrology?view=element&name=Earth' },

  // === Key Concepts ===
  'Tetragrammaton': {
    term: 'Tetragrammaton',
    shortDef: 'YHVH (יהוה) — the four-letter divine name. Its letters map to the four elements ({Fire}/{Water}/{Air}/{Earth}), the four suits, the {Four Worlds}, and the four Court Card ranks (Knight/Queen/Prince/Princess).',
  },
  'Individuation': {
    term: 'Individuation',
    shortDef: 'Jung\'s term for the lifelong process of psychological integration — becoming who you truly are by integrating the conscious and unconscious parts of the psyche into a unified whole.',
  },
  'Anima': {
    term: 'Anima',
    shortDef: 'In Jungian psychology, the inner feminine figure in a man\'s psyche (or the feeling/receptive function in any psyche). The soul-image that mediates between the Ego and the unconscious.',
  },
  'Animus': {
    term: 'Animus',
    shortDef: 'In Jungian psychology, the inner masculine figure in a woman\'s psyche (or the thinking/assertive function in any psyche). The logos-image that drives toward meaning and action.',
  },
  'Shadow': {
    term: 'Shadow',
    shortDef: 'In Jungian psychology, the repressed, denied, or unrecognized parts of the personality. Not inherently evil — contains both destructive and creative potential that the Ego has refused to claim.',
  },
  'Self': {
    term: 'Self',
    shortDef: 'In Jungian psychology, the totality of the psyche — conscious and unconscious together. The organizing centre that transcends the Ego. On the {Tree of Life}, roughly corresponds to {Tiphareth} (experienced) or {Kether} (absolute).',
  },
  'Ego': {
    term: 'Ego',
    shortDef: 'The conscious centre of the personality — the "I" that navigates daily life. In Jungian psychology, a necessary but partial structure that must be integrated with the {Self} rather than identified as the whole.',
  },
  'Great Work': {
    term: 'Great Work',
    shortDef: 'The alchemical and spiritual goal of uniting the Microcosm (the human soul) with the Macrocosm (the divine Universe). In Jungian terms, the process of {Individuation} carried to its ultimate conclusion.',
  },
  'Yi King': {
    term: 'Yi King',
    shortDef: 'The I Ching (Book of Changes) — the ancient Chinese oracle of 64 hexagrams. Crowley frequently references its hexagrams as parallels to the Tarot\'s attributions, finding remarkable congruence between Eastern and Western esoteric systems.',
  },
  'Primum Mobile': {
    term: 'Primum Mobile',
    shortDef: 'The "First Swirlings" — the initial movement of creation before any differentiation. Attributed to {Kether}. The primordial impulse from which all subsequent manifestation unfolds.',
  },

  // === Astrological Concepts ===
  'Rulership': {
    term: 'Rulership',
    shortDef: 'Each zodiac sign is "ruled" by a planet whose nature is most harmonious with it. The ruling planet is at home in its sign — it expresses its energy most naturally and powerfully there. For example, {Mars} rules {Aries} and {Scorpio}; {Venus} rules {Taurus} and {Libra}.',
  },
  'Exaltation': {
    term: 'Exaltation',
    shortDef: 'A planet is "exalted" in a sign where its energy reaches its highest, most refined expression — not at home (as in {Rulership}) but elevated, operating at peak dignity. For example, the {Sun} is exalted in {Aries}; {Saturn} is exalted in {Libra}; the {Moon} is exalted in {Taurus}.',
  },
  'Decan': {
    term: 'Decan',
    shortDef: 'Each zodiac sign is divided into three decans of 10° each (0°–10°, 10°–20°, 20°–30°). Each decan has its own planetary sub-ruler, and in the Thoth Tarot system, each decan is assigned a specific pip card (numbered 2–10). The decan system creates the detailed mapping between the zodiac and the Minor Arcana.',
  },
  'Cardinal': {
    term: 'Cardinal',
    shortDef: 'One of the three qualities. Cardinal signs ({Aries}, {Cancer}, {Libra}, {Capricorn}) initiate action and mark the beginning of each season. They are the movers, the starters, the forces that set things in motion.',
    link: '/astrology?view=element&name=Cardinal',
  },
  'Fixed': {
    term: 'Fixed',
    shortDef: 'One of the three qualities. Fixed signs ({Taurus}, {Leo}, {Scorpio}, {Aquarius}) sustain and concentrate energy. They are the stabilizers, the endurers, the forces that maintain what has been initiated.',
    link: '/astrology?view=element&name=Fixed',
  },
  'Mutable': {
    term: 'Mutable',
    shortDef: 'One of the three qualities. Mutable signs ({Gemini}, {Virgo}, {Sagittarius}, {Pisces}) adapt and transform energy. They are the changers, the refiners, the forces that dissolve old forms to prepare for new ones.',
    link: '/astrology?view=element&name=Mutable',
  },
  'Quality': {
    term: 'Quality',
    shortDef: 'The three modes of expression in astrology: {Cardinal} (initiating), {Fixed} (sustaining), and {Mutable} (adapting). Each element appears once in each quality, creating the 12 zodiac signs (e.g. {Fire}: {Aries}/Cardinal, {Leo}/Fixed, {Sagittarius}/Mutable).',
    link: '/astrology',
  },

  // === Thelemic Terms ===
  'Thelema': {
    term: 'Thelema',
    shortDef: 'Greek for "Will." Aleister Crowley\'s religious-philosophical system, founded on the revelation of the {Book of the Law} in 1904. Its supreme principle: "Do what thou wilt shall be the whole of the Law." The Thoth Tarot is the visual expression of Thelemic doctrine.',
    link: '/library/thoth-tarot-guide',
  },
  'True Will': {
    term: 'True Will',
    shortDef: 'In {Thelema}, one\'s authentic, deepest purpose — not mere desire or whim, but the individual\'s unique function in the universe. "For pure will, unassuaged of purpose, delivered from the lust of result, is every way perfect." The {Great Work} is the discovery and execution of the True Will.',
  },
  'Book of the Law': {
    term: 'Book of the Law',
    shortDef: 'Liber AL vel Legis — the foundational text of {Thelema}, dictated to Crowley in Cairo in 1904 by a praeterhuman intelligence called Aiwass. Contains the three chapters of {Nuit}, {Hadit}, and {Ra-Hoor-Khuit} and the declaration of the {Aeon of Horus}.',
  },
  'Aeon of Horus': {
    term: 'Aeon of Horus',
    shortDef: 'The current spiritual epoch in {Thelema}, succeeding the {Aeon of Osiris}. The age of the "Crowned and Conquering Child" — characterized by individual liberty, the discovery of {True Will}, and the integration (rather than suppression) of the body and its desires.',
  },
  'Aeon of Osiris': {
    term: 'Aeon of Osiris',
    shortDef: 'The previous spiritual epoch (c. 500 BCE – 1904 CE) in {Thelema}, characterized by patriarchal religion, the formula of the Dying God (sacrifice, guilt, redemption), and the suppression of the body in favour of the spirit. Christianity, Islam, and Buddhism are Osirian.',
  },
  'Nuit': {
    term: 'Nuit',
    shortDef: 'Nuith — the supreme goddess of {Thelema}. The infinite starry sky, infinite space, infinite possibility. She is "every man and every woman." Appears in The Star (XVII) and The Aeon (XX). Complement of {Hadit}.',
  },
  'Hadit': {
    term: 'Hadit',
    shortDef: 'The complement of {Nuit} — the infinitely small, omnipresent point of consciousness and kinetic energy. "The flame that burns in every heart of man, and in the core of every star." Appears in The Aeon (XX) as the winged globe of fire.',
  },
  'Ra-Hoor-Khuit': {
    term: 'Ra-Hoor-Khuit',
    shortDef: 'The hawk-headed solar god of action and martial force — the Lord of the {Aeon of Horus}. Born from the union of {Nuit} and {Hadit}. Represents the active, conquering will. His twin is {Hoor-pa-kraat} (Silence).',
  },
  'Hoor-pa-kraat': {
    term: 'Hoor-pa-kraat',
    shortDef: 'Harpocrates — the God of Silence, the passive twin of {Ra-Hoor-Khuit}. The "Babe in the Egg of Blue." Represents the silent, receptive dimension of Horus. Together they form Heru-ra-ha.',
  },
  'Babalon': {
    term: 'Babalon',
    shortDef: 'The Scarlet Woman — the sacred feminine of {Thelema}. She who receives all without discrimination, the cup that contains the blood of the saints. Appears riding the Beast in Lust (XI). Not to be confused with the biblical "Babylon."',
  },
  'Holy Guardian Angel': {
    term: 'Holy Guardian Angel',
    shortDef: 'The True {Self} — the transcendent core of the individual that exists beyond the {Ego}. The central goal of the Adeptus Minor grade in the {Golden Dawn} and {A.·.A.·.} systems. Knowledge and Conversation of the HGA is the prerequisite for discovering one\'s {True Will}.',
  },
  'ABRAHADABRA': {
    term: 'ABRAHADABRA',
    shortDef: 'The "Word of the {Aeon of Horus}" and the cipher of the {Great Work}. Its numerical value is 418, which equals the Hebrew letter Cheth (The Chariot). It represents the completed union of the Microcosm and Macrocosm.',
  },
  'Choronzon': {
    term: 'Choronzon',
    shortDef: 'The "Demon of Dispersion" who dwells in the {Abyss}. Represents the force of dissolution that attacks anyone attempting to cross from the lower Tree to the {Supernal Triad}. The {Ego}\'s last defence against its own annihilation.',
  },

  // === Alchemical Terms ===
  'Sulphur': {
    term: 'Sulphur',
    shortDef: 'The active, fiery, volatile alchemical principle (🜍). Corresponds to {Fire}, the suit of Wands, and the Hindu guna Rajas. Embodied by The Emperor (IV). Represents initiative, will, and the creative impulse.',
    link: '/library/alchemy',
  },
  'Salt': {
    term: 'Salt',
    shortDef: 'The passive, fixed, crystallizing alchemical principle (🜔). Corresponds to {Earth}, the suit of Disks, and the Hindu guna Tamas. Embodied by The Empress (III). Represents form, stability, and material manifestation.',
    link: '/library/alchemy',
  },
  'Solve et Coagula': {
    term: 'Solve et Coagula',
    shortDef: '"Dissolve and Coagulate" — the central alchemical formula. First break down the existing structure into its raw components (Solve), then reconstitute them in a purified form (Coagula). Depicted in Art (XIV). In Jungian terms: dissolve the {Ego}\'s defences, then reintegrate.',
  },
  'Philosopher\'s Stone': {
    term: 'Philosopher\'s Stone',
    shortDef: 'The ultimate goal of alchemy — not a physical substance but a state of being: the perfect balance of {Sulphur}, {Mercury}, and {Salt}. The vehicle of the {True Will}. In Jungian terms, the fully individuated {Self}.',
  },
  'Hermetic Marriage': {
    term: 'Hermetic Marriage',
    shortDef: 'The alchemical union of opposites — masculine and feminine, conscious and unconscious, {Sulphur} and {Salt}, mediated by Mercury. Depicted in The Lovers (VI) and consummated in Art (XIV). In Jungian terms, the {Conjunctio}.',
  },
  'Conjunctio': {
    term: 'Conjunctio',
    shortDef: 'Latin for "union." In alchemy and Jungian psychology, the marriage of opposites that produces something greater than either component. The integration of {Anima}/{Animus}, conscious/unconscious, spirit/matter. The goal of {Individuation}.',
  },
  'Putrefaction': {
    term: 'Putrefaction',
    shortDef: 'The alchemical stage of decomposition — the "blackening" (nigredo) where old forms break down into undifferentiated matter. Represented by the Death card (XIII). In Jungian terms, the necessary destruction of the old identity before renewal can occur.',
  },
  'V.I.T.R.I.O.L.': {
    term: 'V.I.T.R.I.O.L.',
    shortDef: '"Visita Interiora Terrae Rectificando Invenies Occultum Lapidem" — Visit the interior of the earth; by rectifying, you shall find the hidden stone. The alchemical formula inscribed on Art (XIV). The complete prescription for {Shadow} work and {Individuation}.',
  },

  // === Jungian Terms (missing) ===
  'Collective Unconscious': {
    term: 'Collective Unconscious',
    shortDef: 'Jung\'s concept of the deepest layer of the psyche — not personal but shared by all humans. Contains the {Archetype}s: universal inherited patterns expressed through myths, dreams, and symbols across all cultures. On the {Tree of Life}, corresponds to the {Supernal Triad}.',
  },
  'Archetype': {
    term: 'Archetype',
    shortDef: 'A universal, inherited psychic pattern in the {Collective Unconscious}. Not an image but a predisposition to experience certain situations in certain ways. Each Major Arcana card embodies one or more archetypes: The Fool = the {Divine Child}, The Empress = the {Great Mother}, etc.',
  },
  'Persona': {
    term: 'Persona',
    shortDef: 'The social mask — the public face the {Ego} presents to the world. Necessary for social functioning but dangerous when mistaken for the real self. In the Tarot, appears in the structured cards (the Fours, The Emperor, The Hierophant).',
  },
  'Transcendent Function': {
    term: 'Transcendent Function',
    shortDef: 'Jung\'s term for the psychological mechanism that bridges the conscious and unconscious minds. When the {Ego} and the {Shadow} conflict, the Transcendent Function produces the dream, insight, or symbol that resolves the deadlock by transcending both positions. Embodied by {Mercury} and The Magus.',
  },
  'Synchronicity': {
    term: 'Synchronicity',
    shortDef: 'Jung\'s term for meaningful coincidences that are connected not by cause and effect but by *meaning*. The theoretical basis for how Tarot works: the cards reflect the querent\'s psychic state not because they cause it but because both are expressions of the same underlying {Archetype}.',
  },
  'Psychopomp': {
    term: 'Psychopomp',
    shortDef: 'Greek for "guide of souls." A figure who leads the dead (or the living) between worlds. In Jungian psychology, the function that mediates between conscious and unconscious. {Mercury}/Hermes is the classic psychopomp. In the Tarot: The Magus, The Hermit.',
  },
  'Libido': {
    term: 'Libido',
    shortDef: 'In Jungian psychology (unlike Freud), libido means *all* psychic energy, not just sexual. The total life-force available to the personality. The Ace of Wands represents libido in its most undifferentiated form — pure potential energy before it has attached to any object.',
  },
  'Enantiodromia': {
    term: 'Enantiodromia',
    shortDef: 'The tendency of any extreme to generate its opposite. A key Jungian law: excessive order breeds chaos, excessive control breeds rebellion. The Wheel of Fortune (X) embodies this principle. Every Four (stability) inevitably produces a Five (disruption).',
  },
  'Divine Child': {
    term: 'Divine Child',
    shortDef: 'The archetype of new beginning, innocence, and the nascent {Self}. Represents unlimited potential before experience has shaped it. In the Tarot: The Fool (0) as the pre-conscious state, The Sun (XIX) as wholeness achieved, and the Child Horus in The Aeon (XX).',
  },
  'Great Mother': {
    term: 'Great Mother',
    shortDef: 'The maternal archetype in its fullest form — both nurturing (the womb, the garden) and devouring (the tomb, the ocean). In the Tarot: The Empress (III) as the positive Mother, {Binah} as the dark Mother. The {Anima} in her most powerful aspect.',
  },
  'Wise Old Man': {
    term: 'Wise Old Man',
    shortDef: 'The archetype of accumulated wisdom, spiritual guidance, and the authority of experience. In the Tarot: The Hermit (IX) as the solitary seeker, The Hierophant (V) as the teacher of tradition. The positive face of the {Senex}.',
  },
  'Senex': {
    term: 'Senex',
    shortDef: 'Latin for "old man." In Jungian psychology, the archetype of authority, structure, limitation, and time. The strict Father who demands discipline. Associated with {Saturn} and {Binah}. Can be wise (The Hermit) or tyrannical (the shadow of The Emperor).',
  },

  // === General Esoteric Terms ===
  'Logos': {
    term: 'Logos',
    shortDef: 'Greek for "Word" or "Reason." The creative utterance that initiates manifestation — the divine Word that brings order out of chaos. In the Tarot, embodied by The Magus (I), who is the Logos incarnate. {Chokmah} is the Logos at the cosmic level.',
  },
  'Hermeticism': {
    term: 'Hermeticism',
    shortDef: 'The philosophical-spiritual tradition attributed to Hermes Trismegistus ("Thrice-Great Hermes"). Founded on the axiom "As above, so below." The intellectual framework that unites the {Tree of Life}, astrology, and alchemy into a single system. The {Golden Dawn} was a Hermetic order.',
    link: '/library/golden-dawn',
  },
  'Kerubim': {
    term: 'Kerubim',
    shortDef: 'The four Holy Living Creatures — Bull ({Taurus}), Lion ({Leo}), Eagle ({Scorpio}), and Man ({Aquarius}) — the four {Fixed} signs. They appear as guardians in The Hierophant, The Chariot, Fortune, and The Universe. Represent the four elements and the four Jungian functions at their most stable.',
  },
  'Caduceus': {
    term: 'Caduceus',
    shortDef: 'The winged staff with two intertwined serpents — the symbol of Hermes/{Mercury}. Represents the mediation between opposites, the balance of the three pillars of the {Tree of Life}, and the complete symbol of the Gnosis. Appears in The Magus (I).',
  },
  'Orphic Egg': {
    term: 'Orphic Egg',
    shortDef: 'The cosmic egg of the Orphic mysteries — a symbol of all potentiality contained in a single form. Wrapped by a serpent (the creative/destructive force). Appears in The Lovers (VI), The Hermit (IX), and Art (XIV) as the result of the alchemical marriage.',
  },
  'Demiurge': {
    term: 'Demiurge',
    shortDef: 'The "craftsman god" who organizes the raw material of creation into a functioning universe. In the Qabalistic system, {Chesed}/{Jupiter} is the Demiurge — the first Sephirah below the {Abyss} where divine energy becomes comprehensible to the human intellect.',
  },
  'Qliphoth': {
    term: 'Qliphoth',
    shortDef: 'The "shells" or "husks" — the shadow-side of the {Sephiroth}, representing unbalanced, destructive forces. In Lurianic Kabbalah, they result from the Shattering of the Vessels. Most active in {Assiah} (the material world). Not evil per se, but unbalanced energy that must be redeemed.',
  },
  'Golden Dawn': {
    term: 'Golden Dawn',
    shortDef: 'The Hermetic Order of the Golden Dawn (1888–1903) — the magical order that synthesized Qabalah, astrology, alchemy, and Tarot into a unified system. Founded by Westcott and Mathers in London. Crowley was a member; the Thoth Tarot is built on the Golden Dawn\'s attributions.',
    link: '/library/golden-dawn',
  },
  'Ankh': {
    term: 'Ankh',
    shortDef: 'The Egyptian hieroglyph for "life" — a cross surmounted by a loop. Represents the union of masculine (vertical) and feminine (horizontal) principles, and the key to eternal life. Appears in The Magus (I) and The Hanged Man (XII).',
  },
  'Kundalini': {
    term: 'Kundalini',
    shortDef: 'The "coiled serpent" — in Hindu/yogic tradition, the dormant spiritual energy at the base of the spine. When awakened, it rises through the chakras to achieve enlightenment. In the Tarot, the Lion-Serpent of Lust (XI) represents kundalini fully activated.',
  },

  // === Mythological & Symbolic Figures ===
  'Dionysus Zagreus': {
    term: 'Dionysus Zagreus',
    shortDef: 'The Greek god of wine, ecstasy, and creative destruction in his most primal form. Zagreus ("the torn one") was dismembered by the Titans and reborn — a death-and-resurrection god. His horns adorn The Fool (0), representing unbridled, ecstatic energy and the divine madness that precedes all creation.',
  },
  'Maut': {
    term: 'Maut',
    shortDef: 'The Egyptian vulture goddess — an early, more sublime form of {Nuit}. The vulture was believed to reproduce by the intervention of the wind (Air), making Maut both father and mother. Her spiral neck represents the spiral form of the Universe. Appears on The Fool (0).',
  },
  'Puer Aeternus': {
    term: 'Puer Aeternus',
    shortDef: 'Latin for "Eternal Youth." In Jungian psychology, the archetype of the perpetual adolescent — brilliant, creative, full of potential, but unable to commit or complete. The Prince of Wands embodies this archetype. The shadow of the Puer is the {Senex} (rigid old man).',
  },
  'Nigredo': {
    term: 'Nigredo',
    shortDef: 'The "blackening" — the first stage of the alchemical Great Work, corresponding to {Putrefaction} and psychological depression. The complete dissolution of the old identity. Represented by Death (XIII) and Saturn. Must be endured before the light of renewal can appear.',
  },
  'Phallic': {
    term: 'Phallic',
    shortDef: 'Relating to the phallus as a symbol of the creative, generative, masculine principle — not merely sexual but representing the primal force of manifestation. In the Thoth system, phallic symbols (the cone of white light, the wand, the Yod) represent the initial creative impulse descending from {Kether}.',
  },
  'Vesica Piscis': {
    term: 'Vesica Piscis',
    shortDef: 'The almond-shaped intersection formed by two overlapping circles — a fundamental shape of sacred geometry. Represents the gateway between worlds, the yoni (feminine creative principle), and the space where opposites meet. Appears in Adjustment (VIII) and the Ace of Disks.',
  },
  'Tahuti': {
    term: 'Tahuti',
    shortDef: 'The Egyptian name for Thoth — the ibis-headed god of wisdom, writing, magic, and measurement. He invented hieroglyphics, maintained the universe through the power of the Word, and served as scribe to the gods. The Thoth Tarot is named after him. Embodied by The Magus (I).',
  },
  'Cynocephalus': {
    term: 'Cynocephalus',
    shortDef: 'The dog-faced ape of {Tahuti}/Thoth — in the Tarot, the creature that lurks behind The Magus. While Thoth writes the Word, the ape\'s business is to distort and mock it. Represents the doctrine that "manifestation implies illusion" — every act of creation introduces a shadow of deception.',
  },

  // === Egyptian & Mythological ===
  'Khephra': {
    term: 'Khephra',
    shortDef: 'The Egyptian scarab beetle god who carries the Sun through the underworld during the midnight hours. Represents the Sun in its hidden, gestating form — life persisting through the darkest passage. Appears at the bottom of The Moon (XVIII), bearing the solar disk through the poisoned waters.',
  },
  'Maat': {
    term: 'Maat',
    shortDef: 'The Egyptian goddess of Truth, Justice, and cosmic order. She weighs the hearts of the dead against her ostrich feather. In the Thoth Tarot, she is embodied by Adjustment (VIII) — the implacable mathematical balance of the universe.',
  },
  'Isis': {
    term: 'Isis',
    shortDef: 'The great Egyptian goddess — wife of Osiris, mother of Horus. She represents the feminine principle in its most nurturing and magical form. In the Thoth system, she appears as the Lotus (her sacred flower) and is one aspect of the High Priestess and the Empress.',
  },
  'Horus': {
    term: 'Horus',
    shortDef: 'The Egyptian hawk-headed god, son of {Isis} and Osiris. In {Thelema}, Horus is the Lord of the current Aeon — the "Crowned and Conquering Child." He appears in dual form: {Ra-Hoor-Khuit} (active) and {Hoor-pa-kraat} (passive/silent).',
  },
  'Osiris': {
    term: 'Osiris',
    shortDef: 'The Egyptian god of the dead and resurrection — murdered by Set, dismembered, and reassembled by {Isis}. He represents the Dying God formula of the {Aeon of Osiris}: redemption through sacrifice and suffering. The Hanged Man (XII) embodies this "obsolete" formula.',
  },
  'Amoun': {
    term: 'Amoun',
    shortDef: 'Amoun-Ra — the Egyptian Father-God, "The Hidden One." The supreme solar deity associated with {Chesed} and the ram. The ram-headed wands in the Four of Wands and The Emperor\'s throne capitals are sacred to Amoun.',
  },
  'Amenti': {
    term: 'Amenti',
    shortDef: 'The Egyptian underworld — the realm of the dead where Osiris reigns. The waters of Amenti represent the journey of the soul through death and potential rebirth. Referenced in the Death card (XIII).',
  },

  // === Qabalistic Technical ===
  'Ruach': {
    term: 'Ruach',
    shortDef: 'Hebrew for "breath" or "spirit." In Qabalah, the Ruach is the intellectual soul — the conscious personality spanning {Chesed} through {Yesod} on the {Tree of Life}. It is centred in {Tiphareth} (the Sun). The suit of Swords and the element of {Air} correspond to the Ruach.',
  },
  'Dorje': {
    term: 'Dorje',
    shortDef: 'The Tibetan thunderbolt (Sanskrit: Vajra) — a ritual weapon symbolizing the indestructible nature of diamond-like truth and the power of the lightning flash. Two crossed Dorjes appear in the Two of Wands (Dominion), representing the Will in its most exalted, destructive-creative form.',
  },

  // === Symbolic Systems ===
  'Geomantic': {
    term: 'Geomantic',
    shortDef: 'Relating to Geomancy — an ancient divination system using 16 figures formed from patterns of dots. Crowley frequently references Geomantic figures (like Puer, Rubeus, Laetitia) as parallels to the Tarot\'s astrological attributions. Each figure is ruled by a planet in a sign.',
  },
  'Pentagram': {
    term: 'Pentagram',
    shortDef: 'The five-pointed star — a symbol of the Microcosm (the human being) with Spirit ruling the four elements. Upright: spirit dominates matter. Inverted: matter dominates spirit. The five pip cards (Fives) when poorly aspected form the inverted pentagram.',
  },
  'Hexagram': {
    term: 'Hexagram',
    shortDef: 'The six-pointed star (Star of David) — a symbol of the Macrocosm, the union of the upward triangle ({Fire}) and downward triangle ({Water}). Represents the marriage of opposites. The Six of Swords (Science) features the hexagram as the "Rosy Cross" of scientific truth.',
  },

  // === People & Organizations ===
  'Crowley': {
    term: 'Crowley',
    shortDef: 'Aleister Crowley (1875–1947) — English occultist, ceremonial magician, and prophet of {Thelema}. Co-creator of the Thoth Tarot with {Frieda Harris}. Author of *The Book of Thoth*, *Magick in Theory and Practice*, and the {Book of the Law}. Self-styled "The Great Beast 666" ({To Mega Therion}).',
  },
  'Frieda Harris': {
    term: 'Frieda Harris',
    shortDef: 'Lady Frieda Harris (1877–1962) — the artist who painted all 78 cards of the Thoth Tarot under {Crowley}\'s direction (1938–1943). She used Projective Synthetic Geometry to create the deck\'s characteristic "shimmering" effect. Many cards were painted multiple times until the balance between art and magical geometry was achieved.',
  },
  'Scarlet Woman': {
    term: 'Scarlet Woman',
    shortDef: 'In {Thelema}, the earthly representative or vehicle of {Babalon}. She who receives all, whose cup contains the blood of the saints. Appears in Lust (XI) riding the Beast. In Jungian terms, the fully activated, unashamed {Anima} in her most powerful form.',
  },
  'Phoenix': {
    term: 'Phoenix',
    shortDef: 'The mythical bird that dies in fire and is reborn from its own ashes — the supreme symbol of death and resurrection. In the Thoth deck, the Phoenix Wand (carried by the Prince of Wands and referenced in the Five of Wands) represents the capacity to be destroyed and renewed by the same energy.',
  },
  'Sphinx': {
    term: 'Sphinx',
    shortDef: 'The composite creature (human head, lion body, eagle wings, bull haunches) representing the union of the four elements and the four {Kerubim}. Appears at the summit of the Wheel of Fortune (X), representing the balanced intelligence that has mastered all four elemental forces.',
  },

  // === Hebrew Letters (the 22 paths) ===
  'Aleph': {
    term: 'Aleph',
    shortDef: 'א — the first Hebrew letter, meaning "Ox." One of the three Mother Letters ({Air}). Attributed to The Fool (0). Its numerical value is 1 (or 111 in full spelling). Represents the primal creative energy before differentiation.',
  },
  'Beth': {
    term: 'Beth',
    shortDef: 'ב — the second Hebrew letter, meaning "House." Attributed to The Magus (I) and the planet {Mercury}. Represents the mind\'s capacity to construct structures of meaning — the "house" that gives form to the formless.',
  },
  'Gimel': {
    term: 'Gimel',
    shortDef: 'ג — the third Hebrew letter, meaning "Camel." Attributed to The High Priestess (II) and the {Moon}. The camel carries water through the desert — the vehicle that crosses the {Abyss}.',
  },
  'Yod': {
    term: 'Yod',
    shortDef: 'י — the 10th Hebrew letter, meaning "Hand." The smallest letter, yet the seed from which all others derive. Attributed to The Hermit (IX) and {Virgo}. In the {Tetragrammaton}, Yod is the Father — the initial creative spark. Also the "secret {Fire}."',
  },
  'Shin': {
    term: 'Shin',
    shortDef: 'ש — the 21st Hebrew letter, meaning "Tooth." One of the three Mother Letters ({Fire}). Attributed to The Aeon (XX). Its three prongs represent the three Mother Letters themselves. The instrument of breaking down that precedes all transformation.',
  },
  'Mem': {
    term: 'Mem',
    shortDef: 'מ — the 13th Hebrew letter, meaning "{Water}." One of the three Mother Letters. Attributed to The Hanged Man (XII). Represents the element of dissolution, surrender, and the baptism that is also a death.',
  },

  // === Key Tarot Terms ===
  'Holy Grail': {
    term: 'Holy Grail',
    shortDef: 'The sacred cup — the receptive vessel that contains the blood/light of the divine. In the Thoth Tarot, it appears in The Chariot (VII) as the central feature (carved of amethyst, the colour of {Jupiter}), and throughout the Cups suit. Represents the {Anima}, receptivity, and the container of spiritual experience.',
  },
  'Atu': {
    term: 'Atu',
    shortDef: 'Crowley\'s term for the Major Arcana cards, derived from the Egyptian word for "house" or "key." The 22 Atu correspond to the 22 Hebrew letters and the 22 paths on the {Tree of Life}. Example: "Atu XIV" = Art, the 14th Major Arcana card.',
  },
  'Rosy Cross': {
    term: 'Rosy Cross',
    shortDef: 'The Rose upon the Cross — the central symbol of the Rosicrucian tradition and the {Golden Dawn}. The Rose (feminine, unfolding, 5 or 49 petals) upon the Cross (masculine, structure, the 4 elements) represents the union of spirit and matter. Appears in the Six of Swords (Science).',
  },
  'Mother Letters': {
    term: 'Mother Letters',
    shortDef: 'The three foundational Hebrew letters: {Aleph} ({Air}/The Fool), {Mem} ({Water}/The Hanged Man), and {Shin} ({Fire}/The Aeon). They correspond to the three elements, the three alchemical principles ({Sulphur}/{Mercury}/{Salt}), and the three gunas (Rajas/Sattvas/Tamas).',
  },
  'Persephone': {
    term: 'Persephone',
    shortDef: 'The Greek goddess who was abducted to the underworld by Pluto and ate the pomegranate seeds that bound her there. She returns each spring (rebirth) and descends each winter (death). Appears in the Three of Cups (Abundance) — the pomegranate cups warn that pleasure carries the seeds of attachment.',
  },
  'Pan': {
    term: 'Pan',
    shortDef: 'The Greek god of nature, wildness, and the untamed life-force — "Pan Pangenetor," the All-Begetter. In the Thoth Tarot, Pan is embodied by The Devil (XV) — not the Christian devil but the chthonic creative energy of matter itself, leaping with lust upon the mountain summits.',
  },
  'Uroboros': {
    term: 'Uroboros',
    shortDef: 'The serpent eating its own tail — the ancient symbol of primordial wholeness, eternity, and the unity of beginning and end. In Jungian psychology, represents the pre-conscious state before the {Ego} has differentiated from the unconscious. Associated with The Fool (0).',
  },
  'Temenos': {
    term: 'Temenos',
    shortDef: 'Greek for "sacred enclosure." In Jungian psychology, the protected psychological space within which transformation can occur. The Four of Wands (Completion) represents the temenos — the stable structure that contains the creative process.',
  },

  // === Hebrew Letters (additional) ===
  'Daleth': {
    term: 'Daleth',
    shortDef: 'ד — the 4th Hebrew letter, meaning "Door." Attributed to The Empress (III) and {Venus}. The doorway through which divine life enters the manifest world — the Gate of Heaven. The Empress IS the door between the Supernal and the lower Tree.',
  },
  'Heh': {
    term: 'Heh',
    shortDef: 'ה — the 5th Hebrew letter, meaning "Window." Appears twice in the {Tetragrammaton} (YHVH): the first Heh = Queens (the receptive Mother), the final Heh = Princesses (the material Daughter). Attributed to The Star (XVII) in the Thoth system, after Crowley\'s swap with {Tzaddi}.',
  },
  'Vau': {
    term: 'Vau',
    shortDef: 'ו — the 6th Hebrew letter, meaning "Nail" or "Hook." The connector between above and below. In the {Tetragrammaton}, Vau is the Son/Prince — the third letter that links the Father ({Yod}) and Mother ({Heh}) to the material world. Attributed to The Hierophant (V) and {Taurus}.',
  },
  'Zayin': {
    term: 'Zayin',
    shortDef: 'ז — the 7th Hebrew letter, meaning "Sword." Attributed to The Lovers (VI) and {Gemini}. The sword that divides — the act of discrimination that creates duality from unity, making the {Hermetic Marriage} possible by first separating what must later be reunited.',
  },
  'Cheth': {
    term: 'Cheth',
    shortDef: 'ח — the 8th Hebrew letter, meaning "Fence" or "Enclosure." Attributed to The Chariot (VII) and {Cancer}. The protective boundary that contains the numinous — the {Ego} as sacred vessel rather than conqueror. Its numerical value (418) equals {ABRAHADABRA}.',
  },
  'Teth': {
    term: 'Teth',
    shortDef: 'ט — the 9th Hebrew letter, meaning "Serpent." Attributed to Lust (XI) and {Leo}. The serpent is the {Kundalini} force — the Lion-Serpent of the card combines solar consciousness (Lion) with chthonic instinct (Serpent) into a single Beast that must be ridden, not slain.',
  },
  'Kaph': {
    term: 'Kaph',
    shortDef: 'כ — the 11th Hebrew letter, meaning "Palm of the Hand." Attributed to Fortune (X) and {Jupiter}. The open palm that grasps and receives — the Wheel of Fortune turns in the palm of fate. Those who cling to the rim are spun; those who find the centre are still.',
  },
  'Lamed': {
    term: 'Lamed',
    shortDef: 'ל — the 12th Hebrew letter, meaning "Ox Goad." Attributed to Adjustment (VIII) and {Libra}. The tallest letter in the Hebrew alphabet — the sharp prod that corrects deviation. Together with {Aleph} (Ox), it spells AL (אל), the title of the {Book of the Law}.',
  },
  'Nun': {
    term: 'Nun',
    shortDef: 'נ — the 13th Hebrew letter, meaning "Fish." Attributed to Death (XIII) and {Scorpio}. The fish lives beneath the waters — life persisting unseen through the darkest passage. Connected to the ancient fish-cults of {Oannes} and {Dagon}, who taught resurrection through the depths.',
  },
  'Samekh': {
    term: 'Samekh',
    shortDef: 'ס — the 14th Hebrew letter, meaning "Prop" or "Tent-pole." Attributed to Art (XIV) and {Sagittarius}. The central supporting structure — the backbone of the integrated personality. Path 25 on the {Tree of Life}, the middle segment of the {Pillar of Mildness}, connecting {Yesod} to {Tiphareth}.',
  },
  'Ayin': {
    term: 'Ayin',
    shortDef: 'ע — the 16th Hebrew letter, meaning "Eye." Attributed to The Devil (XV) and {Capricorn}. The eye that sees the material world as sacred — not the Christian Devil but {Pan} Pangenetor, the All-Begetter whose third eye perceives the divine within matter itself.',
  },
  'Peh': {
    term: 'Peh',
    shortDef: 'פ — the 17th Hebrew letter, meaning "Mouth." Attributed to The Tower (XVI) and {Mars}. The mouth that speaks destruction — the divine utterance ({Logos}) that shatters all structures built on false foundations. What {Beth} (House) constructs, Peh (Mouth) destroys.',
  },
  'Tzaddi': {
    term: 'Tzaddi',
    shortDef: 'צ — the 18th Hebrew letter, meaning "Fish-hook." Attributed to The Emperor (IV) and {Aries} in the Thoth system. Crowley swapped Tzaddi and {Heh} based on the verse "Tzaddi is not the Star" from the {Book of the Law}. The fish-hook catches and pulls authority from the formless depths.',
  },
  'Qoph': {
    term: 'Qoph',
    shortDef: 'ק — the 19th Hebrew letter, meaning "Back of the Head." Attributed to The Moon (XVIII) and {Pisces}. The cerebellum — the primitive brain governing instinct, reflex, and the autonomic functions. The darkest, most unconscious path on the {Tree of Life}.',
  },
  'Resh': {
    term: 'Resh',
    shortDef: 'ר — the 20th Hebrew letter, meaning "Head." Attributed to The Sun (XIX). The face, the front of consciousness — the counterpart to {Qoph} (back of the head). Where Qoph is the midnight unconscious, Resh is the noon of full awareness.',
  },
  'Tau': {
    term: 'Tau',
    shortDef: 'ת — the 22nd and final Hebrew letter, meaning "Cross" or "Mark." Attributed to The Universe (XXI) and {Saturn}. The last letter completes the alphabet as The Universe completes the Major Arcana. Together with {Aleph} (the first letter), Tau spells Ath (את) — "Essence."',
  },

  // === Mythological & Historical Figures (additional) ===
  'Hermes': {
    term: 'Hermes',
    shortDef: 'The Greek messenger god — patron of communication, commerce, boundaries, and thieves. The Greek name for {Mercury}/{Tahuti}. As {Psychopomp}, he guides souls between the world of the living and the dead. His Roman name is Mercury; his Egyptian equivalent is Thoth.',
  },
  'Artemis': {
    term: 'Artemis',
    shortDef: 'The Greek virgin goddess of the hunt, the Moon, and the wilderness. Her silver bow appears on The High Priestess (II) — both weapon and musical instrument, influencing through vibration rather than force. Roman equivalent: Diana.',
  },
  'Eros': {
    term: 'Eros',
    shortDef: 'The Greek god of desire and attraction. In Jungian psychology, Eros is one of two fundamental psychic principles (the other being {Logos}): the principle of relatedness, connection, feeling, and love. Eros seeks to bind; Logos seeks to discriminate. The Empress embodies the Eros principle.',
  },
  'Lilith': {
    term: 'Lilith',
    shortDef: 'In Jewish mythology, the first wife of Adam who refused submission and became a dark, nocturnal feminine spirit. In Jungian terms, the repressed, terrifying face of the {Anima} — the Dark Mother who will not be domesticated. Appears in The Lovers (VI) as the shadow of Eve.',
  },
  'Cerberus': {
    term: 'Cerberus',
    shortDef: 'The three-headed dog guarding the entrance to the Greek underworld ({Hades}). In The Hermit (IX), he appears tamed — the instinctual guardian of the threshold between the conscious and unconscious worlds, subdued by the Hermit\'s solitary descent.',
  },
  'Typhon': {
    term: 'Typhon',
    shortDef: 'The monstrous deity of volcanic destruction and chaos in Greek mythology — father of many monsters. On the Wheel of Fortune (X), Typhon descends the right side, embodying {Salt}/Tamas — the destructive, inert, downward-pulling force of dissolution.',
  },
  'Hermanubis': {
    term: 'Hermanubis',
    shortDef: 'A Greco-Egyptian composite deity merging {Hermes} (Greek messenger) and {Anubis} (Egyptian jackal-god of the dead). On the Wheel of Fortune (X), he ascends the left side, embodying {Sulphur}/Rajas — the striving, restless, mediating principle.',
  },
  'Anubis': {
    term: 'Anubis',
    shortDef: 'The Egyptian jackal-headed god of the dead, embalming, and transitions between worlds. Guardian of tombs and guide of souls. Appears in double form on The Moon (XVIII) — the "watcher in the twilight" who tests those who walk the darkest path.',
  },
  'Shiva': {
    term: 'Shiva',
    shortDef: 'The Hindu god of destruction, transformation, and regeneration — one of the Trimurti (Brahma creates, Vishnu preserves, Shiva destroys). When Shiva opens his third eye, the universe is annihilated and reborn. Referenced in The Tower (XVI) and The Universe (XXI).',
  },
  'Demeter': {
    term: 'Demeter',
    shortDef: 'The Greek goddess of grain, harvest, and the cycle of death and rebirth. Mother of {Persephone}, whose abduction to the underworld caused Demeter\'s grief (winter). Central to the Eleusinian Mysteries. Appears in the Three of Cups (Abundance) and the Princess of Disks.',
  },
  'Bacchus': {
    term: 'Bacchus',
    shortDef: 'The Roman god of wine, ecstasy, and uninhibited creative energy — the Roman name for Dionysus. His mysteries involved sacred intoxication and encounter with the divine through dissolution of the ordinary self. His cone-tipped thyrsus (pine-cone wand) appears on the Queen of Wands.',
  },
  'Minerva': {
    term: 'Minerva',
    shortDef: 'The Roman goddess of wisdom, crafts, and strategic warfare — equivalent to the Greek Athena. Born fully armed from Jupiter\'s head. Her spear represents wisdom-at-war: the mind as weapon. Appears in the Princess of Swords as the Avenging Intellect archetype.',
  },
  'Medusa': {
    term: 'Medusa',
    shortDef: 'One of the three Gorgons of Greek mythology — a monster with living serpents for hair whose gaze turned people to stone. Perseus slew her. In the Thoth Tarot, her crest appears on the Princess of Swords, representing the petrifying power of unveiled truth.',
  },
  'Valkyrie': {
    term: 'Valkyrie',
    shortDef: 'In Norse mythology, the female figures who choose which warriors die in battle and escort them to Valhalla. "Choosers of the slain." The Princess of Swords carries this Valkyrie quality — the divine feminine that decides what lives and what must die.',
  },
  'Percivale': {
    term: 'Percivale',
    shortDef: 'The "Pure Fool" of the Arthurian Grail legend — the innocent knight who succeeds in the Grail quest precisely because he asks the right question without knowing why. His story is referenced in The Fool (0): the holy innocent whose purity is his power.',
  },
  'Oannes': {
    term: 'Oannes',
    shortDef: 'A Babylonian fish-man deity who emerged from the sea to teach humanity civilisation, writing, and the arts. Associated with doctrines of resurrection and the persistence of life through death. Referenced in Death (XIII) alongside {Dagon} as evidence of ancient fish-cult resurrection symbolism.',
  },
  'Dagon': {
    term: 'Dagon',
    shortDef: 'An ancient Semitic deity depicted with fish attributes — a god of grain and fertility who became associated with the sea. Connected to {Oannes} and the ancient fish-cults that encoded doctrines of resurrection. Referenced in Death (XIII) and linked to the Hebrew letter {Nun} (Fish).',
  },
  'Pasiphae': {
    term: 'Pasiphae',
    shortDef: 'In Greek mythology, the wife of King Minos of Crete. Poseidon caused her to fall in love with the Cretan Bull, from which union the Minotaur was born. Referenced in The Hierophant (V) as the dark, bestial shadow of bull-worship — the prototype of all Bull-gods.',
  },
  'Zoroaster': {
    term: 'Zoroaster',
    shortDef: 'The ancient Iranian prophet and founder of Zoroastrianism. In Western occultism, the Chaldean Oracles are attributed to him. {Crowley} frequently quotes his aphorisms — "the extended flame of mind" (Knight of Swords), "God is he, having the head of a hawk" (The Star).',
  },
  'Eliphas Levi': {
    term: 'Eliphas Levi',
    shortDef: 'French occultist (1810–1875), one of the most influential figures in Western esotericism. His famous image of the triumphal chariot of the soul directly inspired The Chariot (VII). Author of *Dogme et Rituel de la Haute Magie*, which revived ceremonial magic in the 19th century.',
  },
  'Sebek': {
    term: 'Sebek',
    shortDef: 'The Egyptian crocodile-headed god of the Nile, strength, and devouring power — also called Sobek or Mako-the-Devourer. The crocodile at the bottom of The Fool (0) represents the ever-present danger of being consumed by the unconscious forces the Fool dances above.',
  },
  'Dalua': {
    term: 'Dalua',
    shortDef: 'A figure from Irish/Celtic mythology — "The Great Fool of the Celts." A divine fool associated with inspiration and the otherworld. Referenced alongside {Percivale} in The Fool (0) as one of the cross-cultural variants of the Sacred Fool archetype.',
  },
  'Kore': {
    term: 'Kore',
    shortDef: 'Greek for "Maiden" or "Girl." In Jungian psychology, a specific archetype: the young feminine figure full of potential but not yet integrated — virginal and dangerous. The archetype of the Princess of Wands, whose energy is pure, fierce, and unpredictable.',
  },
  'Undine': {
    term: 'Undine',
    shortDef: 'A water elemental spirit from European (particularly Germanic Romantic) tradition. In Paracelsian elemental theory, the Undine is the elemental being of {Water}, just as a Salamander is of {Fire}, a Sylph of {Air}, and a Gnome of {Earth}. The archetype of the Princess of Cups.',
  },
  'Heru-ra-ha': {
    term: 'Heru-ra-ha',
    shortDef: 'The combined name for the twin forms of {Horus} in {Thelema}: {Ra-Hoor-Khuit} (the active, martial aspect) and {Hoor-pa-kraat} (the passive, silent aspect) united as one deity. Lord of the {Aeon of Horus}. Appears in The Aeon (XX) and The Sun (XIX).',
  },
  'Abraxas': {
    term: 'Abraxas',
    shortDef: 'A Gnostic deity whose name has the numerical value 365 (days of the year). Depicted as a composite creature combining creative and destructive principles. Also called Xnoubis when shown as a lion-headed serpent. Appears on The Tower (XVI) as the force that unites creation and destruction.',
  },
  'Ganymede': {
    term: 'Ganymede',
    shortDef: 'In Greek mythology, a beautiful youth abducted by Zeus ({Jupiter}) to serve as cupbearer to the gods on Mount Olympus. Referenced in the Nine of Cups (Happiness) — {Jupiter} in {Pisces} pours the nectar of the gods through the hand of Ganymede.',
  },
  'Pasht': {
    term: 'Pasht',
    shortDef: 'The Egyptian lioness war-goddess — the fierce, solar aspect of the cat deity (distinct from the gentler Bast/Bastet). Called *saeva et ferox* (savage and ferocious). Referenced in the Five of Wands (Strife) to illustrate that even {Geburah}\'s cruelty has a feminine, ultimately nurturing origin.',
  },

  // === Esoteric & Thelemic Terms (additional) ===
  'Threefold Veil of the Negative': {
    term: 'Threefold Veil of the Negative',
    shortDef: 'The three veils of absolute nothingness in Kabbalah that precede even {Kether}: Ain (Nothing), Ain Soph (Limitless), and Ain Soph Aur (Limitless Light). They represent the state before creation — pure potential beyond all manifestation. The Fool (0) emerges from behind these veils.',
  },
  'A.·.A.·.': {
    term: 'A.·.A.·.',
    shortDef: 'Argenteum Astrum — the "Silver Star." {Crowley}\'s magical order, founded after he left the {Golden Dawn}. Its grades correspond to the {Sephiroth} on the {Tree of Life}. The High Priestess is called "Priestess of the Silver Star." Its sigil (a seven-pointed star) appears on The Star (XVII).',
  },
  'To Mega Therion': {
    term: 'To Mega Therion',
    shortDef: 'Greek: "The Great Beast" (ΤΟ ΜΕΓΑ ΘΗΡΙΟΝ). {Crowley}\'s magical title, taken from the Book of Revelation. Its numerical value is 666. The sigil of To Mega Therion appears on the Prince of Wands\' breastplate and the Ace of Disks.',
  },
  'Stele of Revealing': {
    term: 'Stele of Revealing',
    shortDef: 'An ancient Egyptian funerary tablet (c. 680 BCE) discovered in Cairo, inscribed for a priest named Ankh-af-na-Khonsu. It depicts {Nuit} arched over the sky with {Ra-Hoor-Khuit} enthroned. {Crowley} considered it the central artifact of his revelation. The Aeon (XX) card is based directly on its imagery.',
  },
  'Shemhamphorasch': {
    term: 'Shemhamphorasch',
    shortDef: 'The 72-fold Name of God in Kabbalah, derived from three verses of Exodus by a specific technique. Each of the 72 names governs 5° of the zodiac (a quinary). The 72 circles on The Universe (XXI) card represent these 72 angels/quinaries encircling the dancing maiden.',
  },
  'Enochian Magic': {
    term: 'Enochian Magic',
    shortDef: 'A system of ceremonial magic based on communications received by John Dee and Edward Kelley in the 16th century, involving a specific angelic language and four Elemental Tablets. Referenced in The Hanged Man (XII), whose limbs bear sigils from the Elemental Tablets.',
  },
  'Black Brothers': {
    term: 'Black Brothers',
    shortDef: 'In Thelemic/Kabbalistic tradition, magicians who fail to cross the {Abyss} properly. Rather than dissolving the {Ego} completely, they cling to a fragment of identity and become trapped in {Daath} — knowing without understanding, powerful but spiritually dead.',
  },
  'Adept': {
    term: 'Adept',
    shortDef: 'A practitioner who has achieved a high grade of spiritual/magical initiation — beyond a student but not yet a Master. In the {Golden Dawn}/{A.·.A.·.} systems, the three Adept grades (Minor, Major, Exemptus) correspond to {Tiphareth}, {Geburah}, and {Chesed}. The Adept has achieved Knowledge and Conversation of the {Holy Guardian Angel}.',
  },
  'Sigil': {
    term: 'Sigil',
    shortDef: 'A magical seal or symbol — a compressed symbolic signature representing a spirit, planet, or magical intention. Used in ceremonial magic and appearing throughout the Thoth deck. The "Sigil of the great King of Fire" appears on The Hermit (IX).',
  },
  'The Vision and the Voice': {
    term: 'The Vision and the Voice',
    shortDef: 'Liber 418 — {Crowley}\'s record of his visionary explorations of the 30 Aethyrs (Enochian heavens). Contains his accounts of crossing the {Abyss} and encountering {Choronzon}. Referenced in The Lovers (VI) as describing an earlier version of the card involving Cain and Abel.',
  },
  'Sacred Lance': {
    term: 'Sacred Lance',
    shortDef: 'The ritual spear — a {Phallic} symbol of masculine directed will and creative force, equivalent to the Wand in the Tarot suit system. Appears in The Lovers (VI) in the hands of the Black King. Part of the Grail legend alongside the Cup, Sword, and Disk.',
  },
  'Dying God': {
    term: 'Dying God',
    shortDef: 'A mythological-religious pattern: a god who dies sacrificially and is resurrected to redeem the world — {Osiris}, {Dionysus Zagreus}, Christ, Attis, Adonis. The central formula of the {Aeon of Osiris}, which the {Aeon of Horus} explicitly supersedes. The Hanged Man (XII) embodies this "obsolete" formula.',
  },
  'Initiation': {
    term: 'Initiation',
    shortDef: 'The formal or experiential process by which a seeker crosses a threshold into a new level of spiritual knowledge. Not merely "beginning" but a specific rite of passage that permanently alters the initiate\'s relationship to reality. Each Major Arcana card represents a stage of initiation.',
  },
  'Gematria': {
    term: 'Gematria',
    shortDef: 'The Kabbalistic practice of assigning numerical values to Hebrew letters and finding mystical connections between words sharing the same total. Example: {Cheth} (ח=8) + Yod (י=10) + Tau (ת=400) = 418 = {ABRAHADABRA}. The method by which the Thoth system connects letters, cards, and cosmic principles.',
  },
  'Microcosm': {
    term: 'Microcosm',
    shortDef: 'The "small world" — the human being understood as a miniature reflection of the Macrocosm (the Universe). The core Hermetic axiom "As above, so below" asserts their identity. The {Great Work} is the conscious unification of Microcosm and Macrocosm.',
  },
  'Macrocosm': {
    term: 'Macrocosm',
    shortDef: 'The "great world" — the Universe as a whole, the divine cosmic order. Every structure in the Macrocosm has its reflection in the {Microcosm} (the human being). The {Hexagram} represents the Macrocosm; the {Pentagram} represents the Microcosm.',
  },
  'Karma': {
    term: 'Karma',
    shortDef: 'The Hindu and Buddhist law of moral cause and effect: every action generates consequences the actor must eventually experience. In the Thoth Tarot, Adjustment (VIII) embodies karmic mathematics — the implacable, impersonal balance that cannot be cheated or escaped.',
  },
  'Numinous': {
    term: 'Numinous',
    shortDef: 'A term from theologian Rudolf Otto, adopted by Jung: the quality of overwhelming sacred awe in the presence of the divine. An experience that is "wholly other," mysterious, and terrifying in its power. Numinous encounters charge symbols, images, and relationships with transpersonal meaning.',
  },
  'Dark Night of the Soul': {
    term: 'Dark Night of the Soul',
    shortDef: 'A phrase from 16th-century Spanish mystic St. John of the Cross describing a period of profound spiritual desolation — the feeling that God/meaning has completely withdrawn. In Jungian terms, the crisis when the {Ego} has lost all connection to the {Self}. Embodied by The Moon (XVIII).',
  },
  'Neptune': {
    term: 'Neptune',
    shortDef: 'The planet of mysticism, illusion, and the dissolution of boundaries — modern ruler of {Pisces}. Neptune governs dreams, imagination, compassion, addiction, and the oceanic unconscious. In myth, Neptune/Poseidon rules the sea, the realm without fixed forms.',
    link: '/astrology?view=planet&name=Neptune',
  },
  'Pluto': {
    term: 'Pluto',
    shortDef: 'The planet of total, irreversible transformation — modern ruler of {Scorpio}. In myth, Pluto/Hades is the Roman god of the underworld who demands that everything hidden be brought to the surface. Astrologically represents death, rebirth, depth psychology, and the destruction of what is false.',
    link: '/astrology?view=planet&name=Pluto',
  },

  // === Alchemical Terms (additional) ===
  'Solutio': {
    term: 'Solutio',
    shortDef: 'Latin: "dissolution." The alchemical stage in which a solid substance is dissolved into liquid — psychologically, the breaking down of rigid mental structures into a more fluid state. The Hanged Man (XII) embodies solutio: the willing surrender of fixed identity to the waters of transformation.',
    link: '/library/alchemy',
  },
  'Albedo': {
    term: 'Albedo',
    shortDef: 'The "whitening" — the second stage of the alchemical {Great Work}, following {Nigredo} (blackening). The purified, cleansed state where the White Tincture/White Eagle emerges. Psychologically: the dawn of new awareness after the dark night of dissolution.',
    link: '/library/alchemy',
  },
  'Caput Mortuum': {
    term: 'Caput Mortuum',
    shortDef: 'Latin: "dead head." The alchemical term for the residue left after a substance has been fully calcined or distilled — the skull, the blackened remains. Appears in Art (XIV) alongside the raven, marking the transition through the death-stage that the alchemical process requires.',
    link: '/library/alchemy',
  },
  'Rectification': {
    term: 'Rectification',
    shortDef: 'The alchemical process of repeated distillation to achieve greater purity — continuous self-refinement. The "Rectificando" in {V.I.T.R.I.O.L.} refers to this process. In Art (XIV), the arrow of {Mercury}/{True Will} issues forth after rectification — purified, direct, and certain.',
    link: '/library/alchemy',
  },
  'Distillation': {
    term: 'Distillation',
    shortDef: 'The alchemical stage of heating a substance until it vaporises, then condensing it into a purer form. In Lust (XI), the union of Beast and Woman is described as distillation — base passions heated by the Sun/{Leo} into something elevated and refined. A key operation of the {Great Work}.',
    link: '/library/alchemy',
  },
  'Red Lion': {
    term: 'Red Lion',
    shortDef: 'An alchemical symbol for the active, fiery, masculine {Sulphur} principle — the solar gold-making tincture. Accompanies the Black (Moorish) King in The Lovers (VI). Its colour-exchange with the {White Eagle} in Art (XIV) signals the completion of the {Hermetic Marriage}.',
    link: '/library/alchemy',
  },
  'White Eagle': {
    term: 'White Eagle',
    shortDef: 'An alchemical symbol for the passive, volatile, feminine mercurial principle — the purified silver/lunar tincture ({Albedo}). Accompanies the White Queen in The Lovers (VI) and The Empress (III). Its counterpart is the {Red Lion}.',
    link: '/library/alchemy',
  },
  'Red Tincture': {
    term: 'Red Tincture',
    shortDef: 'The completed male principle of the alchemical {Great Work} — the solar, gold-making agent. Also called the {Red Lion} or Red Eagle. The Emperor (IV) holds this tincture as the complement to The Empress\'s {White Eagle}. Together they represent the two poles of the completed Work.',
    link: '/library/alchemy',
  },
  'Androgyne': {
    term: 'Androgyne',
    shortDef: 'A being combining both male and female characteristics in one body — a specific alchemical and mythological symbol of completed union. The central figure of Art (XIV) is an androgyne: the Black King and White Queen merged into a single being whose colours are counter-changed.',
    link: '/library/alchemy',
  },
  'Qesheth': {
    term: 'Qesheth',
    shortDef: 'Hebrew for "rainbow" or "bow." The mystical name for Path 25 on the {Tree of Life} ({Samekh}/Art), connecting {Yesod} to {Tiphareth}. The rainbow cape on Art (XIV) represents all colours emerging from the perfected alchemical mixture — the bridge between {Moon} and {Sun}.',
  },
  'Royal Art': {
    term: 'Royal Art',
    shortDef: 'A traditional name for Alchemy — the supreme art of transforming base matter (or the soul) into its highest, perfected state. Crowley renamed "Temperance" to "Art" specifically to invoke this. The Two of Cups references dolphins as sacred to the Royal Art.',
    link: '/library/alchemy',
  },
  'Universal Medicine': {
    term: 'Universal Medicine',
    shortDef: 'An alchemical concept: a substance capable of curing all disease and granting perfect health — equivalent to the {Philosopher\'s Stone} in one of its aspects, also called the Elixir of Life. One of the names for the liquid poured from the cups in The Star (XVII).',
    link: '/library/alchemy',
  },

  // === Jungian Terms (additional) ===
  'Nekyia': {
    term: 'Nekyia',
    shortDef: 'Greek: the rite of calling up the dead (from Homer\'s Odyssey, Book XI). Jung borrowed the term for the night-sea journey into the unconscious — the terrifying descent into the psychic underworld that precedes transformation. The Hermit (IX) and The Moon (XVIII) both embody the nekyia.',
  },
  'Complexes': {
    term: 'Complexes',
    shortDef: 'In Jungian psychology, autonomous clusters of emotionally charged ideas and memories organised around a central {Archetype}. A complex can "possess" the {Ego}, temporarily taking over personality and generating compulsive behaviour. Example: a "mother complex" or "power complex."',
  },
  'Psychoid': {
    term: 'Psychoid',
    shortDef: 'Jung\'s term for the deepest, most inaccessible layer of the unconscious — the stratum where psyche merges with biology and the physical world. Beyond the reach of conscious analysis. The Moon (XVIII) touches this psychoid layer, corresponding to {Qoph} (the reptilian brain).',
  },
  'Four Functions': {
    term: 'Four Functions',
    shortDef: 'Jung\'s model of four psychological functions: Thinking (logic/analysis — Swords), Feeling (value/emotion — Cups), Sensation (physical perception — Disks), and Intuition (pattern recognition — Wands). Each person has a dominant function and a repressed "inferior" function. The four suits of the Tarot correspond to the four functions.',
  },
  'Inflation': {
    term: 'Inflation',
    shortDef: 'In Jungian psychology, the state where the {Ego} becomes identified with an {Archetype} — feeling grandiose, messianic, or omnipotent. Always precedes a crash. On the Wheel of Fortune (X), the {Sphinx} at the top represents inflation; {Typhon} descending represents the inevitable deflation.',
  },
  'Projection': {
    term: 'Projection',
    shortDef: 'In Jungian psychology, the unconscious process of attributing one\'s own unrecognised qualities onto another person or object. An {Anima} projection makes another person appear magical and ideal; a {Shadow} projection makes them appear threatening. Withdrawal of projections is essential to {Individuation}.',
  },
  'Introversion': {
    term: 'Introversion',
    shortDef: 'In Jungian psychology, the turning of psychic energy inward — away from the external world toward the inner life of reflection, imagination, and unconscious contents. The Hermit (IX) is the archetype of introversion: the deliberate withdrawal into solitude to find the inner light.',
  },
  'Chthonic': {
    term: 'Chthonic',
    shortDef: 'Greek: "of the earth/underworld." Describes forces that are earthy, primordial, subterranean, and instinctual — the opposite of celestial or spiritual. The Devil (XV) embodies chthonic power: the creative energy of matter itself, rising from below rather than descending from above.',
  },

  // === Astrological Terms (additional) ===
  'Detriment': {
    term: 'Detriment',
    shortDef: 'A planet is "in detriment" when placed in the sign opposite its home sign — where it operates awkwardly and against its nature. Example: {Venus} rules {Taurus} and {Libra}; therefore Venus is in detriment in {Scorpio} (opposite Taurus). The Seven of Cups shows Venus in her detriment — love corrupted into debauchery.',
  },
  'Fall': {
    term: 'Fall',
    shortDef: 'A planet is in its "fall" in the sign opposite its {Exaltation} — its most debilitated placement. Example: the {Sun} is exalted in {Aries}, so it falls in {Libra}; {Jupiter} is exalted in {Cancer}, so it falls in {Capricorn}. The opposite of exaltation — energy at its weakest.',
  },

  // === Structural/System Terms ===
  'Major Arcana': {
    term: 'Major Arcana',
    shortDef: 'The 22 "greater secrets" of the Tarot — the trump cards numbered 0 (The Fool) through XXI (The Universe). Each corresponds to a Hebrew letter and a path on the {Tree of Life}. They represent the great archetypal forces and stages of {Initiation}. Crowley calls them "Atu" (Egyptian for "house/key").',
  },
  'Minor Arcana': {
    term: 'Minor Arcana',
    shortDef: 'The 56 "lesser secrets" of the Tarot — consisting of 40 pip cards (Ace through Ten in each suit) and 16 Court Cards (Knight, Queen, Prince, Princess). The pips represent the {Sephiroth} operating through the four elements; the Court Cards represent the {Tetragrammaton} in each suit.',
  },
  'Court Card': {
    term: 'Court Card',
    shortDef: 'The 16 rank cards of the Tarot — four in each suit. In the Thoth system: Knight ({Yod}/{Fire}), Queen ({Heh}/{Water}), Prince ({Vau}/{Air}), Princess (final {Heh}/{Earth}). Each is a combination of two elements: one from the rank and one from the suit. The Court Cards represent real people and personality types.',
  },
  'Querent': {
    term: 'Querent',
    shortDef: 'The person asking the question in a Tarot reading — the person the reading is "about." From Latin *quaerens* ("one who seeks"). The Court Cards in a reading often represent the querent or people in their life.',
  },
  'Badly Dignified': {
    term: 'Badly Dignified',
    shortDef: 'A technical Tarot term meaning a card whose energies are weakened, reversed, or expressing their negative pole — due to surrounding cards or positional context. The opposite is "well dignified." When a card is badly dignified, its shadow qualities dominate over its strengths.',
  },
  'Naples Arrangement': {
    term: 'Naples Arrangement',
    shortDef: 'A philosophical sequence described in {Crowley}\'s Book of Thoth deriving the four dimensions of reality from zero: Point (0) → Line (1) → Surface (2) → Solid (3) → Matter in Motion (4). At step Four the sequence hits a dead end and requires a new principle to continue — the irruption of the Five.',
  },

  // === Other Cultural/Religious Terms ===
  'Yoni': {
    term: 'Yoni',
    shortDef: 'Sanskrit: the feminine generative symbol — the sacred vulva/womb as creative principle. Counterpart to the {Lingam}. In the Thoth Tarot, the {Vesica Piscis} and the Cup are yoni symbols — the receptive vessel through which spirit manifests. Appears in the Ace of Cups.',
  },
  'Lingam': {
    term: 'Lingam',
    shortDef: 'Sanskrit: the masculine generative symbol — the sacred phallus as creative principle. Counterpart to the {Yoni}. In Hindu temples, the Lingam rises from the Yoni, representing the union of Shiva and Shakti. In the Thoth system, the Wand and the {Phallic} cone are lingam symbols.',
  },
  'AUM': {
    term: 'AUM',
    shortDef: 'The sacred syllable of Hindu tradition — the primordial sound of the universe representing the entire process of creation, preservation, and dissolution. The swan (Hamsa) on the Princess of Cups symbolises AUM. Related to but distinct from the Western {Logos}.',
  },
  'Dukkha': {
    term: 'Dukkha',
    shortDef: 'Pali/Sanskrit: suffering, unsatisfactoriness, the inherent stress of conditioned existence. The Buddha identified dukkha as the first of the Four Noble Truths. Referenced in the Three of Swords (Sorrow) — the universal, built-in melancholy of existence that no amount of pleasure can resolve.',
  },
  'Lotus': {
    term: 'Lotus',
    shortDef: 'The sacred water flower of Egyptian, Hindu, and Buddhist traditions. Rises pure from muddy water — representing spiritual awakening emerging from the unconscious depths. Sacred to {Isis} and central to the Cups suit. The Ace of Cups blooms as a lotus; the Lotus Wand is a key {Golden Dawn} ritual instrument.',
  },
  'Rubeus': {
    term: 'Rubeus',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Red" in Latin. Attributed to {Mars} in {Scorpio}. Considered the most malefic geomantic figure — so ominous that some schools destroy the entire reading if Rubeus appears in the Ascendant. Referenced in the Five of Cups (Disappointment) and Seven of Disks (Failure).',
  },
  'Laetitia': {
    term: 'Laetitia',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Joy" or "Gladness" in Latin. Attributed to {Jupiter} in {Pisces}. One of the most auspicious geomantic figures. {Crowley} identifies it as nearly identical in meaning to the Nine of Cups (Happiness).',
  },
  'Aeon of Maat': {
    term: 'Aeon of Maat',
    shortDef: 'The prophesied next cosmic epoch after the {Aeon of Horus}, attributed to {Maat} — the goddess of Justice and Balance. Expected in approximately 2,000 years. Hinted at in The Aeon (XX) by the Sign of {Libra} behind the letter {Shin}, suggesting justice as the principle of the coming age.',
  },

  // === Additional terms from Tree of Life & Astrology descriptions ===
  'Astral Light': {
    term: 'Astral Light',
    shortDef: 'A subtle, invisible, malleable medium that interpenetrates all matter — capable of holding impressions and being shaped by will and imagination. Coined by {Eliphas Levi}. Associated with {Yesod} and the {Moon}. The "plastic" substance of dreams, visions, and magical operations.',
  },
  'Personal Unconscious': {
    term: 'Personal Unconscious',
    shortDef: 'In Jungian psychology, the individual layer of the unconscious containing personal repressed memories, forgotten experiences, and unlived emotions. Distinct from the deeper {Collective Unconscious}, which is shared by all humanity. On the {Tree of Life}, corresponds to {Yesod}.',
  },
  'Centaur': {
    term: 'Centaur',
    shortDef: 'A creature from Greek mythology with the upper body of a human and lower body of a horse. {Sagittarius} is depicted as a centaur-archer, representing the dual nature of the human being — part animal instinct, part philosophical mind. The arrow aims at transcendent truth.',
    link: '/astrology?view=sign&name=Sagittarius',
  },
  'Trickster': {
    term: 'Trickster',
    shortDef: 'A universal mythological {Archetype}: the cunning, boundary-crossing figure who breaks rules, crosses thresholds, and enables transformation through deception. Loki, Coyote, Anansi, and {Hermes} are classic Tricksters. In the Thoth Tarot, embodied by The Magus (I) and associated with {Mercury}/{Gemini}.',
  },
  'Emanation': {
    term: 'Emanation',
    shortDef: 'The Kabbalistic doctrine that existence "flows out" from the divine source like light radiating from the sun, rather than being created by an external act. The mode of existence of {Atziluth} (the Archetypal World). Each {Sephirah} emanates from the one above it.',
  },
  'Archangels': {
    term: 'Archangels',
    shortDef: 'The highest-ranking angelic intelligences in the Kabbalistic hierarchy. Each {Sephirah} is governed by a specific Archangel who carries out the divine will at that level. They operate in the world of {Briah} (Creation). Examples: Tzaphkiel ({Binah}), Raphael ({Tiphareth}), Gabriel ({Yesod}).',
  },
  'Crossing the Abyss': {
    term: 'Crossing the Abyss',
    shortDef: 'The supreme initiatory ordeal in the Thelemic/{Golden Dawn} grade system: the {Adept} must completely dissolve the {Ego} to pass from the lower {Tree of Life} into the {Supernal Triad}. Failure produces the {Black Brothers}; success produces a Master of the Temple. {Choronzon} guards the passage.',
  },
  'Greater Benefic': {
    term: 'Greater Benefic',
    shortDef: 'Classical astrological title for {Jupiter} — the planet of maximum benevolence, expansion, and good fortune. {Venus} is the "Lesser Benefic." Their counterparts are {Saturn} (Greater Malefic) and {Mars} (Lesser Malefic). This classification system predates modern astrology.',
  },
  'Homeostasis': {
    term: 'Homeostasis',
    shortDef: 'From biology: a system\'s self-regulating tendency to maintain stable internal conditions. In Jungian psychology, the psyche\'s automatic drive to restore equilibrium when thrown off centre. {Libra}/Adjustment (VIII) embodies this principle — every inflation answered by a deflation.',
  },
  'Elemental Weapons': {
    term: 'Elemental Weapons',
    shortDef: 'The four ritual tools of the {Golden Dawn} ceremonial magic system, each corresponding to one element: Wand ({Fire}), Cup ({Water}), Sword ({Air}), and Disk/Pentacle ({Earth}). They appear in the hands of The Magus (I) and as the four suits of the {Minor Arcana}.',
  },
  'Elemental Dignities': {
    term: 'Elemental Dignities',
    shortDef: 'The system by which each {Court Card} is assigned a sub-element within its suit\'s element. Knights = {Fire}, Queens = {Water}, Princes = {Air}, Princesses = {Earth}. So the Knight of Cups = "fiery part of Water." This creates 16 unique elemental combinations corresponding to the 16 Court Cards.',
  },
  'Astral': {
    term: 'Astral',
    shortDef: 'Relating to the astral plane — the subtle, non-physical dimension of dreams, visions, and imagination that lies between the mental and physical planes. In Kabbalistic terms, corresponds to {Yesod} and the {Astral Light}. "Astral projection" means consciousness travelling in this realm.',
  },
  'Sublimation': {
    term: 'Sublimation',
    shortDef: 'In psychology, the transformation of raw instinctual energy into a higher, culturally or spiritually refined form. In alchemy, the direct conversion of a solid to vapour. {Scorpio}\'s three forms (scorpion → serpent → eagle) represent three stages of sublimation — from unconscious reaction to spiritual transcendence.',
  },

  // === Geomantic Figures (additional) ===
  'Puer': {
    term: 'Puer',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Boy" in Latin. Attributed to {Mars} in {Aries}. Represents aggressive, youthful, impulsive martial energy — the warrior before wisdom. Appears in the Two of Wands (Dominion). Distinct from the Jungian {Puer Aeternus} archetype.',
  },
  'Populus': {
    term: 'Populus',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "The People" or "The Crowd" in Latin. Attributed to the {Moon}. Represents the collective, the common people, passivity, and the Moon retiring from manifestation toward her conjunction with the {Sun}. Appears in the Eight of Disks (Prudence).',
  },
  'Amissio': {
    term: 'Amissio',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Loss" in Latin. Attributed to {Venus} in outward expression. Represents things slipping away, dissipation of resources, and the transience of pleasure. The complement of Acquisitio (Gain).',
  },
  'Acquisitio': {
    term: 'Acquisitio',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Gain" in Latin. Attributed to {Jupiter} in outward expression. Represents acquisition, profit, and the accumulation of resources. The complement of Amissio (Loss).',
  },
  'Fortuna Major': {
    term: 'Fortuna Major',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Greater Fortune" in Latin. Attributed to the {Sun}. Represents great success, protection, and inner power. One of the most auspicious figures, associated with solar strength and victory.',
  },
  'Fortuna Minor': {
    term: 'Fortuna Minor',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Lesser Fortune" in Latin. Attributed to the {Sun} in its swifter aspect. Represents fleeting success, external aid, and luck that must be seized quickly before it passes.',
  },
  'Caput Draconis': {
    term: 'Caput Draconis',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Head of the Dragon" in Latin. Attributed to the North Node of the {Moon}. Represents beginnings, thresholds, and the doorway into new experiences. Favourable for starting things.',
  },
  'Cauda Draconis': {
    term: 'Cauda Draconis',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Tail of the Dragon" in Latin. Attributed to the South Node of the {Moon}. Represents endings, departures, and the doorway out. Favourable for concluding things, unfavourable for starting them.',
  },
  'Conjunctio (Geomantic)': {
    term: 'Conjunctio (Geomantic)',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Union" in Latin. Attributed to {Mercury}. Represents meetings, combinations, and the joining of separate things. Distinct from the alchemical {Conjunctio} (marriage of opposites), though the name reflects the same principle of union.',
  },
  'Carcer': {
    term: 'Carcer',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Prison" in Latin. Attributed to {Saturn}. Represents restriction, isolation, binding, and delay. Unfavourable for movement but favourable for anything requiring stability and containment.',
  },
  'Tristitia': {
    term: 'Tristitia',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Sorrow" in Latin. Attributed to {Saturn} in {Aquarius}. Represents sadness, downward movement, and contraction. Not purely negative — it is the necessary descent that precedes the renewal of {Laetitia} (Joy).',
  },
  'Via': {
    term: 'Via',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Road" or "Way" in Latin. Attributed to the {Moon} in its most active aspect. Represents journey, change, movement, and transition. All four lines are single dots — the figure of pure flow.',
  },
  'Albus': {
    term: 'Albus',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "White" in Latin. Attributed to {Mercury}. Represents wisdom, purity, peace, and clear thought. Favourable for intellectual and spiritual matters.',
  },
  'Puella': {
    term: 'Puella',
    shortDef: 'One of the 16 {Geomantic} figures, meaning "Girl" in Latin. Attributed to {Venus}. Represents beauty, harmony, passivity, and receptivity. The feminine counterpart to {Puer} (Boy). Favourable for love and pleasure, less so for action.',
  },

  // === Jungian Sub-Concepts (additional) ===
  // Note: 'Dark Night of the Soul' already exists above in the esoteric section
  'Thinking Function': {
    term: 'Thinking Function',
    shortDef: 'One of Jung\'s {Four Functions}. The mode of psychological orientation through logic, analysis, and rational categorisation. Dominant in the Swords suit and associated with {Air} and {Hod}. Its opposite is the Feeling Function. When overdeveloped, produces intellectual brilliance but emotional coldness.',
  },
  'Feeling Function': {
    term: 'Feeling Function',
    shortDef: 'One of Jung\'s {Four Functions}. The mode of evaluating experience through attraction/repulsion and assigning personal value — not mere emotion, but the capacity to discern what matters. Dominant in the Cups suit and associated with {Water} and {Netzach}. Its opposite is the Thinking Function.',
  },
  'Sensation Function': {
    term: 'Sensation Function',
    shortDef: 'One of Jung\'s {Four Functions}. The mode of perceiving the world through direct physical, sensory experience — concrete, present-tense reality. Dominant in the Disks suit and associated with {Earth} and {Malkuth}. Its opposite is the Intuition Function.',
  },
  'Intuition Function': {
    term: 'Intuition Function',
    shortDef: 'One of Jung\'s {Four Functions}. The mode of perceiving patterns, possibilities, and meanings beyond immediate sensory data — "unconscious perception." Dominant in the Wands suit and associated with {Fire} and the creative flash. Its opposite is the Sensation Function.',
  },
  'Negative Anima': {
    term: 'Negative Anima',
    shortDef: 'The shadow expression of the {Anima} — the inner feminine figure contaminated by resentment, possessiveness, or moodiness. When the {Anima} is negative, it turns the emotional life toxic: the individual becomes moody, spiteful, and manipulative. The Queen of Cups badly dignified embodies this.',
  },
  'Anima Projection': {
    term: 'Anima Projection',
    shortDef: 'A specific form of {Projection} in which the {Anima} (inner feminine image) is unconsciously attributed to an external person, making that person appear magical, numinous, and ideal. The collapse of an Anima projection — when the magic fades — is one of the most painful psychological experiences. Embodied by the Five of Cups.',
  },
  'Ego-Death': {
    term: 'Ego-Death',
    shortDef: 'The complete dissolution or annihilation of the ordinary sense of self — not literal death but the collapse of the structures by which the {Ego} defines itself. Central to The Tower (XVI), Death (XIII), and {Crossing the Abyss}. Can be a gateway to transformation or, if resisted, to psychosis.',
  },
  'Defence Mechanisms': {
    term: 'Defence Mechanisms',
    shortDef: 'In Freudian/Jungian psychology, the automatic, unconscious strategies the {Ego} uses to protect itself from threatening thoughts, feelings, or realities. Examples: denial, repression, {Projection}, rationalisation. The Tower (XVI) shatters these defences; the Seven of Wands desperately deploys them.',
  },
  'Compensation': {
    term: 'Compensation',
    shortDef: 'Jung\'s law that every one-sided conscious attitude automatically generates an opposite tendency in the unconscious. Related to {Enantiodromia} but more specific: the psyche compensates for the {Ego}\'s blind spots by producing corrective dreams, symptoms, or {Complexes}. Embodied by Adjustment (VIII).',
  },
  'Deflation': {
    term: 'Deflation',
    shortDef: 'The Jungian counterpart to {Inflation}: the collapse of an over-expanded ego-state, experienced as depression, humiliation, or crushing loss of meaning. {Inflation} always precedes deflation — the higher the rise, the harder the fall. The Wheel of Fortune (X) embodies this cycle.',
  },
  'Numinosum': {
    term: 'Numinosum',
    shortDef: 'The Latin form of "{Numinous}" used by Rudolf Otto and Jung. The numinosum is the thing itself that carries numinous power — the sacred object, image, or experience that overwhelms the {Ego} with awe. Distinguished from the adjective "numinous" (the quality) — the numinosum IS the encounter.',
  },
};
