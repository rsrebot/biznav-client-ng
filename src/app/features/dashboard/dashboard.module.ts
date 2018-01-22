import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RouterModule } from "@angular/router";
//import { SideNavComponent  } from "@ng-bootstrap/ng-bootstrap";
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule
  ],
  exports: [
    DashboardComponent
  ],
  declarations: [DashboardComponent, NavBarComponent, LeftMenuComponent]
})
export class DashboardModule { }
