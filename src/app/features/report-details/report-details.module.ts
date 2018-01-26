import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ReportDetailsComponent]
})
export class ReportDetailsModule { }
