import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {Player} from "../interfaces/player";
import {PlayerStatistic} from "../interfaces/player-statistic";

@Component({
  selector: 'team-component',
  templateUrl: './team-component.component.html',
  styleUrls: ['./team-component.component.scss']
})
export class TeamComponentComponent {
  @Input() players$!: Observable<Player[]>;

  public getLastFive(playerStatistic: PlayerStatistic): string[] {
    return playerStatistic.lifetime["Recent Results"]
      .map(item => {
        return item === '1' ? 'W' : 'L'
      });
  }

}
