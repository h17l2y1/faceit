import {Component} from '@angular/core';
import {FaceitService} from "./services/faceit.service";
import {forkJoin, map, Observable, tap} from "rxjs";
import {PlayerStatistic} from "./interfaces/player-statistic";
import {Player} from "./interfaces/player";
import {Match} from "./interfaces/match";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'faceit';

  public player1!: Player;
  public playerStatistic!: PlayerStatistic;
  public players$!: Observable<Player[]>

  private readonly myId = '9bbfed13-03da-41db-bf3b-b2db0d65ff98'
  private readonly matchId = '1-9b3063be-c126-47bf-a397-23cdfcebf134'

  constructor(private readonly faceitService: FaceitService) {
    this.getPlayerData();
    this.getMatchData();
  }

  public getPlayerData(): void {
    const player: Observable<Player> = this.faceitService.getPlayerData(this.myId);
    const playerStatistic = this.faceitService.getStatsCsgo(this.myId);

    forkJoin([player, playerStatistic]).pipe(
      map(([playerResponse, playerStatisticResponse]) => {
        this.player1 = playerResponse
        this.playerStatistic = playerStatisticResponse
      })
    ).subscribe()

  }

  public getLastFive(): string[] {
    return this.playerStatistic.lifetime["Recent Results"]
      .map(item => {
        return item === '1' ? 'W' : 'L'
      });
  }

  public getMatchData(): void {
    this.faceitService.getMatchData(this.matchId).pipe(
      tap((response: Match) => {
        const firstTeamPlayersId: string[] = response.teams.faction1.roster.map(player => player.player_id);
        const secondTeamPlayersId: string[] = response.teams.faction2.roster.map(player => player.player_id);
        const allIds = firstTeamPlayersId.concat(secondTeamPlayersId);
        this.getAllPlayers(allIds);
      })
    ).subscribe();
  }

  public getAllPlayers(ids: string[]): Player[] {
    this.players$ = forkJoin(ids.map(id => this.faceitService.getPlayerData(id))).pipe(
      tap(response => console.log(response))
    );

    return [];
  }

}
