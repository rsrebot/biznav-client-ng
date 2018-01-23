import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-view-actions',
  templateUrl: './tree-view-actions.component.html',
  styleUrls: ['./tree-view-actions.component.scss']
})
export class TreeViewActionsComponent implements OnInit {

  constructor() { }

  delete() {
    alert('delete');
  }

  ngOnInit() {
  }

}
