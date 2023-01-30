import {Stats} from "./stats";

export interface Segment {
  type: string
  mode: string
  label: string
  img_small: string
  img_regular: string
  stats: Stats
}
