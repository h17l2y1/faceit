import {PlayerGlobalStatistic} from "./player-global-statistic";

export interface PlayerProfile {
  player_id: string
  nickname: string
  avatar: string
  country: string
  cover_image: string
  platforms: Platforms
  games: Games
  settings: Settings
  friends_ids: string[]
  new_steam_id: string
  steam_id_64: string
  steam_nickname: string
  memberships: string[]
  faceit_url: string
  membership_type: string
  cover_featured_image: string
  infractions: Infractions
  statistic: PlayerGlobalStatistic
}

export interface Platforms {
  steam: string
}

export interface Games {
  csgo: Csgo
}

export interface Csgo {
  region: string
  game_player_id: string
  skill_level: number
  faceit_elo: number
  game_player_name: string
  skill_level_label: string
  regions: Regions
  game_profile_id: string
}

export interface Regions {}

export interface Settings {
  language: string
}

export interface Infractions {}
