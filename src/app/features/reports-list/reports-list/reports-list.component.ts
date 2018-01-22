import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  @Input() root: ITreeItem = null;

  filter = '';

  constructor() { }

  isFolder(item: ITreeItem) {
    return item.type === TreeItemType.folder;
  }

  change(item: ITreeItem) {
    item.collapsed = !item.collapsed;
  }

  ngOnInit() {
  }

}

export interface ITreeItem {
  id: number;
  text: string;
  type: TreeItemType;
  collapsed: boolean;
  visible: boolean;
  children: ITreeItem[];
  selected: boolean;
}

export class TreeItem implements ITreeItem {

  constructor(public id: number, public text: string, public type: TreeItemType) {
    this.children = new Array<ITreeItem>();
  }

  collapsed = true;
  visible = true;
  selected = false;
  children: ITreeItem[];
}

export enum TreeItemType {
  folder,
  report
}
