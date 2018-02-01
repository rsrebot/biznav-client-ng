import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { QueryDefViewModel, ReferenceDataService } from '@app/core';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
    if (val) {
      this.loadDefinition(val);
    }
  }

  @Input()
  editable = false;

  @Input('selected')
  set setSelected(val: boolean) {
    this.selected = val;
  }

  selected = false;

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

  constructor(private referenceService: ReferenceDataService) { }

  ngOnInit() {
    this.referenceService.getAvailableConnections().subscribe(connections => {
      this.availableConnections = connections;
    });
  }

  ngOnDestroy() {

  }
}
