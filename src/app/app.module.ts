import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth-interceptor.service";
import {VegaComponentModule} from "@heartlandone/vega-angular";
import { TeamComponentComponent } from './team-component/team-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponentComponent
  ],
  imports: [
    VegaComponentModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
