import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthRequestOptions } from "@app/core/auth/auth-request";
import { RequestOptions } from "@angular/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {
      provide: RequestOptions,
      useClass: AuthRequestOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
