import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ReportsService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReportsTree(): Observable<IReportTreeNode> {
    let apiURL = this.url + '/rest/root?showAllVersions=false';
    return this.http.get(apiURL) 
      .map(res => { 
        return this.treeParser(res);
      });
  }

  private treeParser(item: any) {
    return {
      id: item.objID,
      text: item.displayName,
      type: item.objType,
      version: item.version,
      status: item.status,
      children: item.items.map(childItem => this.treeParser(childItem))
    }
  }
}

export interface IReportTreeNode {
  id: string,
  text: string,
  type: string,
  version: number,
  status: string,
  children: IReportTreeNode[]
} 
