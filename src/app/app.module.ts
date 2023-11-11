import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthenticationService } from './services/authentication.service';
import { SharedService } from './shared.service';

import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { HotToastModule } from '@ngneat/hot-toast';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { QuiCreateComponent } from './qui-create/qui-create.component';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFirestoreModule } from '@angular/fire/firestore'; 
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireDatabaseModule } from '@angular/fire/database'; 
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    QuizComponent,
    ResultComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    PagenotfoundComponent,
    QuiCreateComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // AngularFireModule(() => initializeApp(firebaseConfig)),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireDatabaseModule
  ],
  providers: [SharedService, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
