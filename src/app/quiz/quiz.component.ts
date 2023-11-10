import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit{
  testInfo = {
    testName: 'SampleTest',
    testId: '987654',
    allowRetake: false,
    timeLimit: '0hr 0min 20sec',
    questions: [
      {
        text: 'What is the capital of France?',
        options: ['London', 'Paris'],
        correctAnswer: 1,
        userAnswer: null
      },
      {
        text: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswer: 1,
        userAnswer: null
      },
    ]
  };

  showResults: boolean = false;
  currentQuestion: number = 0;
  totalMarks: number = this.testInfo.questions.length;
  timer: number = this.parseTimeToSeconds(this.testInfo.timeLimit);
  interval: any;

  selectAnswer(optionIndex: number) {
    this.testInfo.questions[this.currentQuestion].userAnswer = optionIndex;
  }

  nextQuestion() {
    if (this.currentQuestion < this.totalMarks - 1) {
      this.currentQuestion++;
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }
  retakeTest() {
    if (this.testInfo.allowRetake) {
      this.currentQuestion = 0;
      this.showResults = false;
      this.testInfo.questions.forEach(question => {
        question.userAnswer = null;
      });
    }
  }

  calculateMarks(): number {
    let marks = 0;
    for (const question of this.testInfo.questions) {
      if (question.userAnswer === question.correctAnswer) {
        marks++;
      }
    }
    return marks;
  }

  calculatePercentage(): number {
    const marks = this.calculateMarks();
    return (marks / this.totalMarks) * 100;
  }


  parseTimeToSecond(timeStr: string): number {
    let hours = 0;
    let minutes = 10;
    let seconds = 0;
    const timeArr = timeStr.split(' ');
    for (const time of timeArr) {
      const timeNum = parseInt(time);
      if (time.includes('hr')) {
        // seconds += timeNum * 3600;
        hours = timeNum;
      } else if (time.includes('min')) {
        // seconds += timeNum * 60;
        minutes = timeNum;
      }
      else if (time.includes('sec')) {
        // seconds += timeNum * 60;
        seconds = timeNum;
      }
    }
    return hours + minutes + seconds;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.showResults = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  parseTimeToSeconds(timeStr: string): number {
    let seconds = 0;
    const timeArr = timeStr.split(' ');
    timeArr.forEach((time) => {
      if (time.includes('hr')) {
        seconds += parseInt(time) * 3600;
      } else if (time.includes('min')) {
        seconds += parseInt(time) * 60;
      } else if (time.includes('sec')) {
        seconds += parseInt(time);
      }
    });
    return seconds;
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursDisplay = hours > 0 ? hours + ' hour' + (hours > 1 ? 's ' : ' ') : '';
    const minutesDisplay = minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's ' : ' ') : '';
    const secondsDisplay = remainingSeconds > 0 ? remainingSeconds + ' second' + (remainingSeconds > 1 ? 's' : '') : '';

    return hoursDisplay + minutesDisplay + secondsDisplay;
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
