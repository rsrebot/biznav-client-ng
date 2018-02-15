import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { TMisParam, ReportsService } from '@app/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-param-lookup',
  templateUrl: './param-lookup.component.html',
  styleUrls: ['./param-lookup.component.scss']
})
export class ParamLookupComponent implements OnInit {

  paramLookupMode = ParamLookupMode;

  @Input('param')
  set setParam(val: TMisParam) {
    this.param = val;

    if (this.param.isSystem) {
      this.displayMode = ParamLookupMode.system;
      return;
    }

    if (!this.param.lookup) {
      this.displayMode = ParamLookupMode.noneSelected;
    } else {
      if (this.param.lookup.sql && this.param.lookup.sql.length > 0) {
        this.displayMode = ParamLookupMode.sqlSelected;
        this.code = this.param.lookupSource;
      } else {
        this.displayMode = ParamLookupMode.lookupSelected;
      }
    }
  }

  modalRef: BsModalRef;
  param: TMisParam = null;
  displayMode: ParamLookupMode = ParamLookupMode.noneSelected;
  @ViewChild('editor') editor;
  code = '';
  config = {
     lineNumbers: true,
     mode: 'text/x-plsql',
     theme: 'dracula'
  };

  constructor(private modalService: BsModalService, private reportService: ReportsService) { }

  showLookupEditor(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  showSqlEditor(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
       Object.assign({}, { class: 'modal-lg' }));
  }

  save() {
    // this.code = this.editor.
  }

  ngOnInit() {
  }

}

export enum ParamLookupMode {
  noneSelected,
  lookupSelected,
  sqlSelected,
  system
}
