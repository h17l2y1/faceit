import {Injectable} from '@angular/core';
import {
  GlobalStatistic2,
  LastMatch,
  MapStatistic2, PlayerData,
  PlayerStatistic2,
  PlayerWithStatistic
} from "../interfaces/custom/view-player";
import {PlayerProfile} from "../interfaces/player-profile";
import {PlayerGlobalStatistic} from "../interfaces/player-global-statistic";
import {PlayerStats, Round} from "../interfaces/match-statistic";

@Injectable()
export class MapperService {

  public mapPlayerData(player: PlayerProfile, globalStatistic: PlayerGlobalStatistic, matches: Round[]): PlayerWithStatistic {
    const playerWithStatistic: PlayerWithStatistic = {
      profile: this.mapProfileData(player),
      lastStatistic: this.mapMatchesStatistic(player.player_id, matches),
      globalStatistic: this.mapGlobalStatistic(globalStatistic),
    }

    return playerWithStatistic;
  }

  private mapProfileData(player: PlayerProfile): PlayerData {
    return {
      id: player.player_id,
      nickname: player.nickname,
      avatar: player.avatar,
      country: player.country,
      steam: player.platforms.steam,
      level: player.games.csgo.skill_level,
      elo: player.games.csgo.faceit_elo,
      steamNick: player.games.csgo.game_player_name,
      language: player.settings.language,
      // friendsIds: player.friends_ids,
      faceitUrl: player.faceit_url,
    }
  }

  private mapMatchesStatistic(playerId: string, matches: Round[]): MapStatistic2 {
    const mapStatistic2: MapStatistic2 = {
      matchesHistory: [],
      winRate: 0,
      assists: 0,
      deaths: 0,
      headshots: 0,
      headshotsPercent: 0,
      kDRatio: 0,
      kRRatio: 0,
      kills: 0,
      mVPs: 0,
      pentaKills: 0,
      quadroKills: 0,
      winRatePercent: 0,
      tripleKills: 0
    };
    const matchesLength = matches.length;

    matches.forEach(match => {
      const lastMatch: LastMatch = {
        isWin: undefined,
        mapLabel: match.round_stats.Map,
        mapScore: match.round_stats.Score,
        playerScore: undefined
      }

      match.teams.forEach(team => {
        const playerStats: PlayerStats | undefined = team.players.find(p => p.player_id === playerId)?.player_stats;
        if (!playerStats) return;

        const playerScore: PlayerStatistic2 = {
          assists: Number(playerStats.Assists),
          deaths: Number(playerStats.Deaths),
          headshots: Number(playerStats.Headshots),
          headshotsPercent: Number(playerStats["Headshots %"]),
          kDRatio: Number(playerStats["K/D Ratio"]),
          kRRatio: Number(playerStats["K/R Ratio"]),
          kills: Number(playerStats.Kills),
          mVPs: Number(playerStats.MVPs),
          pentaKills: Number(playerStats["Penta Kills"]),
          quadroKills: Number(playerStats["Quadro Kills"]),
          result: Number(playerStats.Result),
          tripleKills: Number(playerStats["Triple Kills"]),
        }

        lastMatch.playerScore = {...playerScore};
        lastMatch.isWin = Boolean(playerScore.result).valueOf();

        mapStatistic2.matchesHistory.push(lastMatch);

        mapStatistic2.kRRatio += playerScore.kRRatio;
        mapStatistic2.kDRatio += playerScore.kDRatio;
        mapStatistic2.assists += playerScore.assists;
        mapStatistic2.pentaKills += playerScore.pentaKills;
        mapStatistic2.headshotsPercent += playerScore.headshotsPercent;
        mapStatistic2.tripleKills += playerScore.tripleKills;
        mapStatistic2.quadroKills += playerScore.quadroKills;
        mapStatistic2.deaths += playerScore.deaths;
        mapStatistic2.winRatePercent += playerScore.result;
        mapStatistic2.kills += playerScore.kills;
        mapStatistic2.mVPs += playerScore.mVPs;
        mapStatistic2.headshots += playerScore.headshots;
      })
    })

    mapStatistic2.kRRatio = Number((mapStatistic2.kRRatio / matchesLength).toFixed(2));
    mapStatistic2.kDRatio = Number((mapStatistic2.kDRatio / matchesLength).toFixed(2));
    mapStatistic2.assists = Math.round(mapStatistic2.assists / matchesLength);
    mapStatistic2.pentaKills = Math.round(mapStatistic2.pentaKills / matchesLength);
    mapStatistic2.headshotsPercent = Math.round(mapStatistic2.headshotsPercent / matchesLength);
    mapStatistic2.tripleKills = Math.round(mapStatistic2.tripleKills / matchesLength);
    mapStatistic2.quadroKills = Math.round(mapStatistic2.quadroKills / matchesLength);
    mapStatistic2.deaths = Math.round(mapStatistic2.deaths / matchesLength);
    mapStatistic2.winRatePercent = Math.round((mapStatistic2.winRatePercent / matchesLength)*100);
    mapStatistic2.kills = Math.round(mapStatistic2.kills / matchesLength);
    mapStatistic2.mVPs = Math.round(mapStatistic2.mVPs / matchesLength);
    mapStatistic2.headshots = Math.round(mapStatistic2.headshots / matchesLength);

    return mapStatistic2;
  }

  private mapGlobalStatistic(globalStatistic: PlayerGlobalStatistic): GlobalStatistic2 {
    return {
      winRatePercent : globalStatistic.lifetime["Win Rate %"],
      longestWinStreak: globalStatistic.lifetime["Longest Win Streak"],
      wins: globalStatistic.lifetime.Wins,
      averageKDRatio: globalStatistic.lifetime["Average K/D Ratio"],
      recentResults: globalStatistic.lifetime["Recent Results"],
      matches: globalStatistic.lifetime.Matches,
      averageHeadshotsPercent: globalStatistic.lifetime["Average Headshots %"],
      currentWinStreak: globalStatistic.lifetime["Current Win Streak"],
      kDRatio: globalStatistic.lifetime["K/D Ratio"],
      totalHeadshotsPercent: globalStatistic.lifetime["Total Headshots %"]
    };
  }
}


