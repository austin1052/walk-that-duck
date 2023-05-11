import styles from "../styles/PointBar.module.css"

export const currentSeason = "AS-8"

export const pointButtonStyles = {
  winner: {
    normal: `${styles.span3} ${styles.winner}`,
    selected: `${styles.span3} ${styles.winner} ${styles.winnerSelected} `,
    disabled: `${styles.span3} ${styles.winner} ${styles.disabled} `
  },
  mini: {
    normal: `${styles.span3} ${styles.mini} `,
    selected: `${styles.span3} ${styles.mini} ${styles.miniSelected} `,
    disabled: `${styles.span3} ${styles.mini} ${styles.disabled} `
  },
  top: {
    normal: `${styles.span3} ${styles.top} `,
    selected: `${styles.span3} ${styles.top} ${styles.topSelected} `,
    disabled: `${styles.span3} ${styles.top} ${styles.disabled} `
  },
  safe: {
    normal: `${styles.spanAll} ${styles.safe} `,
    selected: `${styles.spanAll} ${styles.safe} ${styles.safeSelected} `,
    disabled: `${styles.spanAll} ${styles.safe} ${styles.disabled} `
  },
  bottom: {
    normal: `${styles.span3} ${styles.bottom} `,
    selected: `${styles.span3} ${styles.bottom} ${styles.bottomSelected} `,
    disabled: `${styles.span3} ${styles.bottom} ${styles.disabled} `
  },
  low: {
    normal: `${styles.span3} ${styles.low} `,
    selected: `${styles.span3} ${styles.low} ${styles.lowSelected} `,
    disabled: `${styles.span3} ${styles.low} ${styles.disabled} `
  },
  eliminated: {
    normal: `${styles.span3} ${styles.eliminated} `,
    selected: `${styles.span3} ${styles.eliminated} ${styles.eliminatedSelected} `,
    disabled: `${styles.span3} ${styles.eliminated} ${styles.disabled} `
  }
}

export const options = {
  playerOptions: {
    category: "player",
    label: "Choose 3 Players",
    max: 3,
    multiplier: 1
  },
  slayerOptions: {
    category: "slayer",
    label: "Choose 2 Slayers",
    max: 2,
    multiplier: 2
  },
  winnerOptions: {
    category: "winner",
    label: "Choose 1 Winner",
    max: 1,
    multiplier: 3
  }
}

export const queenData = {
  amethyst: {
    name: "Amethyst",
    active: true,
    stans: []
  },
  anetra: {
    name: "Anetra",
    active: true,
    stans: []
  },
  auramayari: {
    name: "Aura Mayari",
    active: true,
    stans: []
  },
  irenedubois: {
    name: "Irene Dubois",
    active: true,
    stans: []
  },
  jax: {
    name: "Jax",
    active: true,
    stans: []
  },
  looseyladuca: {
    name: "Loosey LaDuca",
    active: true,
    stans: []
  },
  luxxnoirlondon: {
    name: "Luxx Noir London",
    active: true,
    stans: []
  },
  mbdf: {
    name: "Malaysia Babydoll Foxx",
    active: true,
    stans: []
  },
  marciax3: {
    name: "Marcia Marcia Marcia",
    active: true,
    stans: []
  },
  mib: {
    name: "Mistress Isabelle Brooks",
    active: true,
    stans: []
  },
  princesspoppy: {
    name: "Princess Poppy",
    active: true,
    stans: []
  },
  robinfierce: {
    name: "Robin Fierce",
    active: true,
    stans: []
  },
  salinaestitties: {
    name: "Salina EsTitties",
    active: true,
    stans: []
  },
  sashacolby: {
    name: "Sasha Colby",
    active: true,
    stans: []
  },
  spice: {
    name: "Spice",
    active: true,
    stans: []
  },
  sugar: {
    name: "Sugar",
    active: true,
    stans: []
  }
}

export const players = [
  {
    username: "carson",
    name: "Carson",
    houseName: "Big Juicy Ass",
    queens: [["sashacolby", 3], ["looseyladuca", 2], ["mib", 2], ["anetra", 1], ["irenedubois", 1], ["princesspoppy", 1]]
  },
  {
    username: "eric",
    name: "Eric",
    houseName: "Spagliato",
    queens: [["looseyladuca", 3], ["robinfierce", 2], ["mbdf", 2], ["salinaestitties", 1], ["jax", 1], ["irenedubois", 1]]
  },
  {
    username: "jack",
    name: "Jack",
    houseName: "The House Down",
    queens: [["sashacolby", 3], ["irenedubois", 2], ["mib", 2], ["salinaestitties", 1], ["anetra", 1], ["marciax3", 1]]
  },
  {
    username: "alex",
    name: "Alex",
    houseName: "Alex's Queen Team",
    queens: [["princesspoppy", 3], ["irenedubois", 2], ["mbdf", 2], ["salinaestitties", 1], ["sashacolby", 1], ["auramayari", 1]]
  },
  {
    username: "jordan",
    name: "Jordan",
    houseName: "HOUSE on Fox Starring Stuart Little Star Hugh Laurie",
    queens: [["sashacolby", 3], ["luxxnoirlondon", 2], ["marciax3", 2], ["mib", 1], ["salinaestitties", 1], ["looseyladuca", 1]]
  },
  {
    username: "caroline",
    name: "Caroline",
    houseName: "savage",
    queens: [["irenedubois", 3], ["sashacolby", 2], ["salinaestitties", 2], ["mib", 1], ["luxxnoirlondon", 1], ["looseyladuca", 1]]
  },
  {
    username: "timiki",
    name: "Timiki",
    houseName: "the Mouse",
    queens: [["mib", 3], ["anetra", 2], ["sashacolby", 2], ["jax", 1], ["salinaestitties", 1], ["auramayari", 1]]
  },
  {
    username: "ariel",
    name: "Ariel",
    houseName: "House The Boots Down House",
    queens: [["sashacolby", 3], ["auramayari", 2], ["mbdf", 2], ["robinfierce", 1], ["looseyladuca", 1], ["luxxnoirlondon", 1]]
  },
  {
    username: "austin",
    name: "Austin",
    houseName: "Shartier",
    queens: [["looseyladuca", 3], ["marciax3", 2], ["irenedubois", 2], ["salinaestitties", 1], ["spice", 1], ["mbdf", 1]]
  },
  {
    username: "isabel",
    name: "Isabel",
    houseName: "MINIONITA",
    queens: [["princesspoppy", 3], ["sashacolby", 2], ["salinaestitties", 2], ["mbdf", 1], ["irenedubois", 1], ["auramayari", 1]]
  }
]

