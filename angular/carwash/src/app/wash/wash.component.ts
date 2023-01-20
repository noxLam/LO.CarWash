import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WashType } from '../enums/washType.enum';
import { WashList } from '../models/washes/washList.model';
import { WashService } from '../services/wash.service';

@Component({
  selector: 'app-wash',
  templateUrl: './wash.component.html',
  styleUrls: ['./wash.component.css']
})
export class WashComponent implements OnInit{

  washes: WashList[] = [];
  washType = WashType;
  showSpinner: boolean = true;

  constructor (
    private washSvc: WashService,
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

}
