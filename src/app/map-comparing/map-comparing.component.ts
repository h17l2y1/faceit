import {Component, Input} from '@angular/core';
import {Player} from "../interfaces/player";
import {csgoMaps} from "../constants/maps";
import {MapStatistic} from "../interfaces/custom/map-statistic";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'map-comparing',
  templateUrl: './map-comparing.component.html',
  styleUrls: ['./map-comparing.component.scss']
})
export class MapComparingComponent {
  @Input() set playersLeft(players$: Observable<Player[]>) {
    if (players$) this.mapStatLeft(players$);
  }

  @Input() set playersRight(players$: Observable<Player[]>) {
    if (players$) this.mapStatRight(players$);
  }

  public mapStatistics: MapStatistic[] = csgoMaps;

  private mapStatLeft(players: Observable<Player[]>) {
    players.pipe(
      tap((players: Player[]) => {
        players.forEach(player => {
          player.statistic?.segments.forEach(segment => {
            const map = this.mapStatistics.find(map => map.label === segment.label);
            if (!map) return

            const winRate = Number(segment.stats["Win Rate %"]);
            map.img = segment.img_regular;
            map.leftWinRate += winRate;

          })
        })
        this.mapStatistics.forEach(map => {
          map.leftWinRate = Math.round(map.leftWinRate / 5);
        })
      })
    ).subscribe()
  }

  private mapStatRight(players: Observable<Player[]>) {
    players.pipe(
      tap((players: Player[]) => {
        players.forEach(player => {
          player.statistic?.segments.forEach(segment => {
            const map = this.mapStatistics.find(map => map.label === segment.label);
            if (!map) return

            const winRate = Number(segment.stats["Win Rate %"]);
            map.img = segment.img_regular;
            map.rightWinRate += winRate;

          })
        })
        this.mapStatistics.forEach(map => {
          map.rightWinRate = Math.round(map.rightWinRate / 5);
        })
      })
    ).subscribe()
  }
}
