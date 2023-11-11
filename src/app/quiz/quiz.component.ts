import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quizData: any;

  constructor(
    private service: SharedService,
    private toast: HotToastService,
    private route: ActivatedRoute
  ) {}

  // testInfo = {
  //   testName: 'CA4PEV114D',
  //   testId: '98667',
  //   allowRetake: true,
  //   timeLimit: '0hr 1min 5sec',
  //   questions: [
  //     {
  //       text: 'What is the capital of France?',
  //       options: ['London', 'Paris'],
  //       correctAnswer: 1,
  //       userAnswer: null,
  //     },
  //     {
  //       text: 'Who painted the Mona Lisa?',
  //       options: [
  //         'Vincent van Gogh',
  //         'Leonardo da Vinci',
  //         'Pablo Picasso',
  //         'Michelangelo',
  //       ],
  //       correctAnswer: 1,
  //       userAnswer: null,
  //     },
  //   ],
  // };

  // testAdding() {
  //   this.service
  //     .addTest(
  //       this.testInfo.testName,
  //       this.testInfo.testId,
  //       this.testInfo.allowRetake,
  //       this.testInfo.timeLimit,
  //       this.testInfo.questions
  //     )
  //     .then((testId) => {
  //       console.log('Document written with ID: ', testId);
  //       // this.testGetting();
  //     })
  //     .catch((error) => {
  //       console.error('Error adding document: ', error);
  //     });
  // }

  // testGetting() {
  //   return this.service.getTest();
  // }

  showResults: boolean = false;
  showModal: boolean = false;
  currentQuestion: number = 0;
  totalMarks: number;
  timer: number;
  interval: any;
  alreadyAdded: boolean = false;

  // testName: string = '';
  // testId: string = '';
  // allowRetake: boolean = true;
  // timeLimit: string = '';
  // questions: any = [];

  // getQue() {
  //   this.testGetting().subscribe((data) => {
  //     const testData = data.find((test) => test.id === '98667');
  //     if (testData) {
  //       // this.questions = testData['questions'];
  //       // this.testName = testData['testName'];
  //       // this.testId = testData['testId'];
  //       // this.allowRetake = testData['allowRetake'];
  //       // this.timeLimit = testData['timeLimit'];
  //       // this.totalMarks = this.questions.length;
  //       // this.timer = this.parseTimeToSeconds(this.timeLimit);
  //     }
  //   });
  // }

  selectAnswer(optionIndex: number) {
    this.quizData.questions[this.currentQuestion].userAnswer = optionIndex;
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
    if (this.quizData.allowRetake) {
      this.currentQuestion = 0;
      this.timer = this.parseTimeToSeconds(this.quizData.timeLimit);
      this.showResults = false;
      this.quizData.questions.forEach((question) => {
        question.userAnswer = null;
      });
    }
  }

  calculateMarks(): number {
    let marks = 0;
    for (const question of this.quizData.questions) {
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

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.showResults = true;
        // this.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.interval);
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

    const hoursDisplay = hours > 0 ? hours + ':' : '';
    const minutesDisplay =
      minutes > 0
        ? minutes < 10
          ? '0' + minutes + ':'
          : minutes + ':'
        : hours > 0
        ? '00:'
        : '';
    const secondsDisplay =
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return hoursDisplay + minutesDisplay + secondsDisplay;
  }

  ngOnInit() {
    this.startTimer();
    // this.getQue();
    // this.testAdding();
    this.route.data.subscribe((data) => {
      this.quizData = data['quizData'];
      this.totalMarks = this.quizData.questions.length;
      this.timer = this.parseTimeToSeconds(this.quizData.timeLimit);
  });
}

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
