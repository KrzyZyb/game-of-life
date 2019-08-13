import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dna',
  templateUrl: './dna.component.html',
  styleUrls: ['./dna.component.css']
})
export class DnaComponent implements OnInit {
  @Input()
  public isPaused: boolean;

  constructor() { }

  ngOnInit() {
  }

  pauseListener(shouldPause: boolean){
    this.isPaused=shouldPause;
    console.log(shouldPause);
  }

}
