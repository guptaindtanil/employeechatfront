import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../models/user.model';
import { SignupService } from '../services/signup.service';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user = new User();
  public submissionArray: any;
  public submissionRequest: any;

  signupForm = new FormGroup({

    firstName: new FormControl(this.user.firstName, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(3)])),
    lastName: new FormControl(this.user.lastName, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(3)])),
    phoneNumber: new FormControl(this.user.phoneNumber, Validators.compose([Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")])),
    userEmail: new FormControl(this.user.userEmail, Validators.compose([Validators.required, Validators.email])),
    userPassword: new FormControl(this.user.userPassword, Validators.compose([Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]))

  });

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get phoneNumber() { return this.signupForm.get('phoneNumber'); }
  get userEmail() { return this.signupForm.get('userEmail'); }
  get userPassword() { return this.signupForm.get('userPassword'); }

  constructor(
    private usersignupservices: SignupService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit() {

    this.submissionArray = {};
    this.submissionArray['firstName'] = this.signupForm.value.firstName;
    this.submissionArray['lastName'] = this.signupForm.value.lastName;
    this.submissionArray['phonenumber'] = this.signupForm.value.phoneNumber;
    this.submissionArray['email'] = this.signupForm.value.userEmail;
    this.submissionArray['password'] = this.signupForm.value.userPassword;

    this.usersignupservices.registerUser(this.submissionArray).subscribe({
      complete: () => { 
        this.toastr.success('Data submmited succesfully');
      },
      error: (err) => { 
        this.toastr.error(err.error.error);
        this.signupForm.reset();
      },
      next: (data: any) => { 
        console.log(data);
        this.router.navigateByUrl('/login');
      } 
    });
  }
}
