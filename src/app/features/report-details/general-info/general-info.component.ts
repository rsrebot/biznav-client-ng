import { Component, OnInit, Input } from '@angular/core';
import { QueryDefViewModel } from "@app/core";

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
    if (val) {
      this.loadDefinition(val);
    }
  }

  @Input()
  editable = false;

  @Input()
  availableConnections: string[];

  reportDefinition: QueryDefViewModel;

  name: string;
  caption: string;
  shortDescription: string;
  connection: string;
  helpText: string;
  comment: string;

  loadDefinition(def: QueryDefViewModel) {
    this.name = def.name;
    this.caption = def.caption;
    this.connection = def.connection;
    this.shortDescription = def.description;
    this.helpText = def.help;
    this.comment = def.comment;
  }

  constructor() { }

  ngOnInit() {
  }

}
