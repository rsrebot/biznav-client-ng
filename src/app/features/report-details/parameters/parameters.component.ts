import { Component, OnInit, Input } from '@angular/core';
import { QueryDefViewModel, ReferenceDataService } from "@app/core";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  @Input('reportDefinition')
  set setReportDefinition(val: QueryDefViewModel) {
    this.reportDefinition = val;
  }

  @Input('selected')
  set setSelected(val: boolean) {
    this.selected = val;
  }

  selected = false;
  reportDefinition: QueryDefViewModel;
  paramTypes: string[];

  constructor(private referenceService: ReferenceDataService) { }

  ngOnInit() {
    this.referenceService.getAvailableParamTypes().subscribe(types => {
      this.paramTypes = types;
    });
  }

}
