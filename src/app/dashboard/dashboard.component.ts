import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('joinCodeInput') joinCodeInput!: ElementRef;


  user$ = this.authService.currentUser$;
  constructor(private authService: AuthenticationService, private router: Router) { }

  joinQuiz() {
    console.log(this.joinCodeInput);
    this.router.navigate(['/quiz',this.joinCodeInput['nativeElement'].value]);
  }
}
