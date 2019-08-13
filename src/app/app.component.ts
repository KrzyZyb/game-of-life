import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Game-of-Life';
  isPaused: boolean = false;

  pauseListener($event){
    console.log($event);
    this.isPaused=$event;
  }
}
