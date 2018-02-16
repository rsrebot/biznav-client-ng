import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { TMisParam, ReportsService, ParamLookupMode, TMisLookup } from '@app/core';
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
    this.displayMode = TMisParam.lookupMode(this.param);

    switch (this.displayMode) {
      case ParamLookupMode.lookupValues:
        this.items = this.param.lookup.items.slice();
        break;
      case ParamLookupMode.sql:
        this.code = this.param.lookupSource;
        break;
    }
  }

  modalRef: BsModalRef;
  param: TMisParam = null;
  displayMode: ParamLookupMode = ParamLookupMode.none;
  @ViewChild('editor') editor;
  code = '';
  items: string[];
  config = {
     lineNumbers: true,
     mode: 'text/x-plsql',
     theme: 'dracula'
  };
  newLoopupvalue: string;

  constructor(private modalService: BsModalService, private reportService: ReportsService) { }

  showLookupEditor(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  showSqlEditor(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
       Object.assign({}, { class: 'modal-lg' }));
  }

  saveSql() {
    this.param.lookupSource = this.code;
    this.modalRef.hide();
  }

  cancelSql() {
    this.modalRef.hide();
  }

  saveLookupValues() {
    if (this.items && this.items.length > 0) {
      this.param.lookup.items = this.items.slice();
    }

    this.modalRef.hide();
    this.newLoopupvalue = '';
  }

  cancelLookupValues() {
    this.items = this.param.lookup.items.slice();
    this.modalRef.hide();
    this.newLoopupvalue = '';
  }

  addLookupValue($event: KeyboardEvent) {
    if ($event.charCode === 13) {
      const exists = this.items.find((v, i) => {
        return v === this.newLoopupvalue;
      });

      if (!exists) {
        this.items.push(this.newLoopupvalue);
        this.items = this.items.sort();
      }

      this.newLoopupvalue = '';
    }
  }

  removeLookupValue(item) {
    const index = this.items.findIndex((v, i) => {
        return v === item;
      });

    this.items.splice(index, 1);
  }

  ngOnInit() {
  }

  selectMode(mode: ParamLookupMode) {
    this.displayMode = mode;

    switch (this.displayMode) {
      case ParamLookupMode.none:
        this.items = [];
        this.code = '';
        this.param.lookup = null;
        this.param.lookupSource = null;
        break;
      case ParamLookupMode.sql:
        this.items = [];
        this.code = this.param.lookupSource;
        this.param.lookup = new TMisLookup();
        this.param.lookupSource = null;
        break;
      case ParamLookupMode.lookupValues:
        this.code = '';
        if (this.param.lookup && this.param.lookup.items) {
          this.items = this.param.lookup.items;
        } else {
          this.items = [];
        }
        this.param.lookup = new TMisLookup();
        this.param.lookupSource = null;
        break;
    }
  }
}

