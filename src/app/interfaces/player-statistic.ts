import {Lifetime} from "./lifetime";
import {Segment} from "./segment";

export interface PlayerStatistic {
  player_id: string
  game_id: string
  lifetime: Lifetime
  segments: Segment[]
}