export const pointValues = {
  winner: 10,
  mini: 2,
  top: 7.5,
  safe: 5,
  low: 2.5,
  bottom: 0,
  eliminated: 0
}

export const queenPoints = {
  amethyst: 0,
  anetra: 0,
  auramayari: 0,
  irenedubois: 0,
  jax: 0,
  looseyladuca: 0,
  luxxnoirlondon: 0,
  mbdf: 0,
  marciax3: 0,
  mib: 0,
  princesspoppy: 0,
  robinfierce: 0,
  salinaestitties: 0,
  sashacolby: 0,
  spice: 0,
  sugar: 0
}

export const initialCategories = {
  winner: false,
  mini: false,
  top: false,
  low: false,
  bottom: false,
  eliminated: false
}

export const episodeDates = {
  week1: "006",
  week2: "013",
  week3: "020",
  week4: "027",
  week5: "103",
  week6: "110",
  week7: "117",
  week8: "124",
  week9: "203",
  week10: "210",
  week11: "217",
  week12: "224",
  week13: "231",
  week14: "307",
  week15: "314"
}

export const months = ["January", "February", "March"]

export const previousWeeksPoints = [
  ["006", [
    {
      id: "amethyst",
      points: 0
    },
    {
      id: "anetra",
      points: 10
    },
    {
      id: "auramayari",
      points: 5
    },
    {
      id: "irenedubois",
      points: 2,
      selected: { eliminated: true }
    },
    {
      id: "jax",
      points: 7.5
    },
    {
      id: "looseyladuca",
      points: 4.5
    },
    {
      id: "luxxnoirlondon",
      points: 5
    },
    {
      id: "marciax3",
      points: 7.5
    },
    {
      id: "mbdf",
      points: 5
    },
    {
      id: "mib",
      points: 5
    },
    {
      id: "princesspoppy",
      points: 5
    },
    {
      id: "robinfierce",
      points: 5
    },
    {
      id: "salinaestitties",
      points: 5
    },
    {
      id: "sashacolby",
      points: 5
    },
    {
      id: "spice",
      points: 5
    },
    {
      id: "sugar",
      points: 5
    },
  ]
  ],
  ["013", [
    {
      id: "amethyst",
      points: 0
    },
    {
      id: "anetra",
      points: 5
    },
    {
      id: "auramayari",
      points: 5
    },
    {
      id: "jax",
      points: 2.5
    },
    {
      id: "looseyladuca",
      points: 7.5
    },
    {
      id: "luxxnoirlondon",
      points: 7.5
    },
    {
      id: "marciax3",
      points: 5
    },
    {
      id: "mbdf",
      points: 5
    },
    {
      id: "mib",
      points: 5
    },
    {
      id: "princesspoppy",
      points: 0,
      selected: { eliminated: true }
    },
    {
      id: "robinfierce",
      points: 5
    },
    {
      id: "salinaestitties",
      points: 5
    },
    {
      id: "sashacolby",
      points: 10
    },
    {
      id: "spice",
      points: 5
    },
    {
      id: "sugar",
      points: 5
    },
  ]
  ],
  ["020", [
    {
      id: "amethyst",
      points: 5
    },
    {
      id: "anetra",
      points: 5
    },
    {
      id: "auramayari",
      points: 2.5
    },
    {
      id: "jax",
      points: 5
    },
    {
      id: "looseyladuca",
      points: 10
    },
    {
      id: "luxxnoirlondon",
      points: 5
    },
    {
      id: "marciax3",
      points: 7.5
    },
    {
      id: "mbdf",
      points: 5
    },
    {
      id: "mib",
      points: 7.5
    },
    {
      id: "robinfierce",
      points: 5
    },
    {
      id: "salinaestitties",
      points: 5
    },
    {
      id: "sashacolby",
      points: 5
    },
    {
      id: "spice",
      points: 0
    },
    {
      id: "sugar",
      points: 0,
      selected: { eliminated: true }
    },
  ]
  ]
]

// export const weekValues = [["January 6", "006"], ["January 13", "013"], ["January 20", "020"], ["January 27", "027"], ["February 3", "103"], ["February 10", "110"]]


export const weekValues = [["February 17", "117"]]