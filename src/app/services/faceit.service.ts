import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Player} from "../interfaces/player";
import {PlayerStatistic} from "../interfaces/player-statistic";
import {Match} from "../interfaces/match";

@Injectable({
  providedIn: 'root'
})
export class FaceitService {

  readonly rootUrl = 'https://open.faceit.com/data/v4';

  constructor(private http: HttpClient) {}

  public getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.rootUrl}/players/${id}`);
  }

  public getPlayerStatistic(id: string): Observable<PlayerStatistic> {
    return this.http.get<PlayerStatistic>(`${this.rootUrl}/players/${id}/stats/csgo`);
  }

  public getMatch(id: string): Observable<Match> {
    return this.http.get<Match>(`${this.rootUrl}/matches/${id}`);
  }

  // public getMatchStatistic(id: string): Observable<Match> {
  //   return this.http.get<Match>(`${this.rootUrl}/matches/${id}/stats`);
  // }

}
