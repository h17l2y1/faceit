import {Component, OnDestroy} from '@angular/core';
import {FaceitService} from "./services/faceit.service";
import {forkJoin, map, mergeMap, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";
import {PlayerGlobalStatistic} from "./interfaces/player-global-statistic";
import {PlayerProfile} from "./interfaces/player-profile";
import {FormBuilder, FormControl} from "@angular/forms";
import {matchId1} from "./constants/for-development";
import {MapperService} from "./services/mapper.service";
import {PlayerWithStatistic, PlayerWithStatistic2} from "./interfaces/custom/view-player";
import {Match, Roster} from "./interfaces/match";
import {Item, PlayerHistory} from "./interfaces/player-history";
import {MatchStatistic, Round} from "./interfaces/match-statistic";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'faceit';

  private destroyed$: Subject<void> = new Subject<void>();

  public playerStatistic!: PlayerGlobalStatistic;

  public playersLeft$!: Observable<PlayerWithStatistic[]>
  public playersRight$!: Observable<PlayerWithStatistic[]>

  public any$!: Observable<any[]>

  public matchIdControl: FormControl = this.formBuilder.control(null);

  public matchIdControlChange$: Observable<any> =
    this.matchIdControl.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap((faceitLink: string) => {
        const id = faceitLink.replace('https://www.faceit.com/en/csgo/room/', '').replace('/scoreboard', '');
        this.getMatchData2(id);
      })
    );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly mapperService: MapperService,
    private readonly faceitService: FaceitService) {
    this.matchIdControlChange$.subscribe();

    this.getMatchData2(matchId1);

    // this.getPlayersWithStatistic2();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getLastFive(playerStatistic: PlayerGlobalStatistic): string[] {
    return playerStatistic.lifetime["Recent Results"]
      .map(item => {
        return item === '1' ? 'W' : 'L'
      });
  }

  // public getMatchData(id: string): void {
  //   this.faceitService.getMatch(id).pipe(
  //     tap((response: Match) => {
  //       const firstTeamPlayersId: string[] = response.teams.faction1.roster.map(player => player.player_id);
  //       const secondTeamPlayersId: string[] = response.teams.faction2.roster.map(player => player.player_id);
  //       this.playersLeft$ = this.getPlayersWithStatistic(firstTeamPlayersId);
  //       this.playersRight$ = this.getPlayersWithStatistic(secondTeamPlayersId);
  //     })
  //   ).subscribe();
  // }
  //
  // public getPlayersWithStatistic(ids: string[]): Observable<PlayerWithStatistic[]> {
  //   return forkJoin(ids.map(id => this.faceitService.getProfile(id).pipe(
  //     switchMap((player: PlayerProfile) => {
  //       return this.faceitService.getPlayerGlobalStatistic(player.player_id).pipe(
  //         map((statistic: PlayerGlobalStatistic) => {
  //           return this.mapperService.mapPlayerData(player, statistic);
  //         })
  //       );
  //     })
  //   )))
  // }


  public getMatchData2(id: string): void {
    this.faceitService.getMatch(id).pipe(
      tap((response: Match) => {
        const firstTeamPlayersId: string[] = response.teams.faction1.roster.map(player => player.player_id);
        const secondTeamPlayersId: string[] = response.teams.faction2.roster.map(player => player.player_id);
        this.any$ = this.getPlayersWithStatistic2(secondTeamPlayersId);
        // const zzz = this.getPlayersWithStatistic2(secondTeamPlayersId);
      })
    ).subscribe();
  }

  private getPlayersWithStatistic2(teamIds: string[]): Observable<any[]> {
    return forkJoin(teamIds.map(id => this.faceitService.getPlayerHistory(id)
      .pipe(
        switchMap((playerHistory: PlayerHistory) => {
          const playerProfile: Observable<PlayerProfile> = this.faceitService.getProfile(id);
          const matchStatistics: Observable<Round[]> = this.getMatchStatistics(playerHistory);

          return this.getProfileWithMatchStatistic(playerProfile, matchStatistics);
        })
      )));
  }

  private getMatchStatistics(playerHistory: PlayerHistory): Observable<Round[]> {
    return forkJoin(playerHistory.items.map((item: Item) => this.faceitService.getMatchStatistic(item.match_id).pipe(
      map((matchStatistic: MatchStatistic) => matchStatistic.rounds[0])
    )));
  }

  private getProfileWithMatchStatistic(playerProfile: Observable<PlayerProfile>, matchStatistics: Observable<Round[]>): Observable<any> {
    return forkJoin([playerProfile, matchStatistics]).pipe(
      map(([playerProfile, matchStatistics]) => this.mapperService.mapPlayerData(playerProfile, matchStatistics)
      ))
  }

}
