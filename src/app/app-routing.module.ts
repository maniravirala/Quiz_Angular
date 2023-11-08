import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const redirectToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectTodashboard = () => redirectLoggedInTo(['/dashboard']);

const routes: Routes = [
  { path: 'register', component: RegisterComponent, ...canActivate(redirectTodashboard) },
  { path: 'login', component: LoginComponent, ...canActivate(redirectTodashboard)},
  { path: 'dashboard', component: DashboardComponent, ...canActivate(redirectToLogin)},
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
