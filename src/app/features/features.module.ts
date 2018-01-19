import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ReportsListModule } from './reports-list';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReportsListModule
  ],
  exports: [],
  declarations: []
})
export class FeaturesModule { }
