import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../interfaces/player";
import {csgoMaps} from "../constants/maps";
import {MapStatistic} from "../interfaces/custom/map-statistic";

@Component({
  selector: 'map-comparing',
  templateUrl: './map-comparing.component.html',
  styleUrls: ['./map-comparing.component.scss']
})
export class MapComparingComponent implements OnInit {
  @Input() playersLeft!: Player[];
  @Input() playersRight!: Player[];

  public mapStatistics: MapStatistic[] = csgoMaps;

  ngOnInit(): void {
    this.mapStatLeft()
    this.mapStatRight()

    this.mapStatistics.forEach(map => {
      map.leftWinRate = Math.round(map.leftWinRate / 5);
      map.rightWinRate = Math.round(map.rightWinRate / 5);
    })
  }

  public moreOrLess(map: MapStatistic): boolean {
    return map.leftWinRate > map.rightWinRate;
  }

  private mapStatLeft() {
    console.log(this.playersLeft);
    this.playersLeft?.forEach(player => {
      player.statistic?.segments?.forEach(segment => {
        if (segment) {
          const map = this.mapStatistics.find(map => map.label === segment.label);
          const winRate = Number(segment.stats["Win Rate %"]);

          if (map) {
            map.img = segment.img_regular;
            map.leftWinRate += winRate;
          }
        }
      })
    })

  }

  private mapStatRight() {
    console.log(this.playersRight);
    this.playersRight?.forEach(player => {
      player.statistic?.segments?.forEach(segment => {
        if (segment) {
          const map = this.mapStatistics.find(map => map.label === segment.label);
          const winRate = Number(segment.stats["Win Rate %"]);

          if (map) {
            map.rightWinRate += winRate;
          }
        }
      })
    })
  }
}
