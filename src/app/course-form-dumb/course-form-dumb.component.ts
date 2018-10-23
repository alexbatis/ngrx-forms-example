/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

/*--------------------COMPONENT DEFINITION----------*/
@Component({
  selector: 'course-form-dumb',
  templateUrl: './course-form-dumb.component.html',
  styleUrls: ['./course-form-dumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/*-----------------------------------CLASS-----------------------------------*/
export class CourseFormDumbComponent {
  /*--------------------MEMBER VARIABLES------------*/
  @Input('formState')
  formState$: Observable<any>;

  @Output('submitAction')
  submitAction: EventEmitter<any> = new EventEmitter<any>();

  @Output('newStudentAction')
  newStudentAction: EventEmitter<any> = new EventEmitter<any>();

  @Output('resetFormAction')
  resetFormAction: EventEmitter<any> = new EventEmitter<any>();

  @Output('deleteCourseAction')
  deleteCourseAction: EventEmitter<any> = new EventEmitter<any>();

  /*--------------------FUNCTIONS-------------------*/
  addNewStudent() { this.newStudentAction.emit() }
  reset() { this.resetFormAction.emit() }
  deleteCourse() { this.deleteCourseAction.emit() }
  submit() { this.submitAction.emit() }
  trackByIndex(index: number) { return index }
}
