import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ReportsListModule } from './reports-list';
import { DashboardModule } from './dashboard';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReportsListModule,
    DashboardModule
  ],
  exports: [],
  declarations: []
})
export class FeaturesModule { }
