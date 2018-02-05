import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReferenceDataService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) {  }

  getAvailableConnections(): Observable<string[]> {
    // const apiURL = this.url + '/rest/lookup/' + {objId}/{paramName}';
    // return this.http.get(apiURL)
    //   .map(res => {
    //     return res as string[];
    //   });
    // TODO: get the values from the backend
    return  Observable.of(['Equator', 'EL5']);
  }

  getAvailableColumnTypes(): Observable<string[]> {
    return Observable.of(['WideString', 'Number']);
  }

  getAvailableParamTypes(): Observable<string[]> {
    return Observable.of(['mptDateRangeRNG', 'mptDateRange']);
  }

  getLookups(objId: string, paramName: string): Observable<string> {
    const apiURL = this.url + '/rest/lookup/' + objId + '/' + paramName;
    return this.http.get(apiURL)
      .map(res => {
        return res as string;
      });
  }
}
