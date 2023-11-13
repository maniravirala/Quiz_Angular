import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { QuizDataResolver } from './resolver/quiz-data.resolver';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { QuiCreateComponent } from './qui-create/qui-create.component';
import { QuizIdComponent } from './quiz-id/quiz-id.component';
import { AboutComponent } from './about/about.component';

const redirectToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectTodashboard = () => redirectLoggedInTo(['/dashboard']);

const routes: Routes = [
  { path: 'register', component: RegisterComponent, ...canActivate(redirectTodashboard) },
  { path: 'login', component: LoginComponent, ...canActivate(redirectTodashboard)},
  { path: 'dashboard', component: DashboardComponent, ...canActivate(redirectToLogin)},
  { path: 'quiz', component: QuizComponent, ...canActivate(redirectToLogin)},
  { path: 'result', component: ResultComponent, ...canActivate(redirectToLogin) },
  { path: 'create_quiz', component: QuiCreateComponent, ...canActivate(redirectToLogin)},
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'quiz/:id', component: QuizIdComponent, resolve:{quizData: QuizDataResolver}},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
