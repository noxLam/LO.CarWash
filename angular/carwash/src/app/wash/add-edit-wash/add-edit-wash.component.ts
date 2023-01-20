import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMod.enum';
import { Size } from 'src/app/enums/size.enum';
import { WashType } from 'src/app/enums/washType.enum';
import { Wash } from 'src/app/models/washes/wash.model';
import { WashService } from 'src/app/services/wash.service';

@Component({
  selector: 'app-add-edit-wash',
  templateUrl: './add-edit-wash.component.html',
  styleUrls: ['./add-edit-wash.component.css']
})
export class AddEditWashComponent implements OnInit{

  washId!: number;
  wash!: Wash;
  washTypeEnum = WashType;
  vehicleSizeEnum = Size;
  washForm!: FormGroup;
  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor (
    private washSvc: WashService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.setWashId();
    this.setPageMode();
    this.buildForm();

    if(this.pageMode == PageMode.Edit)
    {
      this.loadWash();
    }
    
  }

  submitForm(): void {
    if(this.washForm.valid)
    {
      if(this.pageMode == PageMode.Create)
      {
        this.washSvc.createWash(this.washForm.value).subscribe({
          next: () => {
            this.router.navigate(['/washes']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }else
      {
        this.washSvc.editWash(this.washId, this.washForm.value).subscribe({
          next: () => {
            this.router.navigate(['/washes']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }
      
    }
  }


  //#region privates 
  private loadWash() {
    this.washSvc.getWash(this.washId).subscribe({
      next: (washFromApi) => {
        this.wash = washFromApi;
        this.washForm.patchValue(washFromApi);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        alert(e.message);
      }
    })
  }

  private buildForm() {
    this.washForm = this.fb.group({
      id: [0],
      washType: [''],
      vehicleSize: [''],
      price: ['']
    });
  }


  private setPageMode() {
    if(this.washId)
    {
      this.pageMode = PageMode.Edit;
    }
  }


  private setWashId() {
    this.washId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  //#endregion
}
