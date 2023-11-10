import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizInfoUrl = './assets/quizInfo.json';

  constructor(private http: HttpClient) {}

  getQuizInfo() {
    return this.http.get(this.quizInfoUrl);
  }
}
