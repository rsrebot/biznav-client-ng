import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { RouterModule } from "@angular/router";
import { CodemirrorModule } from 'ng2-codemirror';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';
import { TabsModule } from 'ngx-bootstrap';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ColumnsComponent } from './columns/columns.component';
import { QueryEditorComponent } from './query-editor/query-editor.component';
import { SecurityComponent } from './security/security.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CodemirrorModule,
    FormsModule,
    LoadingModule,
    TabsModule
  ],
  declarations: [ReportDetailsComponent, GeneralInfoComponent, ParametersComponent, ColumnsComponent, QueryEditorComponent, SecurityComponent]
})
export class ReportDetailsModule { }
