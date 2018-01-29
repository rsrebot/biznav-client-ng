import { Component, OnInit, Input } from '@angular/core';
import { QueryDefViewModel } from "@app/core";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
  }

  reportDefinition: QueryDefViewModel;

  constructor() { }

  ngOnInit() {
  }

}
