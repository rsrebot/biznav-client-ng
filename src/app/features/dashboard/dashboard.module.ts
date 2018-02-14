import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessagesComponent } from './messages/messages.component';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    BsDropdownModule
  ],
  exports: [
    DashboardComponent
  ],
  declarations: [DashboardComponent, NavBarComponent, UserProfileComponent, MessagesComponent]
})
export class DashboardModule { }
