import { Component, OnInit, OnChanges } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Cell } from './cell';

@Component({
  selector: 'app-gol-dashboard',
  templateUrl: './gol-dashboard.component.html',
  styleUrls: ['./gol-dashboard.component.css']
})
export class GolDashboardComponent implements OnInit, OnChanges {
  xSize: number;
  ySize: number;
  cells: Cell[][]=[]; 

  cell: Cell = {
    coordX: 0,
    coordY: 0,
    isAlive: false
  };

  constructor() { }

  ngOnInit() {
    console.log("SIZE:", this.cells.length);
  }

  ngOnChanges(){
  }

  onSubmit(dashboardXY: NgForm) {
    this.cells=[];
    console.log("LOG: ", dashboardXY.value);
    
    this.xSize = dashboardXY.value.xSize;
    this.ySize = dashboardXY.value.ySize;

    for (let indexY = 0; indexY < this.ySize; indexY++) {
      let element: Cell[] = [];
      this.cells.push(element);
    }

    for (let indexY = 0; indexY < this.ySize; indexY++) {
      for (let indexX = 0; indexX < this.xSize; indexX++) {
        this.cells[indexY][indexX] = {coordX: indexX, coordY: indexY, isAlive: false};
        console.log("Creating: ", this.cells[indexY][indexX]);
      }
    }
  }
}
