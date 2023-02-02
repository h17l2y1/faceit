import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth-interceptor.service";
import {VegaComponentModule} from "@heartlandone/vega-angular";
import {TeamComponentComponent} from './team-component/team-component.component';
import {MapComparingComponent} from './map-comparing/map-comparing.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MapperService} from "./services/mapper.service";
import {FaceitService} from "./services/faceit.service";

@NgModule({
  declarations: [
    AppComponent,
    TeamComponentComponent,
    MapComparingComponent
  ],
  imports: [
    VegaComponentModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MapperService,
    FaceitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
