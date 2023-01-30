import {Regions} from "./regions";

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
