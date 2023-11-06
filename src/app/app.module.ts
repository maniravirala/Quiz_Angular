import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { SharedModule } from 'primeng/api';
import { SharedService } from './shared.service';

const firebaseConfig = {
  apiKey: "AIzaSyBJ78lDpmfbbQkXR3HO3C_e6oDkEK_ummI",
  authDomain: "quiz-angular-int219.firebaseapp.com",
  projectId: "quiz-angular-int219",
  storageBucket: "quiz-angular-int219.appspot.com",
  messagingSenderId: "204402302013",
  appId: "1:204402302013:web:2de432dbdb67e6c44c9e54",
  measurementId: "G-62XVK0K8NL"
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    QuizComponent,
    ResultComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
