import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user = new User();
  public submissionArray: any;
  public submissionRequest: any;
  public userFullName: any;

  loginForm = new FormGroup({

    email: new FormControl(this.user.userEmail, Validators.compose([Validators.required, Validators.email])),
    password: new FormControl(this.user.userPassword, Validators.compose([Validators.required]))

  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private userloginservice: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit() {

    this.submissionArray = {};
    this.submissionArray['email'] = this.loginForm.value.email;
    this.submissionArray['password'] = this.loginForm.value.password;

    this.userloginservice.loginUser(this.submissionArray).subscribe({
      complete: () => { 
        // this.toastr.success('Data submmited succesfully');
      },
      error: (err) => { 
        this.toastr.error(err.error.error);
        this.loginForm.reset();
      },
      next: (data: any) => { 
        //console.log(data);
        this.userFullName = data.name.first + " " + data.name.last;
        this.toastr.success('Welcome '+ this.userFullName);
      } 
    });

    this.submissionArray = {};
    this.submissionArray['id'] = '645a2ff679840f137952daf9';

    this.userloginservice.getAllUserData(this.submissionArray).subscribe({
      complete: () => { 
        // this.toastr.success('Data submmited succesfully');
      },
      error: (err) => { 
        this.toastr.error(err.error.error);
      },
      next: (dataall: any) => { 
        console.log(dataall);
      } 
    });
  }
}
