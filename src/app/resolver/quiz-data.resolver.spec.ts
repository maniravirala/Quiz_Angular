import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quizDataResolver } from './quiz-data.resolver';

describe('quizDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => quizDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
