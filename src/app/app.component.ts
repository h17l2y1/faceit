import {Component} from '@angular/core';
import {FaceitService} from "./services/faceit.service";
import {forkJoin, map, Observable, switchMap, tap} from "rxjs";
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

  public playerStatistic!: PlayerStatistic;
  public players1$!: Observable<Player[]>
  public players2$!: Observable<Player[]>

  // private readonly myId = '9bbfed13-03da-41db-bf3b-b2db0d65ff98'
  private readonly matchId = '1-9b3063be-c126-47bf-a397-23cdfcebf134'

  constructor(private readonly faceitService: FaceitService) {
    // this.getPlayerData();
    this.getMatchData(this.matchId);
  }

  // public getPlayerData(): void {
  //   const player: Observable<Player> = this.faceitService.getPlayer(this.myId);
  //   const playerStatistic = this.faceitService.getPlayerStatistic(this.myId);
  //
  //   forkJoin([player, playerStatistic]).pipe(
  //     map(([playerResponse, playerStatisticResponse]) => {
  //       this.player1 = playerResponse
  //       this.playerStatistic = playerStatisticResponse
  //     })
  //   ).subscribe()
  // }

  public getLastFive(playerStatistic: PlayerStatistic): string[] {
    return playerStatistic.lifetime["Recent Results"]
      .map(item => {
        return item === '1' ? 'W' : 'L'
      });
  }

  public getMatchData(id: string): void {
    this.faceitService.getMatch(id).pipe(
      tap((response: Match) => {
        const firstTeamPlayersId: string[] = response.teams.faction1.roster.map(player => player.player_id);
        const secondTeamPlayersId: string[] = response.teams.faction2.roster.map(player => player.player_id);
        this.players1$ = this.getAllPlayers(firstTeamPlayersId);
        this.players2$ = this.getAllPlayers(secondTeamPlayersId);
      })
    ).subscribe();
  }

  public getAllPlayers(ids: string[]): Observable<Player[]> {
    return forkJoin(ids.map(id => this.faceitService.getPlayer(id).pipe(
      switchMap(player => {
        return this.faceitService.getPlayerStatistic(player.player_id).pipe(
          map((statistic: PlayerStatistic) => {
            player.statistic = statistic;
            return player;
          })
        );
      })
    )))
  }

}
