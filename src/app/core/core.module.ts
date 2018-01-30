import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { ReportsService } from './reports/reports.service';
import { ReferenceDataService } from './reference-data/reference-data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AuthInterceptor, AuthGuard, ReportsService, ReferenceDataService]
})
export class CoreModule { }
