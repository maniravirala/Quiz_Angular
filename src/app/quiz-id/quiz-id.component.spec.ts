import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizIdComponent } from './quiz-id.component';

describe('QuizIdComponent', () => {
  let component: QuizIdComponent;
  let fixture: ComponentFixture<QuizIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizIdComponent]
    });
    fixture = TestBed.createComponent(QuizIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
