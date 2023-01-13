import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarList } from '../models/cars/carList.model';
import { DeleteDialogData } from '../models/deleteDialogData.model';
import { CarService } from '../services/car.service';
import { DeleteCarComponent } from './dialogs/delete-car/delete-car.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: CarList[] = [];
  showSpinner: boolean = true;
  
  constructor(
    private carSvc: CarService,
    private dialogSvc: MatDialog
    ) {}

  ngOnInit(): void {
    this.loadCars();
  }
  private loadCars(): void {

    this.carSvc.getCars().subscribe({
      next: (carsFromApi) => {
        this.cars = carsFromApi;
        this.showSpinner = false;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        alert(e.message);
      }
    });
  }

  deleteCar(id: number, plateNum: string): void {
   
    const dialogRef = this.dialogSvc.open(DeleteCarComponent, {
      data: {
        name: plateNum,
      } as DeleteDialogData,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (answer: Boolean) => {
        if(answer)
        {
          this.showSpinner = true;

          this.carSvc.deleteCar(id).subscribe({
            next: () => {
              this.loadCars();
            },
            error: (e: HttpErrorResponse) => {
              alert(e.message);
              console.log(e);
            }
          });
        }
      }
    });

  }

}
