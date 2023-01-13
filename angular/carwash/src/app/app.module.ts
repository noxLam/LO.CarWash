import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CarComponent } from './car/car.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DeleteCustomerComponent } from './customer/dialogs/delete-customer/delete-customer.component';
import { AddEditCarComponent } from './car/add-edit-car/add-edit-car.component';
import { DeleteCarComponent } from './car/dialogs/delete-car/delete-car.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    HomeComponent,
    CarComponent,
    AddEditCustomerComponent,
    CustomerDetailsComponent,
    NotFoundComponent,
    DeleteCustomerComponent,
    AddEditCarComponent,
    DeleteCarComponent,
    CarDetailsComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
