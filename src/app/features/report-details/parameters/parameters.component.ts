import { Component, OnInit, Input } from '@angular/core';
import { QueryDefViewModel } from "@app/core";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
  }

  reportDefinition: QueryDefViewModel;

  constructor() { }

  ngOnInit() {
  }

}
