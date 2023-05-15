import styles from "../styles/PointBar.module.css"


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

export const currentSeason = "AS-8"


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
    multiplier: 1.25
  },
  winnerOptions: {
    category: "winner",
    label: "Choose 1 Winner",
    max: 1,
    multiplier: 1.5
  }
}

export const queenData = {
  alexismichelle: {
    name: "Alexis Michelle",
    active: true,
    stans: []
  },
  dariennelake: {
    name: "Darienne Lake",
    active: true,
    stans: []
  },
  heidincloset: {
    name: "Heidi N Closet",
    active: true,
    stans: []
  },
  jaymesmansfield: {
    name: "Jaymes Mansfield",
    active: true,
    stans: []
  },
  jessicawild: {
    name: "Jessica Wild",
    active: true,
    stans: []
  },
  jimbo: {
    name: "Jimbo",
    active: true,
    stans: []
  },
  kahannamontrese: {
    name: "Kahanna Montrese",
    active: true,
    stans: []
  },
  kandymuse: {
    name: "Kandy Muse",
    active: true,
    stans: []
  },
  lalari: {
    name: "LaLa Ri",
    active: true,
    stans: []
  },
  monicabeverlyhillz: {
    name: "Monica Beverly Hillz",
    active: true,
    stans: []
  },
  mrskashadavis: {
    name: "Mrs. Kasha Davis",
    active: true,
    stans: []
  },
  nayshalopez: {
    name: "Naysha Lopez",
    active: true,
    stans: []
  }
}

export const players = [
  {
    username: "carson",
    name: "Carson",
    houseName: "Big Juicy Ass",
    queens: [["nayshalopez", 1.5], ["mrskashadavis", 1.25], ["monicabeverlyhillz", 1.25], ["lalari", 1], ["kandymuse", 1], ["alexismichelle", 1]]
  },
  {
    username: "eric",
    name: "Eric",
    houseName: "Spagliato",
    queens: [["kandymuse", 1.5], ["monicabeverlyhillz", 1.25], ["jaymesmansfield", 1.25], ["alexismichelle", 1], ["jimbo", 1], ["lalari", 1]]
  },
  {
    username: "jack",
    name: "Jack",
    houseName: "The House Down",
    queens: [["jimbo", 1.5], ["dariennelake", 1.25], ["jessicawild", 1.25], ["heidincloset", 1], ["lalari", 1], ["kahannamontrese", 1]]
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

// export const queenPoints = {
//   amethyst: 0,
//   anetra: 0,
//   auramayari: 0,
//   irenedubois: 0,
//   jax: 0,
//   looseyladuca: 0,
//   luxxnoirlondon: 0,
//   mbdf: 0,
//   marciax3: 0,
//   mib: 0,
//   princesspoppy: 0,
//   robinfierce: 0
// }

export const initialCategories = {
  winner: false,
  mini: false,
  top: false,
  low: false,
  bottom: false,
  eliminated: false
}

// export const episodeDates = {
// week1: "412",
// week2: "013",
// week3: "020",
// week4: "027",
// week5: "103",
// week6: "110",
// week7: "117",
// week8: "124",
// week9: "203",
// week10: "210",
// week11: "217",
// week12: "224",
// week13: "231",
// week14: "307",
// week15: "314"
// }

export const episodeDates = ["412"]

// export const months = ["January", "February", "March"]

// export const previousWeeksPoints = [
//   ["006", [
//     {
//       id: "amethyst",
//       points: 0
//     },
//     {
//       id: "anetra",
//       points: 10
//     },
//     {
//       id: "auramayari",
//       points: 5
//     },
//     {
//       id: "irenedubois",
//       points: 2,
//       selected: { eliminated: true }
//     },
//     {
//       id: "jax",
//       points: 7.5
//     },
//     {
//       id: "looseyladuca",
//       points: 4.5
//     },
//     {
//       id: "luxxnoirlondon",
//       points: 5
//     },
//     {
//       id: "marciax3",
//       points: 7.5
//     },
//     {
//       id: "mbdf",
//       points: 5
//     },
//     {
//       id: "mib",
//       points: 5
//     },
//     {
//       id: "princesspoppy",
//       points: 5
//     },
//     {
//       id: "robinfierce",
//       points: 5
//     },
//     {
//       id: "salinaestitties",
//       points: 5
//     },
//     {
//       id: "sashacolby",
//       points: 5
//     },
//     {
//       id: "spice",
//       points: 5
//     },
//     {
//       id: "sugar",
//       points: 5
//     },
//   ]
//   ],
//   ["013", [
//     {
//       id: "amethyst",
//       points: 0
//     },
//     {
//       id: "anetra",
//       points: 5
//     },
//     {
//       id: "auramayari",
//       points: 5
//     },
//     {
//       id: "jax",
//       points: 2.5
//     },
//     {
//       id: "looseyladuca",
//       points: 7.5
//     },
//     {
//       id: "luxxnoirlondon",
//       points: 7.5
//     },
//     {
//       id: "marciax3",
//       points: 5
//     },
//     {
//       id: "mbdf",
//       points: 5
//     },
//     {
//       id: "mib",
//       points: 5
//     },
//     {
//       id: "princesspoppy",
//       points: 0,
//       selected: { eliminated: true }
//     },
//     {
//       id: "robinfierce",
//       points: 5
//     },
//     {
//       id: "salinaestitties",
//       points: 5
//     },
//     {
//       id: "sashacolby",
//       points: 10
//     },
//     {
//       id: "spice",
//       points: 5
//     },
//     {
//       id: "sugar",
//       points: 5
//     },
//   ]
//   ],
//   ["020", [
//     {
//       id: "amethyst",
//       points: 5
//     },
//     {
//       id: "anetra",
//       points: 5
//     },
//     {
//       id: "auramayari",
//       points: 2.5
//     },
//     {
//       id: "jax",
//       points: 5
//     },
//     {
//       id: "looseyladuca",
//       points: 10
//     },
//     {
//       id: "luxxnoirlondon",
//       points: 5
//     },
//     {
//       id: "marciax3",
//       points: 7.5
//     },
//     {
//       id: "mbdf",
//       points: 5
//     },
//     {
//       id: "mib",
//       points: 7.5
//     },
//     {
//       id: "robinfierce",
//       points: 5
//     },
//     {
//       id: "salinaestitties",
//       points: 5
//     },
//     {
//       id: "sashacolby",
//       points: 5
//     },
//     {
//       id: "spice",
//       points: 0
//     },
//     {
//       id: "sugar",
//       points: 0,
//       selected: { eliminated: true }
//     },
//   ]
//   ]
// ]

// export const weekValues = [["January 6", "006"], ["January 13", "013"], ["January 20", "020"], ["January 27", "027"], ["February 3", "103"], ["February 10", "110"]]


export const weekValues = [["May 12", "412"]]