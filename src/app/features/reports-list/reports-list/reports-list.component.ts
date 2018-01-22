import { Component, OnInit } from '@angular/core';
import { TreeviewComponent, TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  config = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 400
    });

  items = [new TreeviewItem({
   text: 'IT', value: 9, children: [
       {
           text: 'Programming', value: 91, children: [{
               text: 'Frontend', value: 911, children: [
                   { text: 'Angular 1', value: 9111 },
                   { text: 'Angular 2', value: 9112 },
                   { text: 'ReactJS', value: 9113 }
               ]
           }, {
               text: 'Backend', value: 912, children: [
                   { text: 'C#', value: 9121 },
                   { text: 'Java', value: 9122 },
                   { text: 'Python', value: 9123, checked: false }
               ]
           }]
       },
       {
           text: 'Networking', value: 92, children: [
               { text: 'Internet', value: 921 },
               { text: 'Security', value: 922 }
           ]
       }
   ]
})];

  onSelectedChange(evt) {
    // alert('change');
  }

  constructor() { }

  ngOnInit() {
  }

}
