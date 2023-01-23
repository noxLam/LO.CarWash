import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCarComponent } from './car/add-edit-car/add-edit-car.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { CarComponent } from './car/car.component';
import { AddEditCardComponent } from './card/add-edit-card/add-edit-card.component';
import { CardComponent } from './card/card.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerComponent } from './customer/customer.component';
import { AddEditEmployeeComponent } from './employee/add-edit-employee/add-edit-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddEditWashComponent } from './wash/add-edit-wash/add-edit-wash.component';
import { WashComponent } from './wash/wash.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},

  {path:"customers", component: CustomerComponent},
  {path:"customers/create", component: AddEditCustomerComponent},
  {path:"customers/edit/:id", component: AddEditCustomerComponent},
  {path:"customers/details/:id", component: CustomerDetailsComponent},


  {path:"cars", component: CarComponent},
  {path:"cars/create", component: AddEditCarComponent},
  {path:"cars/edit/:id", component: AddEditCarComponent},
  {path:"cars/details/:id", component: CarDetailsComponent},

  {path:"employees", component: EmployeeComponent},
  {path:"employees/create", component: AddEditEmployeeComponent},
  {path:"employees/edit/:id", component: AddEditEmployeeComponent},
  {path:"employees/details/:id", component: EmployeeDetailsComponent},

  {path:"washes", component: WashComponent},
  {path:"washes/create", component: AddEditWashComponent},
  {path:"washes/edit/:id", component: AddEditWashComponent},

  {path:"cards", component: CardComponent},
  {path:"cards/create", component: AddEditCardComponent},

  {path: "not-found", component: NotFoundComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
