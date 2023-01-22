import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Size } from '../enums/size.enum';
import { WashType } from '../enums/washType.enum';
import { WashList } from '../models/washes/washList.model';
import { WashService } from '../services/wash.service';
import { DeleteWashComponent } from './dialogs/delete-wash/delete-wash.component';

@Component({
  selector: 'app-wash',
  templateUrl: './wash.component.html',
  styleUrls: ['./wash.component.css']
})
export class WashComponent implements OnInit{

  washes: WashList[] = [];
  washType = WashType;
  vehicleSize = Size;
  showSpinner: boolean = true;

  constructor (
    private washSvc: WashService,
    private dialogSvc: MatDialog
  ) {}

  ngOnInit(): void {

    this.loadWashes();
    
  }

  private loadWashes() {
    this.washSvc.getWashes().subscribe({
      next: (washesFromApi) => {
        this.washes = washesFromApi;
        this.showSpinner = false;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        alert(e.message);
      }
    });
  }


  deleteWash(id: number): void {
    let deleteDialogConfig: MatDialogConfig = {
      data: {
        wash: this.washes.find(w => w.id == id)
      },
      disableClose: true
    };

    const dialogRef = this.dialogSvc.open(DeleteWashComponent, deleteDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result == true)
      {
        this.showSpinner = true;
        this.washSvc.deleteWash(id).subscribe({
          next: () => {
            this.loadWashes();
          },
          error: (e: HttpErrorResponse) =>{
            console.log(e);
          }
        });
      }
    });
  }

}
