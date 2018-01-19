import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './reports-list/reports-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ReportsListComponent
  ],
  declarations: [ReportsListComponent]
})
export class ReportsListModule { }
