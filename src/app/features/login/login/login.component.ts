import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  loading = false;
  showInvalidCredentialsAlert = false;
  loginForm: FormGroup;
  submitted = false;
  userName = '';
  password = '';

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.authService.login(this.userName, this.password).then(resp => {
        this.router.navigateByUrl('dashboard/reports').then(value => {
          this.loading = false;
        });
      }).catch(reason => {
        this.loading = false;
        this.toastr.error('Invalid user name or password');
    });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userName': new FormControl(this.userName, [
        Validators.required
      ]),
      'password': new FormControl(this.password),
    });
  }

  public closeInvalidCredentialsAlert() {
    this.showInvalidCredentialsAlert = false;
  }

  public showInvalidCredentilasAlert() {
    this.showInvalidCredentialsAlert = true;
  }
}
