import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit{
  constructor(
    private service: SharedService,
  ) { }

  quizzes: any[] 
  filteredQuizzes: any[]  // = this.quizzes; // Initially, show all quizzes
  searchQuery: string = '';


  testGetting() {
    this.service.getTest().subscribe((data) => {
      console.log(data);
      this.filteredQuizzes = data;
      this.quizzes = data;
    });
    }
    
  

  // quizzes = [
  //   { id: 1, title: 'Quiz 1', category: 'Science', difficulty: 'Easy' },
  //   { id: 2, title: 'Quiz 2', category: 'History', difficulty: 'Medium' },
  //   { id: 3, title: 'Quiz 3', category: 'Math', difficulty: 'Hard' },
  //   { id: 4, title: 'Quiz 4', category: 'Geography', difficulty: 'Medium' },
  //   { id: 5, title: 'Quiz 5', category: 'Literature', difficulty: 'Easy' },
  //   { id: 6, title: 'Quiz 6', category: 'Art', difficulty: 'Hard' },
  //   { id: 7, title: 'Quiz 7', category: 'Sports', difficulty: 'Medium' },
  //   { id: 8, title: 'Quiz 8', category: 'Music', difficulty: 'Easy' },
  //   { id: 9, title: 'Quiz 9', category: 'Technology', difficulty: 'Hard' },
  //   { id: 10, title: 'Quiz 10', category: 'Movies', difficulty: 'Medium' },
  // ];


  filterQuizzes() {
    const searchWords = this.searchQuery
      .toLowerCase()
      .split(' ')
      .filter((word) => word.trim() !== '');

    this.filteredQuizzes = this.quizzes.filter((quiz) => {
      const quizTitle = quiz.testName.toLowerCase().replace(/\s/g, '');
      return searchWords.every((word) => quizTitle.includes(word));
    });

    console.log(this.filteredQuizzes);
  }

  ngOnInit(): void {
    this.testGetting()
  }

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
}
