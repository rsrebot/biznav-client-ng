import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationsService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessages(): Observable<DRMessage[]> {
    const apiURL = this.url + '/rest/message';
    return this.http.get(apiURL)
      .map(res => {
        const messages = new Array<DRMessage>();
        const messsageList = res as any;

        messsageList.clientMessages.forEach(msg => {
          messages.push(new DRMessage(msg.id, msg.displayText, msg.messageClassID));
        });

        return messages;
      });
  }
}

export class DRMessage {
  constructor(public id: number, public displayText: string, public messageClassID: number){
  }
}
