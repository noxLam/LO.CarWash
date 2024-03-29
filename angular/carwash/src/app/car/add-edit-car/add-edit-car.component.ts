import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploaderConfig } from 'src/app/directive/image-uploader/image-uploader.config';
import { UploaderStyle, UploaderMode, UploaderType } from 'src/app/directive/image-uploader/uploader.enums';
import { UploaderImage } from 'src/app/directive/image-uploader/UploaderImage.data';
import { PageMode } from 'src/app/enums/pageMod.enum';
import { Car } from 'src/app/models/cars/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.css']
})
export class AddEditCarComponent implements OnInit {

  carId?: number;
  car?: Car;
  carForm!: FormGroup;
  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  images: UploaderImage[] = [];

  uploaderConfig = new ImageUploaderConfig(UploaderStyle.Normal, UploaderMode.AddEdit, UploaderType.Single);



  carPlateNumExists: boolean = false;
  carPlateNumExistsMessage: string = 'This Plate Number Already Exists';

  constructor(
    private carSvc: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.setCarId();
    this.setPageMode();
    this.buildForm();

    if(this.pageMode == PageMode.Edit)
    {
      this.loadCar();
    }
    
  }

  submitForm() {
    if(this.carForm.valid)
    {
      if(this.pageMode == PageMode.Create)
      {
        this.carSvc.createCar(this.carForm.value).subscribe({
          next: () => {
            this.router.navigate(['/cars']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }else {
        this.carSvc.editCar(this.carId!, this.carForm.value).subscribe({
          next: () => {
            this.router.navigate(['/cars']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }
    }
  }
  

  uploadFinished(uploaderImages: UploaderImage[]) {

    this.carForm.patchValue({
      images: uploaderImages
    });
  }
  

  
  private setCarId(): void {
    this.carId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  
  private setPageMode(): void {
    if(this.carId)
    {
      this.pageMode = PageMode.Edit
    }
  }

  private buildForm() {
    this.carForm = this.fb.group({
      id: [0],
      make: ['', Validators.required],
      model: ['', Validators.required],
      plateNumber: ['', Validators.required],
      images: [[]]
    });
  }

  private loadCar() {
    this.carSvc.getCar(this.carId!).subscribe({
      next: (carFromApi) => {
        this.car = carFromApi;
        this.carForm.patchValue(carFromApi);
        this.images = carFromApi.images;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        alert(e);
      }
    });
  }
}
