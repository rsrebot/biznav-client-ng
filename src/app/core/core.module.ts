import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { ReportsService } from './reports/reports.service';
import { ReferenceDataService } from './reference-data/reference-data.service';
import { NotificationsService } from './notifications/notifications.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AuthInterceptor, AuthGuard, ReportsService, 
    ReferenceDataService, NotificationsService]
})
export class CoreModule { }
