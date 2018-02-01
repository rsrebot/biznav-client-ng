import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService, QueryDefViewModel, ReferenceDataService } from '@app/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/combineAll';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, OnDestroy {

  @Input()
  id: number;

  @Input()
  editable = true;

  loading = false;
  reportDefinition: QueryDefViewModel;
  selectedTab: string;

  private sub: any;

  private selectTab(tab) {
    this.selectedTab = tab.id;
  }

  constructor(private route: ActivatedRoute, private reportsService: ReportsService, private referenceDataService: ReferenceDataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.loading = true;
      const reportSubs = this.reportsService.getReportDefinition(this.id.toString()).subscribe( data => {
          this.reportDefinition = data;
          this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
