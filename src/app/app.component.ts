import {Component} from '@angular/core';
import {FaceitService} from "./services/faceit.service";
import {forkJoin, map, Observable, switchMap, tap} from "rxjs";
import {PlayerStatistic} from "./interfaces/player-statistic";
import {Player} from "./interfaces/player";
import {Match} from "./interfaces/match";
import {FormBuilder, FormControl} from "@angular/forms";

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

  public players1!: Player[]
  public players2!: Player[]

  public matchIdControl: FormControl = this.formBuilder.control(null);

  public matchIdControlChange$: Observable<any> =
    this.matchIdControl.valueChanges.pipe(
      // takeUntil(this.destroyed$),
      tap(() => this.getMatchData(this.matchId))
    );

  // private readonly myId = '9bbfed13-03da-41db-bf3b-b2db0d65ff98'
  private readonly matchId = '1-3bc96dca-2f49-4bb9-b16a-386ff5b9065b'
  private readonly matchId2 = '1-7c936bbb-c270-4459-ae38-f15201c38e0f'

  constructor(private readonly formBuilder: FormBuilder,
    private readonly faceitService: FaceitService) {
    // this.getMatchData(this.matchId);
    this.matchIdControlChange$.subscribe();
  }

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
        this.players1$ = this.getAllPlayers(firstTeamPlayersId).pipe(
          tap((players: Player[]) => this.players1 = players)
        );
        this.players2$ = this.getAllPlayers(secondTeamPlayersId).pipe(
          tap((players: Player[]) => this.players2 = players)
        );
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
