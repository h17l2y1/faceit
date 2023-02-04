export interface MatchStatistic {
  rounds: Round[]
}

export interface Round {
  best_of: string
  competition_id: any
  game_id: string
  game_mode: string
  match_id: string
  match_round: string
  played: string
  round_stats: RoundStats
  teams: Team[]
}

export interface RoundStats {
  Rounds: string
  Map: string
  Score: string
  Winner: string
  Region: string
}

export interface Team {
  team_id: string
  premade: boolean
  team_stats: TeamStats
  players: Player[]
}

export interface TeamStats {
  "Overtime score": string
  "First Half Score": string
  "Second Half Score": string
  "Final Score": string
  Team: string
  "Team Win": string
  "Team Headshots": string
}

export interface Player {
  player_id: string
  nickname: string
  player_stats?: PlayerStats
}

export interface PlayerStats {
  Kills: string
  "Headshots %": string
  "Triple Kills": string
  Headshots: string
  Result: string
  "K/D Ratio": string
  "Quadro Kills": string
  "Penta Kills": string
  Deaths: string
  "K/R Ratio": string
  MVPs: string
  Assists: string
}
