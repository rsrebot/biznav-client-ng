import { Component, OnInit, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { CodemirrorComponent } from 'ng2-codemirror';
import 'codemirror/mode/sql/sql';
import { QueryDefViewModel } from '@app/core';

@Component({
  selector: 'app-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements OnInit, AfterViewInit  {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
    this.code = val ? val.sql : '';
  }

  @Input('selected')
  set setSelected(val: boolean) {
    this.selected = val;
    const that = this;
    if (this.selected && this.editor && this.editor.instance) {
      setTimeout(function() {
        that.editor.instance.refresh();
        that.editor.instance.focus();
      }, 100);
    }
  }

  selected = false;

  @ViewChild('editor') editor;

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

  ngAfterViewInit() {

  }
}
