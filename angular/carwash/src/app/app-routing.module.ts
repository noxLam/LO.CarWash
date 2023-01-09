import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},

  {path:"customers", component: CustomerComponent},
  {path:"customers/create", component: AddEditCustomerComponent},
  {path:"customers/edit/:id", component: AddEditCustomerComponent},
  {path:"customers/details/:id", component: CustomerDetailsComponent},


  {path:"cars", component: CarComponent},

  {path: "not-found", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
