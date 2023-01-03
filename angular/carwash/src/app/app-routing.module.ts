import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"customers", component: CustomerComponent},
  {path:"home", component: HomeComponent},
  {path:"cars", component: CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
