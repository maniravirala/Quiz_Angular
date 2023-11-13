import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-qui-create',
  templateUrl: './qui-create.component.html',
  styleUrls: ['./qui-create.component.css'],
})
export class QuiCreateComponent {
  questionForm: FormGroup;
  currentQuestion: number = 0;
  totalMarks: number = 0;
  currentQuestionIndex: number = 0;
  totalQuestions: number = 0;
  correctAnswer: string;

  constructor(private fb: FormBuilder, private service: SharedService) {
    this.questionForm = this.fb.group({
      testName: ['untitled'],
      testId: [''],
      timeLimit: ['1hr 0min 0sec'],
      allowRetake: [false],
      questions: this.fb.array([this.createQuestionFormGroup()]),
    });
  }

  get questionControls() {
    return (this.questionForm.get('questions') as FormArray).controls;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionControls.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex >= 0) {
      this.currentQuestionIndex--;
    }
  }

  createQuestionFormGroup() {
    return this.fb.group({
      text: [''],
      options: this.fb.array([
        this.createOptionFormGroup(), // Initial two options
        this.createOptionFormGroup(),
        this.createOptionFormGroup(),
        this.createOptionFormGroup(),
      ]),
      correctAnswer: [null],
      userAnswer: [null],
    });
  }

  createOptionFormGroup() {
    return this.fb.control(''); // Create a Form Control instead of a FormGroup
  }

  addQuestion() {
    const newQuestion = this.createQuestionFormGroup();
    (this.questionForm.get('questions') as FormArray).push(newQuestion);
    this.nextQuestion();
    this.totalQuestions++;
  }

  deleteQuestion(index: number) {
    (this.questionForm.get('questions') as FormArray).removeAt(index);
    // this.previousQuestion();
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.previousQuestion();
    }
    this.totalQuestions--;
  }

  addOption(questionIndex: number) {
    const question = (this.questionForm.get('questions') as FormArray)
      .at(questionIndex)
      .get('options') as FormArray;
    question.push(this.createOptionFormGroup());
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    const question = (this.questionForm.get('questions') as FormArray).at(
      questionIndex
    ) as FormGroup;
    const options = question.get('options') as FormArray;
    options.removeAt(optionIndex);
  }

  getOptionControls(questionIndex: number) {
    const question = (this.questionForm.get('questions') as FormArray)
      .at(questionIndex)
      .get('options') as FormArray;
    return question.controls;
  }

  save() {
    // console.log(this.questionForm.value);

    this.service
      .addTest(
        this.questionForm.value.testName,
        this.questionForm.value.testId,
        this.questionForm.value.allowRetake,
        this.questionForm.value.timeLimit,
        this.questionForm.value.questions
      )
      .then((testId) => {
        console.log('Document written with ID: ', testId);
        // this.testGetting();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}
