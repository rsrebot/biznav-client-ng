import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { QueryDefViewModel, TMisQuery, DRColumn,
  DROutputOption, DROutputFormat, DROutputProtocol, DROutputOptions,
  DROutputContainer, DRParameterValue, DRParameter, DRQueryMode,
  DRQueryBase, DRQuery, TMisColumn, TMisParam, TMisLookup, TMisParamType, QueryValidator,
  } from './report-definition';

@Injectable()
export class ReportsService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReportsTree(): Observable<IReportTreeNode> {
    const apiURL = this.url + '/rest/root?showAllVersions=false';
    return this.http.get(apiURL)
      .map(res => {
        return this.treeParser(res);
      });
  }

  getReport(id: string): Observable<DRQuery> {
    const apiURL = this.url + '/rest/query/db:' + id;
    return this.http.get(apiURL)
      .map(res => {
        return res as DRQuery;
      });
  }

  getReportDefinition(id: string): Observable<QueryDefViewModel> {
    const apiURL = this.url + '/rest/query/definition/db:' + id;
    return this.http.get(apiURL)
      .map(res => {
        return res as QueryDefViewModel;
    });
  }

  validateReportDefinition(rptDefinition: QueryDefViewModel): Observable<QueryValidator> {
    const apiURL = this.url + '/rest/query/definition/validate';
    return this.http.post(apiURL, rptDefinition)
      .map(response => {
        const resp = response as any;
        const validator = resp.queryValidator as QueryValidator;
        const updatedQueryDef = resp.queryDef;
        validator.updatedDefinition = updatedQueryDef;

        return validator;
    });
  }

  createNewFolder(parentId: number, name: string) {
    const apiURL = this.url + '/rest/folder?parentFolderId=' + parentId +
    '&folderName=' + name;

    return this.http.post(apiURL, null);
  }

  private treeParser(item: any) {
    return {
      id: item.objID,
      text: item.displayName,
      type: item.objType,
      version: item.version,
      status: item.status,
      children: item.items.map(childItem => this.treeParser(childItem))
    };
  }
}

export interface IReportTreeNode {
  id: string;
  text: string;
  type: string;
  version: number;
  status: string;
  children: IReportTreeNode[];
}
