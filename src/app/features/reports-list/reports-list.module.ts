import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    CommonModule,
    TreeviewModule
  ],
  exports: [
    ReportsListComponent
  ],
  declarations: [ReportsListComponent]
})
export class ReportsListModule { }
