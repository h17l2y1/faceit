import {Component, OnDestroy} from '@angular/core';
import {FaceitService} from "./services/faceit.service";
import {forkJoin, map, mergeMap, Observable, startWith, Subject, switchMap, takeUntil, tap} from "rxjs";
import {PlayerStatistic} from "./interfaces/player-statistic";
import {Player} from "./interfaces/player";
import {Match} from "./interfaces/match";
import {FormBuilder, FormControl} from "@angular/forms";
import {matchId1, myId} from "./constants/for-development";
import {MapperService} from "./services/mapper.service";
import {PlayerWithStatistic} from "./interfaces/custom/view-player";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'faceit';

  private destroyed$: Subject<void> = new Subject<void>();

  public playerStatistic!: PlayerStatistic;

  public playersLeft$!: Observable<PlayerWithStatistic[]>
  public playersRight$!: Observable<PlayerWithStatistic[]>

  public matchIdControl: FormControl = this.formBuilder.control(null);

  public matchIdControlChange$: Observable<any> =
    this.matchIdControl.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap((faceitLink: string) => {
        const id = faceitLink.replace('https://www.faceit.com/en/csgo/room/', '').replace('/scoreboard', '');
        this.getMatchData(id);
      })
    );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly mapperService: MapperService,
    private readonly faceitService: FaceitService) {
    this.getMatchData(matchId1);
    this.matchIdControlChange$.subscribe();

    this.getPlayersWithStatistic2();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getLastFive(playerStatistic: PlayerStatistic): string[] {
    return playerStatistic.lifetime["Recent Results"]
      .map(item => {
        return item === '1' ? 'W' : 'L'
      });
  }

  public getMatchData(id: string): void {
    // this.faceitService.getMatch(id).pipe(
    //   tap((response: Match) => {
    //     const firstTeamPlayersId: string[] = response.teams.faction1.roster.map(player => player.player_id);
    //     const secondTeamPlayersId: string[] = response.teams.faction2.roster.map(player => player.player_id);
    //     this.playersLeft$ = this.getPlayersWithStatistic(firstTeamPlayersId);
    //     this.playersRight$ = this.getPlayersWithStatistic(secondTeamPlayersId);
    //   })
    // ).subscribe();
  }

  public getPlayersWithStatistic(ids: string[]): Observable<PlayerWithStatistic[]> {
    return forkJoin(ids.map(id => this.faceitService.getPlayer(id).pipe(
      switchMap((player: Player) => {
        return this.faceitService.getPlayerStatistic(player.player_id).pipe(
          map((statistic: PlayerStatistic) => {
            return this.mapperService.mapPlayerData(player, statistic);
          })
        );
      })
    )))
  }



  public getPlayersWithStatistic2(ids?: string[]) {

    this.faceitService.getLast20Matches(myId).subscribe(res => {
      console.log(res);
    });

    // this.faceitService.getMatch(matchId1).pipe(
    //   switchMap(match => match.teams.faction1.roster),
    //   mergeMap(roster => {
    //
    //     const player = this.faceitService.getPlayer(roster.player_id)
    //     const globalStatistic = this.faceitService.getPlayerStatistic(roster.player_id)
    //     const last20 = this.faceitService.getLast20Matches(roster.player_id)
    //
    //     return forkJoin([player, globalStatistic, last20]).pipe(
    //       map(([player, globalStatistic, last20]) => {
    //         return  {
    //           globalStatistic: globalStatistic,
    //           last20Matches: last20,
    //           profile: player, id: roster.player_id
    //         }
    //       })
    //     )
    //   })
    // ).subscribe(x => console.log(x))

  }


}
