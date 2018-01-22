import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { TreeviewModule } from 'ngx-treeview';
import { TreeViewComponent } from './tree-view/tree-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReportsListComponent
  ],
  declarations: [ReportsListComponent, TreeViewComponent]
})
export class ReportsListModule { }
