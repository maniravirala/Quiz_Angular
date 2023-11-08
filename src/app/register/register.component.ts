import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showPassword: boolean = false;
  errorRequiredName: boolean = false;
  errorRequiredRegNo: boolean = false;
  errorRequiredPass: boolean = false;
  errorRequiredTandC: boolean = false;
  errorRequiredEmail: boolean = false;
  inputValue: string = '';

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      regNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      tandc: [false, Validators.requiredTrue],
    });
  }

  users: any = [];
  refreshUsers() {
    this.service.getUser().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  ngOnInit() {
    this.refreshUsers();
  }

  addUsers(
    name: string,
    password: string,
    email: string,
    regNo: number,
    tandc: boolean
  ) {
    this.service.addUser(name, password, email, regNo, tandc).then((res) => {
      console.log(res);
      this.refreshUsers();
    });
  }

  deleteUsers(id: string) {
    this.service.deletUser(id).then((res) => {
      console.log(res);
      this.refreshUsers();
    });
  }

  get name() {
    return this.registrationForm.get('name');
  }
  get regNo() {
    return this.registrationForm.get('regNo');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get tandc() {
    return this.registrationForm.get('tandc');
  }

  onSubmit() {
    if (this.registrationForm.value.name.trim() == '') {
      this.errorRequiredName = true;
    } else if (this.registrationForm.value.name.trim() != '') {
      this.errorRequiredName = false;
    }

    if (this.registrationForm.value.regNo.trim() == '') {
      this.errorRequiredRegNo = true;
    } else if (this.registrationForm.value.regNo.trim() != '') {
      this.errorRequiredRegNo = false;
    }

    if (this.registrationForm.value.email.trim() == '') {
      this.errorRequiredEmail = true;
    } else if (this.registrationForm.value.email.trim() != '') {
      this.errorRequiredEmail = false;
    }

    if (this.registrationForm.value.password.trim() == '') {
      this.errorRequiredPass = true;
    } else if (this.registrationForm.value.password.trim() != '') {
      this.errorRequiredPass = false;
    }

    if (this.registrationForm.value.tandc == false) {
      this.errorRequiredTandC = true;
    } else if (this.registrationForm.value.tandc == true) {
      this.errorRequiredTandC = false;
    }

    if (
      !this.errorRequiredName &&
      !this.errorRequiredRegNo &&
      !this.errorRequiredPass &&
      !this.errorRequiredEmail &&
      !this.errorRequiredTandC
    ) {
      // let name = this.registrationForm.value.name.trim();
      // let password = this.registrationForm.value.password.trim();
      // let email = this.registrationForm.value.email.trim();
      // let regNo = this.registrationForm.value.regNo.trim();
      // let tandc = this.registrationForm.value.tandc;
      // this.addUsers(name=name, password=password,email=email, regNo=regNo, tandc=tandc);
    }

    if (this.registrationForm.valid) {
      const { name, password, email, regNo, tandc } =
        this.registrationForm.value;
      

      // this.addUsers(name, password, email, regNo, tandc);
    } else {
      console.log('Invalid Form');
      return;
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password) {
      return null; // No error if the field is empty
    }

    // Define regular expressions for each required criteria
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[@$!%*?&]/;
    const minLengthRegex = /.{8,}/;

    // Check if each required criteria is met
    const hasLowercase = lowercaseRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);
    const hasMinLength = minLengthRegex.test(password);

    const missingCriteria = [];
    if (!hasLowercase) {
      missingCriteria.push('lowercase letters');
    }
    if (!hasUppercase) {
      missingCriteria.push('uppercase letters');
    }
    if (!hasDigit) {
      missingCriteria.push('digits');
    }
    if (!hasSpecialChar) {
      missingCriteria.push('special characters');
    }
    if (!hasMinLength) {
      missingCriteria.push('less than 8 characters');
    }

    if (missingCriteria.length > 0) {
      const errorMessage = `Password is missing ${missingCriteria.join(', ')}.`;
      return { requirements: errorMessage };
    }

    return null; // No error
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
