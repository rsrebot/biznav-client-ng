import { Component, OnInit, Input } from '@angular/core';
import { ITreeItem, TreeItemType } from "@app/features/reports-list/tree-view/tree-view.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tree-view-actions',
  templateUrl: './tree-view-actions.component.html',
  styleUrls: ['./tree-view-actions.component.scss']
})
export class TreeViewActionsComponent implements OnInit {

  @Input()
  item: ITreeItem;

  isFolder(): boolean {
    return this.item ? this.item.type === TreeItemType.folder : false;
  }

  isReprot(): boolean {
    return this.item ? this.item.type === TreeItemType.report : false;
  }

  constructor() { }

  delete() {
    alert('delete');
  }

  ngOnInit() {
  }

}
