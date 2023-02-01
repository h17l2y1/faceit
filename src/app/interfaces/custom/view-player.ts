export interface PlayerWithStatistic {
  id: string;
  profile: PlayerData
  statistic: ProfileStatistic
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
  friendsIds: string[];
  faceitUrl: string;
}

export interface ProfileStatistic {
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
  maps: CsgoMapWithStatistic[];
  avgKillsForMap: number;
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
