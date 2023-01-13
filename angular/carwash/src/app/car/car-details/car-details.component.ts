import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/cars/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carId!: number;
  car!: Car;

  constructor (
    private carSvc: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {

    this.loadCar();

  }


  private loadCar() {
    this.carId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if(this.carId)
    {
      this.carSvc.getCar(this.carId).subscribe({
        next: (carFromApi) => {
          this.car = carFromApi;
        },
        error: (e: HttpErrorResponse) => {
          console.log(e);
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

}
