import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  @Input() root: ITreeItem = null;
  @Input() level = 0;
  _filter = '';

  @Input()
  public set filter(val: string) {
    this._filter = val;
    this.filterItems();
  }

  isFolder(item: ITreeItem) {
    return item ? item.type === TreeItemType.folder : false;
  }

  change(item: ITreeItem) {
    item.collapsed = !item.collapsed;
  }

  isFiltered(): boolean {
    return this._filter && this._filter.length > 0;
  }

  filterItems() {
    this.setTreeItemVisibility(this.root, this._filter);
  }

  isHeaderVisible(item: ITreeItem): boolean {
    if (item) {
      return item.visible &&
        ((this.isFiltered() && item.filtered) || !this.isFiltered());
    } else {
      return false;
    }
  }

  isBodyVisible(item: ITreeItem): boolean {
    if (item) {
      return item.children.length > 0
            && item.visible
            && ((!item.collapsed && !this.isFiltered())
                 || (this.isFiltered() && item.filtered));
    } else {
      return false;
    }
  }

  showEmptyBody(item: ITreeItem): boolean {
    if (item) {
      return item.children.length === 0
            && item.visible
            && !item.collapsed;
    } else {
      return false;
    }
  }

  private setTreeItemVisibility(item: ITreeItem, filterStr: string): boolean {
    if (!item) {
      return;
    }

    let filtered = true;

    if (!this.isFiltered()) {
      filtered = false;
    } else {
      if (!item.text.toLowerCase().includes(filterStr.toLocaleLowerCase())) {
        filtered = false;
      }
      if (item.type === TreeItemType.folder) {
        filtered = false;
      }
    }

    item.children.forEach(element => {
      filtered = filtered || this.setTreeItemVisibility(element, filterStr);
    });

    item.filtered = filtered;
    return filtered;
  }

  constructor() { }

  ngOnInit() {
    if ( this.root === null ) {
      const item = new TreeItem(1, 'Root', TreeItemType.folder);
      this.root = item;

      let child1 =  new TreeItem(3, 'Empty Folder', TreeItemType.folder);
      child1.collapsed = true;
      item.children.push(child1);

      child1 = new TreeItem(2, 'Folder 1', TreeItemType.folder);
      child1.collapsed = true;
      item.children.push(child1);

      let rp1 = new TreeItem(4, 'Report 1', TreeItemType.report);
      child1.children.push(rp1);
      rp1 = new TreeItem(5, 'Led Zeppelin 2', TreeItemType.report);
      child1.children.push(rp1);
      rp1 = new TreeItem(6, 'Report 4', TreeItemType.report);
      child1.children.push(rp1);

      const child2 = new TreeItem(7, 'Folder 5', TreeItemType.folder);
      child1.children.push(child2);

      rp1 = new TreeItem(7, 'Report 5', TreeItemType.report);
      child2.children.push(rp1);

      rp1 = new TreeItem(8, 'Rolling Stones 6', TreeItemType.report);
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
  filtered: boolean;
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
  filtered = false;
}

export enum TreeItemType {
  folder,
  report
}
