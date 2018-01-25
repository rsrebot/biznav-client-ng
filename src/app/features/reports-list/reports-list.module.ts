import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { TreeviewModule } from 'ngx-treeview';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { TreeViewActionsComponent } from './tree-view-actions/tree-view-actions.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { LoadingModule } from 'ngx-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    LoadingModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    ReportsListComponent
  ],
  declarations: [ReportsListComponent, TreeViewComponent, TreeViewActionsComponent]
})
export class ReportsListModule { }
