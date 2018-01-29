import { Component, OnInit, Input, Output } from '@angular/core';
import { CodemirrorComponent } from 'ng2-codemirror';
import 'codemirror/mode/sql/sql';
import { QueryDefViewModel } from "@app/core";

@Component({
  selector: 'app-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements OnInit {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
    this.code = val ? val.sql : '';
  }

  reportDefinition: QueryDefViewModel;
  code = '';

  config = {
     lineNumbers: true,
     mode: 'text/x-plsql',
     theme: 'dracula'
  };

  constructor() { }

  onFocus() {
  }

  onBlur() {
  }

  ngOnInit() {
  }

}
