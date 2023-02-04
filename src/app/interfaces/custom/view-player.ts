import {Round} from "../match-statistic";
import {PlayerProfile} from "../player-profile";

export interface PlayerWithStatistic2 {
  matchesStatistics: Round[]
  playerProfile: PlayerProfile
}

export interface PlayerWithStatistic {
  profile: PlayerData;
  globalStatistic: GlobalStatistic2;
  lastStatistic: MapStatistic2;
}

export interface PlayerData {
  id: string;
  nickname : string;
  avatar: string;
  country: string;
  steam: string;
  level: number;
  elo: number;
  steamNick: string;
  language: string;
  // friendsIds: string[];
  faceitUrl: string;
}

export interface GlobalStatistic2 {
  winRatePercent : string;
  longestWinStreak: string;
  wins: string;
  averageKDRatio: string;
  recentResults: string[];
  matches: string;
  averageHeadshotsPercent: string;
  currentWinStreak: string;
  kDRatio: string;
  totalHeadshotsPercent: string;
}

export interface CsgoMapWithStatistic {
  label : string;
  name: string;
  img: string;
  mapStatistic: MapStatistic;
}

export interface MapStatistic {
  headshotsPerMatch: string;
  averageTripleKills: string;
  assists: string;
  rounds: string;
  averageKRRatio: string;
  averageDeaths: string;
  tripleKills: string;
  quadroKills: string;
  deaths: string;
  matches: string;
  averageQuadroKills: string;
  kDRatio: string;
  averageAssists: string;
  averageKills: string;
  averageMVPs: string;
  kRRatio: string;
  wins: string;
  averagePentaKills: string;
  headshots: string;
  pentaKills: string;
  winRatePercent: string;
  averageHeadshotsPercent: string;
  totalHeadshots: string;
  kills: string;
  mVPs: string;
  averageKDRatio: string;
}

export interface MapStatistic2 {
  kRRatio: number;
  kDRatio: number;
  assists: number;
  pentaKills: number;
  headshotsPercent: number;
  tripleKills: number;
  quadroKills: number;
  deaths: number;
  winRatePercent: number;
  kills: number;
  mVPs: number;
  headshots: number;
  winRate: number;
  matchesHistory: LastMatch[];
}

export interface LastMatch {
  mapLabel: string;
  isWin?: boolean;
  mapScore: string;
  playerScore?: PlayerStatistic2;
}

export interface PlayerStatistic2 {
  kRRatio: number;
  kDRatio: number;
  assists: number;
  pentaKills: number;
  headshotsPercent: number;
  tripleKills: number;
  quadroKills: number;
  deaths: number;
  result: number;
  kills: number;
  mVPs: number;
  headshots: number;
}
