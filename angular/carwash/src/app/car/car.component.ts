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
  
  constructor(private carSvc: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }
  private loadCars() {
    this.carSvc.getCars().subscribe(
      carsFromApi => {
        this.cars = carsFromApi;
      }
    )
  }

}
