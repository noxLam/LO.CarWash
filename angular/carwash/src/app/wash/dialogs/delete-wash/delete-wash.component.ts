import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-wash',
  templateUrl: './delete-wash.component.html',
  styleUrls: ['./delete-wash.component.css']
})
export class DeleteWashComponent {

  constructor (@Inject(MAT_DIALOG_DATA) public data: any) {}

}
