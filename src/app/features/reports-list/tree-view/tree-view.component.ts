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

  filterItems() {
    this.setTreeItemVisibility(this.root, this._filter);
  }

  isHeaderVisible(item: ITreeItem): boolean {
    if (item) {
      return item.visible;
    } else {
      return false;
    }
  }

  isBodyVisible(item: ITreeItem): boolean {
    if (item) {
      return item.children.length > 0  
            && item.visible
            && (!item.collapsed || item.filtered);
    } else {
      return false;
    }
  }

  showEmptyBody(item: ITreeItem): boolean {
    if (item) {
      return item.children.length === 0 
            && item.visible
            && (!item.collapsed || item.filtered);
    } else {
      return false;
    }
  }

  private setTreeItemVisibility(item: ITreeItem, filterStr: string): boolean {
    if (!item) {
      return;
    }
    
    let filtered = true;
    
    if (!filterStr || filterStr.length < 1) {
      filtered = false;
    } else {
      if (!item.text.toLowerCase().includes(filterStr.toLocaleLowerCase(), 0)) {
        filtered = false;
      }
    }

    item.children.forEach(element => {
      filtered = filtered || this.setTreeItemVisibility(element, filterStr);
    });

    //item.visible = visible;
    //item.collapsed = !visible;
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
