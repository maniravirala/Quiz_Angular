import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiCreateComponent } from './qui-create.component';

describe('QuiCreateComponent', () => {
  let component: QuiCreateComponent;
  let fixture: ComponentFixture<QuiCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuiCreateComponent]
    });
    fixture = TestBed.createComponent(QuiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
