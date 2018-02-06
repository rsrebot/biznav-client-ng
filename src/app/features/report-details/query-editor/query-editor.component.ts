import { Component, OnInit, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { CodemirrorComponent } from 'ng2-codemirror';
import 'codemirror/mode/sql/sql';
import { QueryDefViewModel, ReportsService } from '@app/core';
import { ToastrService } from "ngx-toastr";

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

  constructor(private reportService: ReportsService, private toastr: ToastrService) { }

  validateQuery() {
    this.reportDefinition.sql = this.code;
    this.reportService.validateReportDefinition(this.reportDefinition).subscribe(resp => {
      if (resp.errorMessage) {
        this.toastr.error(resp.errorMessage);
        return;
      }
      if (resp.paramsModified) {
        this.toastr.info('Parameters Modified');
      }
      if (resp.colsModified) {
        this.toastr.info('Columns Modified');
      }

      this.toastr.success('Validation OK');

      this.reportDefinition = resp.updatedDefinition;
    });
  }

  onFocus() {

  }

  onBlur() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }
}
