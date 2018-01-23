import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from "@app/core";

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {

  @Input()
  id: number;

  loading = false;

  private sub: any;

  constructor(private route: ActivatedRoute, private reportsService: ReportsService) { }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // dispatch action to load the details here.
      this.loading = true;
      this.reportsService.getReportsTree().subscribe( data => {
        this.loading = false;
        //this.results = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
