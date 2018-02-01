import { Component, OnInit, Input } from '@angular/core';
import { QueryDefViewModel } from "@app/core";

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
  }

  @Input('selected')
  set setSelected(val: boolean) {
    this.selected = val;
  }

  selected = false;
  reportDefinition: QueryDefViewModel;

  constructor() { }

  ngOnInit() {
  }

}
