import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CustomerComponent } from './components/customer/customer.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { EmployeeModalComponent } from './components/employee-modal/employee-modal.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    AppComponent,
    DataGridComponent,
    NavbarComponent,
    HomeComponent,
    EmployeeComponent,
    CustomerComponent,
    EmployeeModalComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
