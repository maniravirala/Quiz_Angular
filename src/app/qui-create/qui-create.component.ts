import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-qui-create',
  templateUrl: './qui-create.component.html',
  styleUrls: ['./qui-create.component.css'],
})
export class QuiCreateComponent {
  questionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      testName: [''],
      testId: [''],
      timeLimit: [''],
      allowRetake: [false],
      questions: this.fb.array([]),
    });
  }

  get questionControls() {
    return (this.questionForm.get('questions') as FormArray).controls;
  }

  createQuestionFormGroup() {
    return this.fb.group({
      text: [''],
      options: this.fb.array([
        this.createOptionFormGroup(), // Initial two options
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
  }

  deleteQuestion(index: number) {
    (this.questionForm.get('questions') as FormArray).removeAt(index);
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
    console.log(this.questionForm.value);
    // Implement logic to handle form data submission
  }
}
