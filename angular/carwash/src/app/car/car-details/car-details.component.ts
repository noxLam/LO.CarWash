import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploaderConfig } from 'src/app/directive/image-uploader/image-uploader.config';
import { UploaderStyle, UploaderMode, UploaderType } from 'src/app/directive/image-uploader/uploader.enums';
import { UploaderImage } from 'src/app/directive/image-uploader/UploaderImage.data';
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

  images: UploaderImage[] = [];

  uploaderConfig = new ImageUploaderConfig(UploaderStyle.Normal, UploaderMode.Details, UploaderType.Single);



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

          if(carFromApi.images) {
            this.images = carFromApi.images;
          }
        },
        error: (e: HttpErrorResponse) => {
          console.log(e);
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

}
