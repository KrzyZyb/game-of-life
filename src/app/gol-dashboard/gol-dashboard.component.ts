import { Component, OnInit, OnChanges } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Cell } from './cell';
import { element } from 'protractor';
import { CoordPair } from './coordPair';

@Component({
  selector: 'app-gol-dashboard',
  templateUrl: './gol-dashboard.component.html',
  styleUrls: ['./gol-dashboard.component.css']
})
export class GolDashboardComponent implements OnInit, OnChanges {
  xSize: Number;
  ySize: Number;
  cells: Cell[][]=[]; 

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  isAlive(chosenCell: Cell){
    chosenCell.isAlive = !chosenCell.isAlive;
  }

  clearDashboard(){
    for (let indexY = 0; indexY < this.ySize; indexY++) {
      for (let indexX = 0; indexX < this.xSize; indexX++) {
        this.cells[indexY][indexX] = new Cell(indexX, indexY);
        this.xSize = 0;
        this.ySize = 0;
      }
    }
  }

  onSubmit(dashboardXY: NgForm) {
    this.cells=[];
    let tempXsize = Number(dashboardXY.value.xSize);
    let tempYySize = Number(dashboardXY.value.ySize);
    this.xSize = tempXsize;
    this.ySize = tempYySize;

    for (let indexY = 0; indexY < tempXsize; indexY++) {
      let element: Cell[] = [];
      this.cells.push(element);
    }

    for (let indexY = 0; indexY < tempYySize; indexY++) {
      for (let indexX = 0; indexX < tempXsize; indexX++) {
        let cell = new Cell(indexX, indexY);
        cell.setNeighbours(getNeighboursCoords(indexX,indexY,tempXsize,tempYySize));
        this.cells[indexY][indexX] = cell;
      }
    }

    function getNeighboursCoords(indexX: number, indexY: number, tempXsize: number, tempYySize: number){
      let neighbourCoords: CoordPair[] = [];
      neighbourCoords.push(

        // ABOVE
        {x:indexX-1, y:indexY-1},
        {x:indexX, y:indexY-1},
        {x:indexX+1, y:indexY-1},

        //SAME LINE
        {x:indexX-1, y:indexY},
        {x:indexX+1, y:indexY},

        // BELOW
        {x:indexX-1, y:indexY+1},
        {x:indexX, y:indexY+1},
        {x:indexX+1, y:indexY+1},
        );


        //Filtering out values that are out of bounds for this cell
        neighbourCoords = neighbourCoords
        .filter(xy => xy.x>=0)
        .filter(xy => xy.y>=0)
        .filter(xy => xy.x<tempXsize)
        .filter(xy => xy.y<tempYySize);
        return neighbourCoords;
    }
  }
}
