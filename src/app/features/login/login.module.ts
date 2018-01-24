import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { HttpModule } from '@angular/http';
import { LoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    FormsModule,
    HttpModule,
    LoadingModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
