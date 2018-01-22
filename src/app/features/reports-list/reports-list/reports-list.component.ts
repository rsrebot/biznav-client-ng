import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  @Input() items: ITreeItem[] = null;
  @Input() level = 0;

  filter = '';

  constructor() { }

  isFolder(item: ITreeItem) {
    return item.type === TreeItemType.folder;
  }

  change(item: ITreeItem) {
    item.collapsed = !item.collapsed;
  }

  filterItems() {
    // if (this.filter && this.filter.length > 3) {
      this.setTreeItemVisibility(this.items[0], this.filter);
    // }
  }

  private setTreeItemVisibility(item: ITreeItem, filterStr: string): boolean {
    let visible = true;

    if (!filterStr || filterStr.length < 1) {
      visible = true;
    } else {
      if (!item.text.includes(filterStr, 0)) {
        visible = false;
      }
    }

    item.children.forEach(element => {
      visible = visible || this.setTreeItemVisibility(element, filterStr);
    });

    item.visible = visible;
    return visible;
  }

  ngOnInit() {
    if ( this.items === null ) {
      this.items = new Array<ITreeItem>();
      const item = new TreeItem(1, 'Root', TreeItemType.folder);
      this.items.push(item);

      let child1 =  new TreeItem(3, 'Empty Folder', TreeItemType.folder);
      child1.collapsed = true;
      item.children.push(child1);

      child1 = new TreeItem(2, 'Folder 1', TreeItemType.folder);
      child1.collapsed = true;
      item.children.push(child1);

      let rp1 = new TreeItem(4, 'Report 1', TreeItemType.report);
      child1.children.push(rp1);
      rp1 = new TreeItem(5, 'Report 2', TreeItemType.report);
      child1.children.push(rp1);
      rp1 = new TreeItem(6, 'Report 4', TreeItemType.report);
      child1.children.push(rp1);

      const child2 = new TreeItem(7, 'Folder 5', TreeItemType.folder);
      child1.children.push(child2);

      rp1 = new TreeItem(7, 'Report 5', TreeItemType.report);
      child2.children.push(rp1);

      rp1 = new TreeItem(8, 'Report 6', TreeItemType.report);
      child2.children.push(rp1);

      rp1 = new TreeItem(9, 'Report 7', TreeItemType.report);
      child2.children.push(rp1);
    }
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
