import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './reports-list/reports-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReportsListComponent
  ],
  declarations: [ReportsListComponent]
})
export class ReportsListModule { }
