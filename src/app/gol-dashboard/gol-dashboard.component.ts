import { Component, OnInit, OnChanges } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Cell } from './cell';
import { element } from 'protractor';
import { CoordPair } from './coordPair';
import { delay } from 'q';

@Component({
  selector: 'app-gol-dashboard',
  templateUrl: './gol-dashboard.component.html',
  styleUrls: ['./gol-dashboard.component.css']
})
export class GolDashboardComponent implements OnInit, OnChanges {
  xSize: Number;
  ySize: Number;
  cells: Cell[][]=[]; 
  isPlayed: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  isAlive(chosenCell: Cell){
    chosenCell.isAlive = !chosenCell.isAlive;
    this.getAllCells();
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

  prepareNextRound(){
    for (let indexY = 0; indexY < this.ySize; indexY++) {
      for (let indexX = 0; indexX < this.xSize; indexX++) {
        let cell = this.cells[indexY][indexX];
        let numberOfLivingNeighbours = this.countCellsLivingNeighbours(cell.neighbours);
        if (numberOfLivingNeighbours == 3) { 
          cell.isAboutToLive=true; 
          console.log("Cell", cell ,"resurected!")
        }
        else if (numberOfLivingNeighbours == 2 && cell.isAlive) {
          cell.isAboutToLive=true;
          console.log("Cell", cell ,"sustained!");
        }
        else{ cell.isAboutToLive=false}
      }
    }
    this.getAllCells().forEach(cell => setCellsStatus(cell));

    function setCellsStatus(cell: Cell){
      if(cell.isAboutToLive){
        cell.isAlive = true;
        cell.isAboutToLive=false;
      }else{
        cell.isAlive = false;
        cell.isAboutToLive = false;
      }
    }
  }

  countCellsLivingNeighbours(neighbours: CoordPair[] ){
    let numberOfLivingNeighbours = 0;
    neighbours.forEach(element => {
      if (this.cells[element.y][element.x].isAlive){
        numberOfLivingNeighbours++;
        console.log("Living neighbour found on x: ",element.x," y ",element.y);
      }
    });
    return numberOfLivingNeighbours;
  }

  getAllCells(){
    let allCells: Cell[] = [];
    this.cells.forEach(row => 
      {row.forEach( element => allCells.push(element))
    });
    return allCells;
  }

  async playInLoop(){
    this.isPlayed = !this.isPlayed;
    while(this.isPlayed){
      this.prepareNextRound();
      await new Promise(done => setTimeout(() => done(), 1000));  
    }

  }
}
