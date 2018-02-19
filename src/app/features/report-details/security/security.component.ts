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

  groups = ['A', 'Ab', 'Abc', 'aaaaaaaaaaaaaa asdasd asdasasdas', 'aaaaaaaaaaaaaa asdasd asdasasdas', 'aaaaaaaaaaaaaa asdasd asdasasdas',
  'aaaaaaaaaaaaaa asdasd asdasasdas', 'aaaaaaaaaaaaaa asdasd asdasasdas', 'aaaaaaaaaaaaaa asdasd asdasasdas',
  'aaaaaaaaaaaaaa asdasd asdasasdas', 'aaaaaaaaaaaaaa asdasd asdasasdas', 'aaaaaaaaaaaaaa asdasd asdasasdas',
  'aaaaaaaaaaaaaa asdasd asdasasdas', 'aaaaaaaaaaaaaa asdasd asdasasdas', 'aaaaaaaaaaaaaa asdasd asdasasdas'];

  assignedGroups: string[] = [];

  selected: string;

  reportDefinition: QueryDefViewModel;

  constructor() { }

  assignGroup(group: string) {
    const i = this.groups.findIndex((value, index, obj) => {
      return value === group;
    });
    const val = this.groups.splice(i,  i + 1);
    if (val.length > 0) {
      this.assignedGroups.push(val[0]);
    }

    this.sortGroups();
  }

  sortGroups() {
    this.assignedGroups.sort((a, b) => {
       if (a === b) {
          return 0;
        }

        if (a < b) {
          return 1;
        }

        if (a > b) {
          return -1;
        }
    });

    this.groups.sort((a, b) => {
       if (a === b) {
          return 0;
        }

        if (a < b) {
          return 1;
        }

        if (a > b) {
          return -1;
        }
    });
  }

  removeGroup(group: string) {
    const i = this.assignedGroups.findIndex((value, index, obj) => {
      return value === group;
    });
    const val = this.assignedGroups.splice(i, i +  1);
    if (val.length > 0) {
      this.groups.push(val[0]);
    }

    this.sortGroups();
  }

  ngOnInit() {
  }

}
