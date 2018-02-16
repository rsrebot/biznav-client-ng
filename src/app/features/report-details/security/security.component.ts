import { Component, OnInit, Input } from '@angular/core';
import { QueryDefViewModel } from '@app/core';

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

  groups: ['A', 'Ab', 'Abc'];
  selected: string;

  reportDefinition: QueryDefViewModel;

  constructor() { }

  assignGroup(group: string) {

  }

  removeGroup(group: string) {

  }

  ngOnInit() {
  }

}
