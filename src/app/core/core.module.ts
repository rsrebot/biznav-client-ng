import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AuthInterceptor, AuthGuard]
})
export class CoreModule { }
