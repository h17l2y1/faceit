import {Injectable} from '@angular/core';
import {CsgoMapWithStatistic, MapStatistic, PlayerWithStatistic} from "../interfaces/custom/view-player";
import {Player} from "../interfaces/player";
import {PlayerStatistic} from "../interfaces/player-statistic";
import {Segment} from "../interfaces/segment";
import {csgoDefaultMapList} from "../constants/maps";

@Injectable()
export class MapperService {

  public mapPlayerData(player: Player, statistic: PlayerStatistic): PlayerWithStatistic {
    const addition = this.getMapStatistic(statistic)

    const playerWithStatistic: PlayerWithStatistic = {
      id: player.player_id,
      profile: {
        id: player.player_id,
        nickname: player.nickname,
        avatar: player.avatar,
        country: player.country,
        steam: player.platforms.steam,
        level: player.games.csgo.skill_level,
        elo: player.games.csgo.faceit_elo,
        steamNick: player.games.csgo.game_player_name,
        language: player.settings.language,
        friendsIds: player.friends_ids,
        faceitUrl: player.faceit_url,
      },
      globalStatistic: {
        winRatePercent: statistic.lifetime["Win Rate %"],
        longestWinStreak: statistic.lifetime["Longest Win Streak"],
        wins: statistic.lifetime.Wins,
        averageKDRatio: statistic.lifetime["Average K/D Ratio"],
        recentResults: statistic.lifetime["Recent Results"],
        matches: statistic.lifetime.Matches,
        averageHeadshotsPercent: statistic.lifetime["Average Headshots %"],
        currentWinStreak: statistic.lifetime["Current Win Streak"],
        kDRatio: statistic.lifetime["K/D Ratio"],
        totalHeadshotsPercent: statistic.lifetime["Total Headshots %"],
        maps: addition.csgoMaps,
        avgKillsForMap: addition.avgKills,
      }
    }

    return playerWithStatistic;
  }

  private getMapStatistic(playerStatistic: PlayerStatistic): { csgoMaps: CsgoMapWithStatistic[], avgKills: number} {
    const csgoMaps: CsgoMapWithStatistic[] = [];
    let mapsCount = 0;
    let avgKills = 0;

    csgoDefaultMapList.forEach(csgoMap => {
      const segment: Segment | undefined = playerStatistic.segments.find(map => map.label === csgoMap.label);
      let statistic = {} as MapStatistic;

      if (segment){
        mapsCount++;
        statistic = this.mapMapStatistic(segment);
        avgKills += Number(statistic.averageKills);
      }

      const csMap: CsgoMapWithStatistic = {
        label: csgoMap.label,
        name: csgoMap.name,
        img: csgoMap.img,
        mapStatistic: statistic,
      }

      csgoMaps.push(csMap);
    })

    return {
      csgoMaps: csgoMaps,
      avgKills: Math.round(avgKills / mapsCount)
    };
  }

  private mapMapStatistic(segment: Segment): MapStatistic {
    return {
      assists: segment.stats.Assists,
      averageAssists: segment.stats["Average Assists"],
      averageDeaths: segment.stats["Average Deaths"],
      averageHeadshotsPercent: segment.stats["Average Headshots %"],
      averageKDRatio: segment.stats["Average K/D Ratio"],
      averageKRRatio: segment.stats["Average K/R Ratio"],
      averageKills: segment.stats["Average Kills"],
      averageMVPs: segment.stats["Average MVPs"],
      averagePentaKills: segment.stats["Average Penta Kills"],
      averageQuadroKills: segment.stats["Average Quadro Kills"],
      averageTripleKills: segment.stats["Triple Kills"],
      deaths: segment.stats.Deaths,
      headshots: segment.stats.Headshots,
      headshotsPerMatch: segment.stats["Headshots per Match"],
      kDRatio: segment.stats["K/D Ratio"],
      kRRatio: segment.stats["K/R Ratio"],
      kills: segment.stats.Kills,
      mVPs: segment.stats.MVPs,
      matches: segment.stats.Matches,
      pentaKills: segment.stats["Penta Kills"],
      quadroKills: segment.stats["Quadro Kills"],
      rounds: segment.stats.Rounds,
      totalHeadshots: segment.stats["Total Headshots %"],
      tripleKills: segment.stats["Triple Kills"],
      winRatePercent: segment.stats["Win Rate %"],
      wins: segment.stats.Wins
    };
  }
}
