import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {PlayerWithStatistic, GlobalStatistic} from "../interfaces/custom/view-player";

@Component({
  selector: 'team-component',
  templateUrl: './team-component.component.html',
  styleUrls: ['./team-component.component.scss']
})
export class TeamComponentComponent {
  @Input() set players$(players: Observable<PlayerWithStatistic[]>) {
    if (players){
      this.allPlayers$ = players
    }
  }

  public allPlayers$!: Observable<PlayerWithStatistic[]>;


  public getLastFive(statistic: GlobalStatistic): string[] {
    return statistic.recentResults.map(item => item === '1' ? 'W' : 'L');
  }

}
