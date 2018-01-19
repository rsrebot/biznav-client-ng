import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FeaturesModule } from '@app/features';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService, AuthInterceptor } from "@app/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from '@app/features/login';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    FeaturesModule,
    LoginModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
