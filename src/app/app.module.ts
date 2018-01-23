import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FeaturesModule, 
          LoginComponent, 
          ReportsListComponent, 
          DashboardComponent, 
          ReportDetailsComponent } from '@app/features';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import  {HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AuthService, AuthInterceptor, ReportsService } from '@app/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from '@app/features/login';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';
import { ReportsListModule } from '@app/features/reports-list';
import { PageNotFoundComponent } from '@app/shared';
import { MessageBus } from 'ngx-message-bus';
import { BsDropdownModule } from 'ngx-bootstrap';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, 
    children: [
      { path: 'reports', component: ReportsListComponent },
      { path: 'reports/:id', component: ReportDetailsComponent },
      { path: '**', redirectTo: 'reports'}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    FeaturesModule,
    LoginModule,
    HttpClientModule,
    //NgbModule.forRoot(),
    SidebarModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: !environment.production } // <-- debugging purposes only
    )    
  ],
  providers: [
    AuthService,
    ReportsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageBus
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
