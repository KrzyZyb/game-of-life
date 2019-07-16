import { Component, OnInit } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'app-gol-dashboard',
  templateUrl: './gol-dashboard.component.html',
  styleUrls: ['./gol-dashboard.component.css']
})
export class GolDashboardComponent implements OnInit {
  xSize: number = 0;
  ySize: number = 0;

  cell: Cell = {
    coordX: 0,
    coordY: 0,
    isAlive: false
  };

  constructor() { }

  ngOnInit() {
  }

}
