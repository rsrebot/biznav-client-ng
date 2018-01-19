import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {NgbModule, NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
