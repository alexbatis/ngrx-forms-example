/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
//NgRx
import { select, Store } from '@ngrx/store';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters, ResetAction, SetValueAction } from 'ngrx-forms';
/*--------------------CUSTOM------------------------*/
import { AddCourse, EditCourse, DeleteCourse } from './../courses/courses.reducer';
import { INITIAL_STATE, InitializeCourseFormAction, CourseFormValue, SetSubmittedValueAction, AddStudentFormAction } from './course-form.reducer'
import { Course } from '../models/Course';

/*--------------------COMPONENT DEFINITION----------*/
@Component({
  selector: 'app-course-form-smart',
  templateUrl: './course-form-smart.component.html',
  styleUrls: ['./course-form-smart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/*-----------------------------------CLASS-----------------------------------*/
export class CourseFormSmartComponent implements OnInit {
  /*--------------------MEMBER VARIABLES------------*/
  coursesState$: Observable<Array<Course>>; //defined courses
  formState$: Observable<FormGroupState<CourseFormValue>>; //course form
  submitAction: any;

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router) {
    this.formState$ = store.pipe(select(s => s.courseForm));
    this.coursesState$ = store.pipe(select(s => s.courses));
  }

  /*--------------------LIFECYCLE HOOKS-------------*/
  ngOnInit() {
    // check to see if were adding a course or editing a course based on route params
    this.route.params
      .pipe(take(1))
      .subscribe(params => {
        const courseID = params['courseID'] || null; // id of course to be edited 
        if (!courseID) {
          this.store.dispatch(new InitializeCourseFormAction()); // adding course, initialize form with empty course
          this.submitAction = this.addCourse;
          return;
        }
        else {
          this.coursesState$
            .pipe(take(1))
            .subscribe(courses => {
              let course = courses.find(c => c.id == courseID);
              if (course) {
                this.store.dispatch(new InitializeCourseFormAction(course)); // editing course, initialize form with course
                this.submitAction = this.editCourse;
              }
              else {
                alert(`could not find form with id ${courseID}. redirecting to courses page.`);
                this.router.navigate(['/courses']);
              }
            });
        }
      });
  }

  /*--------------------FUNCTIONS-------------------*/
  addNewStudent() { this.store.dispatch(new AddStudentFormAction()) }

  addCourse(event) {
    this.submitForm().subscribe(submittedValueAction => {
      const courseToAdd: Course = new Course(submittedValueAction.submittedValue);
      this.store.dispatch(new AddCourse(courseToAdd));
      this.router.navigate(['/courses']);
    });
  }

  editCourse() {
    this.submitForm().subscribe(submittedValueAction => {
      const courseToEdit: Course = new Course(submittedValueAction.submittedValue);
      this.store.dispatch(new EditCourse(courseToEdit));
      this.router.navigate(['/courses']);
    });
  }

  resetForm() {
    this.store.dispatch(new InitializeCourseFormAction()); // adding course, initialize form with empty course
    this.store.dispatch(new ResetAction(INITIAL_STATE.id));
  }

  submitForm(): Observable<SetSubmittedValueAction> {
    return this.formState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => new SetSubmittedValueAction(fs.value)),
    )
  }

  deleteCourse() {
    this.formState$
      .pipe(take(1))
      .subscribe(formValue => {
        const courseIdToDelete = formValue.value.id;
        this.store.dispatch(new DeleteCourse(courseIdToDelete));
        this.router.navigate(['/courses']);
      });
  }

  /*needed to prevent onBlur from being fired for each keystroke for any form
  inside of the ngFor as these are re-rendered each time the value changes */
  trackByIndex(index: number) { return index }

}
