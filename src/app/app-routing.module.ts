import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { GetComponent } from './get/get.component';
import { EditComponent } from './edit/edit.component';
import { ProductAddComponent } from './product/add/add.component';
import { ProductEditComponent } from './product/edit/edit.component';
import { ProductGetComponent } from './product/get/get.component';
import { OrderAddComponent } from './order/add/add.component';
import { OrderEditComponent } from './order/edit/edit.component';
import { OrderGetComponent } from './order/get/get.component';

import { NotFound4o4Component } from './not-found4o4/not-found4o4.component';

const routes: Routes = [{
  path: '',
  component: AddComponent
},
{
  path: 'user/create',
  component: AddComponent
},
{
  path: 'user/edit/:id',
  component: EditComponent
},
{
  path: 'user',
  component: GetComponent
},
{
  path: 'product/create',
  component: ProductAddComponent
},
{
  path: 'product/edit/:id',
  component: ProductEditComponent
},
{
  path: 'product',
  component: ProductGetComponent
},
{
  path: 'order/create',
  component: OrderAddComponent
},
{
  path: 'order/edit/:id',
  component: OrderEditComponent
},
{
  path: 'order',
  component: OrderGetComponent
},
{
  path: '404',
  component: NotFound4o4Component
},
{
  path: '**',
  redirectTo: '404'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
