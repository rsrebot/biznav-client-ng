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

  getAvailableColumnTypes(): Observable<ReferenceData<number>[]> {
    return Observable.of(
      ReferenceData.CreateReferenceDataArray<number>(
        [
        {id: 0, text: 'Integer'},
        {id: 1, text: 'Float'},
        {id: 2, text: 'String'},
        {id: 3, text: 'Date'},
        {id: 3, text: 'DateTime'},
        {id: 4, text: 'Long'},
        {id: 5, text: 'Long Raw'},
        {id: 6, text: 'Cursor'},
        {id: 7, text: 'CLOB'},
        {id: 8, text: 'BLOB'},
        {id: 9, text: 'BFile'},
        {id: 10, text: 'Reference'},
        {id: 11, text: 'Object'},
        {id: 12, text: 'PL/SQL String'},
        {id: 13, text: 'Char (Fixed Length)'},
        {id: 14, text: 'Substitution'},
        {id: 15, text: 'WideString'},
        {id: 16, text: 'UTF8String'},
        {id: 17, text: 'Timestamp'},
        {id: 18, text: 'Timestamp with Time Zone'},
        {id: 19, text: 'Timestamp with Local Time Zone'}
      ]
      ));
  }

  getAvailableParamTypes(): Observable<ReferenceData<string>[]> {
    return Observable.of(ReferenceData.CreateReferenceDataArray<string>(
      [
        {id: 'mptUnknown', text: 'Unknown'},
        {id: 'mptString', text: 'String'},
        {id: 'mptNumber', text: 'Number'},
        {id: 'mptDate', text: 'Date'},
        {id: 'mptDateStrDMY', text: 'DateStrDMY'},
        {id: 'mptDateStrMDY', text: 'DateStrMDY'},
        {id: 'mptSubstDBO', text: 'SubstDBO'},
        {id: 'mptGroup', text: 'Group'},
        {id: 'mptSet', text: 'Set'},
        {id: 'mptStringSet', text: 'StringSet'},
        {id: 'mptDateRangeRNG', text: 'DateRangeRNG'},
        {id: 'mptSystem', text: 'System'},
        {id: 'mptFloat', text: 'Float'}
      ]
    ));
  }

  getLookups(objId: string, paramName: string): Observable<string> {
    const apiURL = this.url + '/rest/lookup/' + objId + '/' + paramName;
    return this.http.get(apiURL)
      .map(res => {
        return res as string;
      });
  }
}

export class ReferenceData<T> {
  constructor(public id: T, public text: string) {
  }

  static CreateReferenceDataArray<T>(values: any[]): ReferenceData<T>[] {
    const returnArray = [];
    values.forEach(v => returnArray.push(new ReferenceData(v.id, v.text)));

    return returnArray;
  }
}
