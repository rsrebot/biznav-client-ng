import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ITreeItem, TreeItemType, TreeItem } from '@app/features/reports-list/tree-view/tree-view.component';
import { RouterLink } from '@angular/router';
import { ReportsService } from '@app/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-tree-view-actions',
  templateUrl: './tree-view-actions.component.html',
  styleUrls: ['./tree-view-actions.component.scss']
})
export class TreeViewActionsComponent implements OnInit {

  @Input()
  item: ITreeItem;

  modalRef: BsModalRef;
  treeItemType = TreeItemType;

  isFolder(): boolean {
    return this.item ? this.item.type === TreeItemType.folder : false;
  }

  isReport(): boolean {
    return this.item ? this.item.type === TreeItemType.report : false;
  }

  constructor(private reportsService: ReportsService, private modalService: BsModalService) { }

  delete() {
    alert('delete');
  }

  showNameModal(item: ITreeItem, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createNew(item: ITreeItem, name: string, type: TreeItemType) {
    if (type === TreeItemType.folder) {
      this.reportsService.createNewFolder(+item.id, name).subscribe(resp => {
        const fId = resp['folderId'] as string;
        item.children.push(new TreeItem(fId, name, TreeItemType.folder));
      }, err => {
        alert(JSON.stringify(err));
      });

      this.modalRef.hide();
    }
  }

  ngOnInit() {
  }

}
