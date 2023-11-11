import { ResolveFn } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SharedService } from '../shared.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizDataResolver implements Resolve<any> {
  constructor(private service: SharedService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const testId = route.paramMap.get('id');
    const test = this.service.getTestById(testId);       
    return test;
  }
  
}
