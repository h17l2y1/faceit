import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Player} from "../interfaces/player";
import {PlayerStatistic} from "../interfaces/player-statistic";
import {Match} from "../interfaces/match";

@Injectable()
export class FaceitService {

  readonly rootUrlv4 = 'https://open.faceit.com/data/v4';
  readonly rootUrlv1 = 'https://api.faceit.com/stats/v1';

  constructor(private http: HttpClient) {}

  public getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.rootUrlv4}/players/${id}`);
  }

  public getPlayerStatistic(id: string): Observable<PlayerStatistic> {
    return this.http.get<PlayerStatistic>(`${this.rootUrlv4}/players/${id}/stats/csgo`);
  }

  public getMatch(id: string): Observable<Match> {
    return this.http.get<Match>(`${this.rootUrlv4}/matches/${id}`);
  }

  // public getMatchStatistic(id: string): Observable<Match> {
  //   return this.http.get<Match>(`${this.rootUrl}/matches/${id}/stats`);
  // }

  public getLast20Matches(playerId: string): Observable<any> {
    return this.http.get<any>('https://api.faceit.com/users/v1/nicknames/hitryi_');
    // return this.http.get<Match>('https://api.faceit.com/stats/v1/stats/time/users/9bbfed13-03da-41db-bf3b-b2db0d65ff98/games/csgo?page=0&size=20');
    // return this.http.get<Match>(`${this.rootUrlv1}/stats/time/users/${playerId}/games/csgo?page=0&size=20`);
  }

}
