import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  showInvalidCredentialsAlert = false;
  loginForm: FormGroup;
  submitted = false;
  userName = '';
  password = '';

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.userName, this.password).then(resp => {
      alert(resp);
    }).catch(reason => {
      // alert(reason);

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
