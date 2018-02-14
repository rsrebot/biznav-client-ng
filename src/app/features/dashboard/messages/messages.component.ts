import { Component, OnInit } from '@angular/core';
import { NotificationsService, DRMessage } from '@app/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: DRMessage[];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notificationsService.getMessages().subscribe(res => {
      this.messages = res;
    });
  }

  getMessageClass(message: DRMessage): string {
    switch (message.messageClassID) {
      case 1:
        return 'alert-danger';
      case 2:
        return 'alert-warning';
      case 3:
        return 'alert-primary';
    }
  }
}
