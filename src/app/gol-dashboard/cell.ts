import { CoordPair } from "./coordPair";

export class Cell {
    coordX: number;
    coordY: number;
    isAlive?: boolean;
    isAboutToLive?: boolean;
    isAboutToDie?: boolean;
    neighbours?: CoordPair[] =[];

    constructor(coordX: number, coordY: number){
      this.coordX=coordX;
      this.coordY=coordY;
      this.isAlive=false;
      this.neighbours=[];
    }
    setNeighbours(calculatedNeighbours: CoordPair[]){
      this.neighbours = calculatedNeighbours;
    }
  }
  

