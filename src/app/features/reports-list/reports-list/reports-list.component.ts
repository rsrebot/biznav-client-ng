import { Component, OnInit, Input } from '@angular/core';
import { ReportsService, IReportTreeNode } from "@app/core";
import 'rxjs/add/operator/map'
import { ITreeItem, TreeItemType, TreeItem } from "@app/features/reports-list/tree-view/tree-view.component";
import { Subject } from "rxjs/Subject";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  @Input() root: ITreeItem = null;

  filter = '';
  _filter = '';
  loading = false;
  filterSubject = new Subject();
 
  constructor(private reportsService: ReportsService, private toastr: ToastrService) { }

  updateFilter(event: any) {
    this.filter = event;
    this.filterSubject.next(event);
  }

  isFolder(item: ITreeItem) {
    return item.type === TreeItemType.folder;
  }

  change(item: ITreeItem) {
    item.collapsed = !item.collapsed;
  }

  ngOnInit() {
    this.filterSubject.debounceTime(1000).subscribe(value =>{
      this._filter = value as string;
    });

    this.loading = true;
    
    this.reportsService.getReportsTree().subscribe( data => {
      this.loading = false;
      this.root = this.mapDataToTreeItem(data);
      this.root.collapsable = false;
      this.root.collapsed = false;
      this.root.showActions = false
      this.root.showVersion = false;
      this.root.text = 'Reports';
    }, error => {
      this.toastr.error('There was an error retrieving the reports data. ' + JSON.stringify(error));
    });
  }

  ngDestroy() {
    this.filterSubject.unsubscribe();
  }

  private mapDataToTreeItem(data: IReportTreeNode): ITreeItem {
    let item =  new TreeItem(data.id, data.text, 
        data.type.toLowerCase() === 'folder' ? TreeItemType.folder : TreeItemType.report);

    item.version = data.version;
    item.status = data.status;

    item.children = data.children.sort((first, second) => {
      // TODO: move this to utilities
      const firstTxt = first == null ? null : first.text == null ? null : first.text.toLowerCase();
      const secondTxt = second == null ? null : second.text == null ? null : second.text.toLowerCase();

      if (firstTxt == secondTxt) {
        const v1 = first == null ? null : first.version;
        const v2 = second == null ? null : second.version;

        if (v1 === v2)
          return 0;

        if (v1 < v2)
          return 1;

        if(v1 > v2)
          return -1;

        return 0;
      }
      if (firstTxt < secondTxt) 
        return -1;
      else
          return 1;
    }).map(child => this.mapDataToTreeItem(child));

    return item;
  }
}
