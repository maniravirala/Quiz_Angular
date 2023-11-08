import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
=======
>>>>>>> 8f8e30b1723a3749fd54a28ede9bb0d22ed0d741

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'dashboard', component: DashboardComponent},
=======
>>>>>>> 8f8e30b1723a3749fd54a28ede9bb0d22ed0d741
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
