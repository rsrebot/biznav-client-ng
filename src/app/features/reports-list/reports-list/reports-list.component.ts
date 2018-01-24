import { Component, OnInit, Input } from '@angular/core';
import { ReportsService, IReportTreeNode } from "@app/core";
import 'rxjs/add/operator/map'
import { ITreeItem, TreeItemType, TreeItem } from "@app/features/reports-list/tree-view/tree-view.component";
//import { LoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  @Input() root: ITreeItem = null;

  filter = '';
  loading = false;

  constructor(private reportsService: ReportsService) { }

  isFolder(item: ITreeItem) {
    return item.type === TreeItemType.folder;
  }

  change(item: ITreeItem) {
    item.collapsed = !item.collapsed;
  }

  ngOnInit() {
    this.loading = true;
    //this.spinner.show();
    this.reportsService.getReportsTree().subscribe( data => {
      this.loading = false;
      //this.spinner.hide();
      this.root = this.mapDataToTreeItem(data);
      this.root.collapsable = false;
      this.root.collapsed = false;
    });
  }

  private mapDataToTreeItem(data: IReportTreeNode): ITreeItem {
    let item =  new TreeItem(data.id, data.text, 
        data.type.toLowerCase() === 'folder' ? TreeItemType.folder : TreeItemType.report);

    item.children = data.children.map(child => this.mapDataToTreeItem(child));

    return item;
  }
}
