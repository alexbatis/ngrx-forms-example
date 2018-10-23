import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormSmartComponent } from './course-form-smart.component';

describe('CourseFormSmartComponent', () => {
  let component: CourseFormSmartComponent;
  let fixture: ComponentFixture<CourseFormSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFormSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
