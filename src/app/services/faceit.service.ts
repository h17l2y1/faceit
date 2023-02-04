import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlayerProfile} from "../interfaces/player-profile";
import {PlayerGlobalStatistic} from "../interfaces/player-global-statistic";
import {MatchStatistic} from "../interfaces/match-statistic";
import {PlayerHistory} from "../interfaces/player-history";
import {Match} from "../interfaces/match";

@Injectable()
export class FaceitService {

  readonly rootUrl = 'https://open.faceit.com/data/v4';

  constructor(private http: HttpClient) {
  }

  public getProfile(id: string): Observable<PlayerProfile> {
    return this.http.get<PlayerProfile>(`${this.rootUrl}/players/${id}`);
  }

  public getPlayerGlobalStatistic(id: string): Observable<PlayerGlobalStatistic> {
    return this.http.get<PlayerGlobalStatistic>(`${this.rootUrl}/players/${id}/stats/csgo`);
  }

  public getPlayerHistory(id: string, skip: number = 0, take: number = 20): Observable<PlayerHistory> {
    return this.http.get<PlayerHistory>(`${this.rootUrl}/players/${id}/history?game=csgo&offset=${skip}&limit=${take}`);
  }

  public getMatch(matchId: string): Observable<Match> {
    return this.http.get<Match>(`${this.rootUrl}/matches/${matchId}`);
  }

  public getMatchStatistic(matchId: string): Observable<MatchStatistic> {
    return this.http.get<MatchStatistic>(`${this.rootUrl}/matches/${matchId}/stats`);
  }
}
