import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarList } from '../models/cars/carList.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: CarList[] = [];
  showSpinner: boolean = true;
  
  constructor(private carSvc: CarService) {}

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

  deleteCar(id: number): void {
    this.carSvc.deleteCar(id).subscribe({
      next: () => {
        this.loadCars();
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    })
  }

}
