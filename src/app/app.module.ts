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
import {HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthService, AuthInterceptor, ReportsService } from '@app/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from '@app/features/login';
import { SidebarModule } from 'ng-sidebar';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';
import { ReportsListModule } from '@app/features/reports-list';
import { PageNotFoundComponent } from '@app/shared';
import { MessageBus } from 'ngx-message-bus';
import { BsDropdownModule, TabsModule, ModalModule } from 'ngx-bootstrap';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '@app/core/auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
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
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.threeBounce,
        primaryColour: '#003058',
        secondaryColour: '#00a7e1',
        tertiaryColour: '#ffffff'
    }),
    HttpClientModule,
    SidebarModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: !environment.production } // <-- debugging purposes only
    ),
    ToastrModule.forRoot(),
    ModalModule.forRoot()
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
