import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FeaturesModule, LoginComponent } from '@app/features';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService, AuthInterceptor } from '@app/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from '@app/features/login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    FeaturesModule,
    LoginModule,
    RouterModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: !environment.production } // <-- debugging purposes only
    )
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
