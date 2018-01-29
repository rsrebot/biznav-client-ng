import { Component, OnInit, Input } from '@angular/core';
import { QueryDefViewModel } from "@app/core";

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
  }

  reportDefinition: QueryDefViewModel;

  constructor() { }

  ngOnInit() {
  }

}
