import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { ProductService } from './product.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { OrderService } from './order.service';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    GetComponent,
    EditComponent,
    NotFound4o4Component,
    ProductAddComponent,
    ProductEditComponent,
    ProductGetComponent,
    OrderAddComponent,
    OrderEditComponent,
    OrderGetComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService,ProductService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
