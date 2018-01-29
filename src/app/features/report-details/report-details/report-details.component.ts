import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService, QueryDefViewModel } from '@app/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, OnDestroy {

  @Input()
  id: number;

  @Input()
  editMode = false;

  loading = false;

  reportDefinition: QueryDefViewModel;

  private sub: any;

  constructor(private route: ActivatedRoute, private reportsService: ReportsService) { }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // dispatch action to load the details here.
      this.loading = true;
      this.reportsService.getReportDefinition(this.id.toString()).subscribe( data => {
        this.loading = false;
        this.reportDefinition = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
