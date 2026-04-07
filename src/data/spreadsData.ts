// ============================================
// Tarot Spreads — layouts and position meanings
// ============================================

export interface SpreadPosition {
  number: number;
  name: string;
  meaning: string;
  x: number;
  y: number;
}

export interface TarotSpread {
  id: string;
  name: string;
  cardCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  positions: SpreadPosition[];
  svgWidth: number;
  svgHeight: number;
}

// Card size: 70x105, so positions need at least 90px horizontal and 125px vertical spacing

export const spreads: TarotSpread[] = [
  {
    id: 'single-card',
    name: 'Single Card',
    cardCount: 1,
    difficulty: 'Beginner',
    description: `The simplest and most direct form of divination. A single card is drawn to answer a question, illuminate a situation, or set the tone for the day. Despite its simplicity, the Single Card draw can be profoundly insightful — the entire universe of the Tarot is compressed into one symbol, demanding that the reader engage with it fully.

Best used for: daily guidance, yes/no questions, meditation focus, or when clarity on a single issue is needed.`,
    positions: [
      { number: 1, name: 'The Card', meaning: 'The answer, the energy of the moment, the central truth that needs to be seen. This single card is both the question and the answer — a mirror held up to the present.', x: 100, y: 80 },
    ],
    svgWidth: 200,
    svgHeight: 160,
  },
  {
    id: 'three-card',
    name: 'Three Card Spread',
    cardCount: 3,
    difficulty: 'Beginner',
    description: `The foundational spread — three cards laid in a row, each illuminating a different dimension of the question. The most common interpretation is Past / Present / Future, but this versatile layout adapts to many triadic frameworks: Situation–Action–Outcome, Mind–Body–Spirit, or Thesis–Antithesis–Synthesis.

The number Three (Binah, the triangle, the first stable form) makes this spread particularly resonant in the Thoth system — it is the minimum structure needed to tell a story.`,
    positions: [
      { number: 1, name: 'Past', meaning: 'The foundation — what has led to the present situation. The forces, events, and patterns that have shaped the current moment. In psychological terms, the conditioning and unconscious material the present is built upon.', x: 55, y: 80 },
      { number: 2, name: 'Present', meaning: 'The current state — where you are now, what energy is dominant, what the situation looks like when seen clearly. The card of honest self-assessment.', x: 165, y: 80 },
      { number: 3, name: 'Future', meaning: 'The trajectory — where the current energy is heading if nothing changes. Not fate but direction. The future card shows the natural consequence of the present, which can be altered by conscious choice.', x: 275, y: 80 },
    ],
    svgWidth: 330,
    svgHeight: 160,
  },
  {
    id: 'five-card-cross',
    name: 'Five Card Cross',
    cardCount: 5,
    difficulty: 'Beginner',
    description: `An expansion of the Three Card spread that adds two crucial dimensions: the unconscious influence below and the conscious aspiration above. The cross shape mirrors the fundamental symbol of manifestation — spirit descending into matter through the four directions.

Excellent for situations where the past–present–future axis alone feels insufficient, and the querent senses that hidden forces or unacknowledged desires are shaping the outcome.`,
    positions: [
      { number: 1, name: 'Present', meaning: 'The central situation — where you stand right now. The heart of the cross, the point from which all other positions radiate.', x: 165, y: 195 },
      { number: 2, name: 'Past', meaning: 'What lies behind — the events, choices, and patterns that have brought you to this point.', x: 55, y: 195 },
      { number: 3, name: 'Future', meaning: 'What lies ahead — the direction the energy is moving, the probable outcome if the current course continues.', x: 275, y: 195 },
      { number: 4, name: 'Above', meaning: 'The conscious aspiration — what you hope for, what you are trying to achieve, or the best possible outcome you can envision. The goal, the ideal, the light toward which you reach.', x: 165, y: 70 },
      { number: 5, name: 'Below', meaning: 'The unconscious foundation — what you are not seeing, the hidden influence, the shadow factor. This card reveals the underlying motive, fear, or desire that the conscious mind has not acknowledged.', x: 165, y: 320 },
    ],
    svgWidth: 330,
    svgHeight: 390,
  },
  {
    id: 'horseshoe',
    name: 'Horseshoe Spread',
    cardCount: 7,
    difficulty: 'Intermediate',
    description: `Seven cards in a U-shape, providing a comprehensive narrative arc. The shape is significant — the open end faces upward, suggesting receptivity to what is coming. The seven positions mirror the seven lower Sephiroth (Chesed through Malkuth), grounding the reading in practical, manifested experience.

One of the most balanced general-purpose spreads, suitable for any question that requires more depth than three cards but less complexity than the Celtic Cross.`,
    positions: [
      { number: 1, name: 'Past', meaning: 'The distant past — the deep background, the original cause or the first seed from which the current situation grew.', x: 55, y: 320 },
      { number: 2, name: 'Recent Past', meaning: 'The recent past — events and influences from the near past that are still actively shaping the present.', x: 55, y: 195 },
      { number: 3, name: 'Present', meaning: 'The current state of affairs — what is happening right now, the energy that dominates this moment.', x: 55, y: 70 },
      { number: 4, name: 'Hidden', meaning: 'The hidden factor — unconscious forces, secret influences, or aspects of the situation not yet visible. The shadow card of the reading.', x: 195, y: 70 },
      { number: 5, name: 'External', meaning: 'The external environment — other people, institutions, and forces beyond the querent\'s control affecting the outcome.', x: 335, y: 70 },
      { number: 6, name: 'Advice', meaning: 'The recommended action — what the querent should do, focus on, or change to navigate the situation most effectively.', x: 335, y: 195 },
      { number: 7, name: 'Outcome', meaning: 'The probable outcome — where all forces converge if the current trajectory continues and the advice is (or is not) followed.', x: 335, y: 320 },
    ],
    svgWidth: 390,
    svgHeight: 390,
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    cardCount: 10,
    difficulty: 'Advanced',
    description: `The most famous Tarot spread — ten cards providing a complete map of the querent's situation, inner state, influences, hopes, fears, and probable outcome. Attributed to the Golden Dawn tradition, it combines a central cross of six cards (the situation) with a vertical staff of four cards (the path forward).

Its ten positions mirror the ten Sephiroth of the Tree of Life, making it a complete circuit of the manifest universe applied to a single question. Rewards experienced readers who can synthesize multiple cards into a coherent narrative.`,
    positions: [
      { number: 1, name: 'Present', meaning: 'The significator — the central issue, the heart of the matter. This card represents the querent\'s current state or the essence of the question.', x: 165, y: 265 },
      { number: 2, name: 'Challenge', meaning: 'The crossing card — laid horizontally across the first. The immediate obstacle, opposition, or challenge, whether external or internal.', x: 165, y: 265 },
      { number: 3, name: 'Foundation', meaning: 'The root of the matter — the deep, unconscious basis of the situation. What lies beneath, often something the querent has forgotten or repressed.', x: 165, y: 405 },
      { number: 4, name: 'Past', meaning: 'What is passing away — the energy, situation, or influence that is fading. What the querent is leaving behind.', x: 45, y: 265 },
      { number: 5, name: 'Crown', meaning: 'The best possible outcome — what could be achieved, the highest potential. Not a prediction but an aspiration, the light at the top of the cross.', x: 165, y: 125 },
      { number: 6, name: 'Future', meaning: 'What is approaching — the energy or influence about to enter the situation. The immediate next step, not the final outcome.', x: 285, y: 265 },
      { number: 7, name: 'Self', meaning: 'The querent\'s attitude — how you see yourself in this situation, your current self-image and conscious approach.', x: 420, y: 430 },
      { number: 8, name: 'Environment', meaning: 'External influences — how others see you, the social and material context, the environment you operate in.', x: 420, y: 305 },
      { number: 9, name: 'Hopes/Fears', meaning: 'The querent\'s deepest hope or fear (often they are the same). The emotional charge driving the question — what you most want and most dread.', x: 420, y: 180 },
      { number: 10, name: 'Outcome', meaning: 'The final outcome — the culmination of all forces in play. The probable result if current energies play out. Not immutable — the reading exists to empower the querent to change this if needed.', x: 420, y: 65 },
    ],
    svgWidth: 480,
    svgHeight: 500,
  },
  {
    id: 'tree-of-life-spread',
    name: 'Tree of Life Spread',
    cardCount: 10,
    difficulty: 'Advanced',
    description: `Ten cards in the pattern of the Kabbalistic Tree of Life. Each position corresponds to a Sephirah, making this the most structurally profound spread in the Thoth system. It maps the querent's entire life situation onto the architecture of creation itself.

Particularly suited to the Thoth Tarot because the deck was designed around the Tree. Each card is read not just for its own meaning but for its interaction with the Sephirah it occupies — a Six of Cups in Tiphareth is "pleasure at the centre of the Self," while the same card in Malkuth would be "pleasure manifesting in the material world."`,
    positions: [
      { number: 1, name: 'Kether', meaning: 'The highest aspiration — your connection to the divine, your deepest spiritual nature. What is your ultimate truth?', x: 220, y: 55 },
      { number: 2, name: 'Chokmah', meaning: 'Creative force — your active, projecting energy, your will, your capacity to initiate. Where is your power directed?', x: 350, y: 120 },
      { number: 3, name: 'Binah', meaning: 'Understanding — your receptive capacity, your ability to give form to the formless. What do you truly comprehend?', x: 90, y: 120 },
      { number: 4, name: 'Chesed', meaning: 'Abundance — what resources (material, emotional, spiritual) are available to you? Where is mercy flowing?', x: 350, y: 235 },
      { number: 5, name: 'Geburah', meaning: 'Challenge — what needs to be cut away? Where is the necessary discipline, the purifying fire?', x: 90, y: 235 },
      { number: 6, name: 'Tiphareth', meaning: 'Heart — the central card. Who are you at your centre? What does your heart know?', x: 220, y: 280 },
      { number: 7, name: 'Netzach', meaning: 'Desire — what do you truly want? What are you emotionally invested in?', x: 350, y: 365 },
      { number: 8, name: 'Hod', meaning: 'Intellect — what does your mind tell you? How are you thinking about this?', x: 90, y: 365 },
      { number: 9, name: 'Yesod', meaning: 'Unconscious — what operates beneath awareness? What does your body know that your mind doesn\'t?', x: 220, y: 430 },
      { number: 10, name: 'Malkuth', meaning: 'Material world — how is all of this manifesting in your actual, tangible, daily life? The bottom line.', x: 220, y: 555 },
    ],
    svgWidth: 440,
    svgHeight: 620,
  },
];
