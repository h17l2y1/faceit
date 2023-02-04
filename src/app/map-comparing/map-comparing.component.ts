import {Component, Input} from '@angular/core';
import {Observable, tap} from "rxjs";
import {CsgoMapWithStatistic, PlayerWithStatistic} from "../interfaces/custom/view-player";
import {ComparedMap} from "../interfaces/custom/compared-map";
import {csgoDefaultMapList} from "../constants/maps";

@Component({
  selector: 'map-comparing',
  templateUrl: './map-comparing.component.html',
  styleUrls: ['./map-comparing.component.scss']
})


export class MapComparingComponent {
  @Input() set playersLeft(players$: Observable<PlayerWithStatistic[]>) {
    if (players$) this.mapStatLeft(players$);
  }

  @Input() set playersRight(players$: Observable<PlayerWithStatistic[]>) {
    if (players$) this.mapStatRight(players$);
  }

  public comparedMaps: ComparedMap[] = csgoDefaultMapList.map(csgoMap => ({...csgoMap, leftWinRate: 0, rightWinRate: 0}));


  private mapStatLeft(players: Observable<PlayerWithStatistic[]>) {
    players.pipe(
      tap((players: PlayerWithStatistic[]) => {
        players.forEach(player => {

          // player.globalStatistic.maps.forEach((csgoMap: CsgoMapWithStatistic) => {
          //   const comparedMap = this.comparedMaps.find(item => item.label === csgoMap.label);
          //   if (!comparedMap) return;
          //
          //   const winRate = Number(csgoMap.mapStatistic.winRatePercent);
          //   comparedMap.leftWinRate += winRate;
          //
          // })
        })

        this.comparedMaps.forEach(map => {
          map.leftWinRate = Math.round(map.leftWinRate / 5);
        })
      })
    ).subscribe()
  }

  private mapStatRight(players: Observable<PlayerWithStatistic[]>) {
    players.pipe(
      tap((players: PlayerWithStatistic[]) => {
        players.forEach(player => {

          // player.globalStatistic.maps.forEach((csgoMap: CsgoMapWithStatistic) => {
          //   const comparedMap = this.comparedMaps.find(item => item.label === csgoMap.label);
          //   if (!comparedMap) return;
          //
          //   const winRate = Number(csgoMap.mapStatistic.winRatePercent);
          //   comparedMap.rightWinRate += winRate;
          //
          // })
        })

        this.comparedMaps.forEach(map => {
          map.rightWinRate = Math.round(map.leftWinRate / 5);
        })
      })
    ).subscribe()
  }
}
