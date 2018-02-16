import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService, QueryDefViewModel, ReferenceDataService } from '@app/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/combineAll';
import 'rxjs/add/observable/of';
import { ToastrService } from 'ngx-toastr';
import { QueryEditorComponent } from '@app/features/report-details/query-editor/query-editor.component';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, OnDestroy {

  @Input()
  id: string;

  @Input()
  editable = true;

  loading = false;
  reportDefinition: QueryDefViewModel;
  selectedTab: string;

  @ViewChild(QueryEditorComponent)
  private queryComponent: QueryEditorComponent;

  private sub: any;

  public selectTab(tab) {
    this.selectedTab = tab.id;
  }

  constructor(private route: ActivatedRoute, private reportsService: ReportsService, private referenceDataService: ReferenceDataService, 
    private toastr: ToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.loading = true;
      const reportSubs = this.reportsService.getReportDefinition(this.id).subscribe( data => {
          this.reportDefinition = data;
          this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getStatus(): string {
    switch (this.reportDefinition.misQuery.statusID) {
      case 'RDY':
        return 'READY';
      case 'BTA':
        return 'BETA';
      case 'ALP':
        return 'ALPHA';
      default:
        return this.reportDefinition.misQuery.statusID.toUpperCase();
    }
  }

  getStatusClass(): string {
    switch (this.reportDefinition.misQuery.statusID) {
      case 'RDY':
        return 'success';
      case 'BTA':
        return 'info';
      case 'ALP':
        return 'warning';
      case 'OLD':
        return 'danger';
      default:
        return 'danger';
    }
  }

  validateQuery() {
    this.reportDefinition.sql = this.queryComponent.code;
    this.reportsService.validateReportDefinition(this.reportDefinition).subscribe(resp => {
      if (resp.errorMessage) {
        this.toastr.error(resp.errorMessage);
        return;
      }
      if (resp.paramsModified) {
        this.toastr.info('Parameters Modified');
      }
      if (resp.colsModified) {
        this.toastr.info('Columns Modified');
      }

      this.toastr.success('Validation OK');

      this.reportDefinition = resp.updatedDefinition;
    }, error => {
      this.toastr.error(JSON.stringify(error));
    });
  }
}
