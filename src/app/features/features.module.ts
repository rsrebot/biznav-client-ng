import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ReportsListModule } from './reports-list';
import { DashboardModule } from './dashboard';
import { ReportDetailsModule } from './report-details';
import { RouterModule } from '@angular/router';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReportsListModule,
    DashboardModule,
    ReportDetailsModule,
    RouterModule,
    TypeaheadModule
  ],
  exports: [],
  declarations: []
})
export class FeaturesModule { }
