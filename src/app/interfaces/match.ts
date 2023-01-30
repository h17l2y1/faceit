export interface Match {
  match_id: string
  version: number
  game: string
  region: string
  competition_id: string
  competition_type: string
  competition_name: string
  organizer_id: string
  teams: Teams
  voting: Voting
  calculate_elo: boolean
  configured_at: number
  started_at: number
  finished_at: number
  demo_url: string[]
  chat_room_id: string
  best_of: number
  results: Results
  status: string
  faceit_url: string
}

export interface Teams {
  faction1: Faction1
  faction2: Faction2
}

export interface Faction1 {
  faction_id: string
  leader: string
  avatar: string
  roster: Roster[]
  substituted: boolean
  name: string
  type: string
}

export interface Roster {
  player_id: string
  nickname: string
  avatar: string
  membership: string
  game_player_id: string
  game_player_name: string
  game_skill_level: number
  anticheat_required: boolean
}

export interface Faction2 {
  faction_id: string
  leader: string
  avatar: string
  roster: Roster2[]
  substituted: boolean
  name: string
  type: string
}

export interface Roster2 {
  player_id: string
  nickname: string
  avatar: string
  membership: string
  game_player_id: string
  game_player_name: string
  game_skill_level: number
  anticheat_required: boolean
}

export interface Voting {
  voted_entity_types: string[]
  location: Location
  map: Map
}

export interface Location {
  entities: Entity[]
  pick: string[]
}

export interface Entity {
  name: string
  class_name: string
  game_location_id: string
  guid: string
  image_lg: string
  image_sm: string
}

export interface Map {
  entities: Entity2[]
  pick: string[]
}

export interface Entity2 {
  guid: string
  image_lg: string
  image_sm: string
  name: string
  class_name: string
  game_map_id: string
}

export interface Results {
  winner: string
  score: Score
}

export interface Score {
  faction1: number
  faction2: number
}
