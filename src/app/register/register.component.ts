import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';

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
  errorRequiredCnfrmPass: boolean = false;
  errorRequiredTandC: boolean = false;
  errorRequiredEmail: boolean = false;
  inputValue: string = '';

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private service: SharedService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      regNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cnfrmpassword: ['', Validators.required],
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

  addUsers(name:string, password:string, email:string, regNo:number, tandc:boolean) {
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
    }else if (this.registrationForm.value.email.trim() != '') {
      this.errorRequiredEmail = false;
    }
    
    if (this.registrationForm.value.password.trim() == '') {
      this.errorRequiredPass = true;
    } else if (this.registrationForm.value.password.trim() != '') {
      this.errorRequiredPass = false;
    }

    if (this.registrationForm.value.cnfrmpassword.trim() == '') {
      this.errorRequiredCnfrmPass = true;
    } else if (this.registrationForm.value.cnfrmpassword.trim() != '') {
      this.errorRequiredCnfrmPass = false;
    }

    if (this.registrationForm.value.tandc == false) {
      this.errorRequiredTandC = true;
    } else if (this.registrationForm.value.tandc == true) {
      this.errorRequiredTandC = false;
    }

    if (
      this.registrationForm.value.password.trim() !=
      this.registrationForm.value.cnfrmpassword.trim()
    ) {
      this.errorRequiredCnfrmPass = true;
    }

    if (
      !this.errorRequiredName &&
      !this.errorRequiredRegNo &&
      !this.errorRequiredPass &&
      !this.errorRequiredEmail &&
      !this.errorRequiredCnfrmPass &&
      !this.errorRequiredTandC
    ) {
      let name = this.registrationForm.value.name.trim();
      let password = this.registrationForm.value.password.trim();
      let email = this.registrationForm.value.email.trim();
      let regNo = this.registrationForm.value.regNo.trim();
      let tandc = this.registrationForm.value.tandc;
      this.addUsers(name=name, password=password,email=email, regNo=regNo, tandc=tandc);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
