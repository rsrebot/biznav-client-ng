import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { trigger, style, animate, transition  } from '@angular/animations';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-tree-view',  
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class TreeViewComponent implements OnInit, OnDestroy {

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

  isLatestVersion(item: ITreeItem) {
    // TODO: we should have a isLatest property coming form the back
    return this.isFolder(item) 
          || item.status == 'RDY';
  }

  changeCollapsedState(item: ITreeItem) {
    if (item.collapsable && !item.filtered) { 
      item.collapsed = !item.collapsed;
    }
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
      return item.children.length < 1
            && item.type === TreeItemType.folder
            && item.visible
            && !this.isBodyVisible(item)
            && ((!item.collapsed && !this.isFiltered())
                 || (this.isFiltered() && item.filtered));
    } else {
      return false;
    }
  }

  reportSelected(item: ITreeItem) {
    this.router.navigateByUrl('dashboard/reports/' + item.id);
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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}

export interface ITreeItem {
  id: string;
  text: string;
  type: TreeItemType;
  collapsed: boolean;
  visible: boolean;
  filtered: boolean;
  children: ITreeItem[];
  selected: boolean;
  collapsable: boolean;
  showActions: boolean;
  showVersion: boolean;
  version: number,
  status: string
}

export class TreeItem implements ITreeItem {

  constructor(public id: string, public text: string, public type: TreeItemType) {
    this.children = new Array<ITreeItem>();
  }

  collapsed = true;
  visible = true;
  selected = false;
  children: ITreeItem[];
  filtered = false;
  collapsable = true;
  showActions = true;
  showVersion = true;
  version = 0;
  status = null;
}

export enum TreeItemType {
  folder,
  report
}
