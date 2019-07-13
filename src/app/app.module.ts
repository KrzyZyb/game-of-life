import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GolDashboardComponent } from './gol-dashboard/gol-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    GolDashboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
