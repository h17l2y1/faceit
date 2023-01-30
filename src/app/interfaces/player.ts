import {Platforms} from "./platforms";
import {Games} from "./games";
import {Settings} from "./settings";
import {Infractions} from "./infractions";

export interface Player {
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
}
