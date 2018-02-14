import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarContainer, Sidebar } from 'ng-sidebar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sidebarOpened = false;
  isMessageViewHidden = false;

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  toggleMessageView() {
    this.isMessageViewHidden = !this.isMessageViewHidden;
  }

  constructor() { }

  ngOnInit() {
  }

}
