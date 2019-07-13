import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GolDashboardComponent } from './gol-dashboard/gol-dashboard.component';
import { DnaComponent } from './dna/dna.component';


@NgModule({
  declarations: [
    AppComponent,
    GolDashboardComponent,
    DnaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
