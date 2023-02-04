export interface PlayerGlobalStatistic {
  player_id: string
  game_id: string
  lifetime: Lifetime
  segments: Segment[]
}

export interface Lifetime {
  Matches: string
  "Average K/D Ratio": string
  "Recent Results": string[]
  "Win Rate %": string
  Wins: string
  "K/D Ratio": string
  "Average Headshots %": string
  "Total Headshots %": string
  "Current Win Streak": string
  "Longest Win Streak": string
}

export interface Segment {
  type: string
  mode: string
  label: string
  img_small: string
  img_regular: string
  stats: Stats
}

export interface Stats {
  "Quadro Kills": string
  Deaths: string
  "Average Deaths": string
  "Average Headshots %": string
  Matches: string
  MVPs: string
  "Average Assists": string
  "Headshots per Match": string
  "Triple Kills": string
  "Average Kills": string
  "Average Triple Kills": string
  "K/R Ratio": string
  Wins: string
  "K/D Ratio": string
  Rounds: string
  "Average K/R Ratio": string
  "Average Quadro Kills": string
  Assists: string
  "Total Headshots %": string
  Kills: string
  Headshots: string
  "Average Penta Kills": string
  "Win Rate %": string
  "Penta Kills": string
  "Average K/D Ratio": string
  "Average MVPs": string
}
