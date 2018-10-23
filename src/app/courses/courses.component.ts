/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { Component, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
//NgRx
import { select, Store } from '@ngrx/store';
/*--------------------CUSTOM------------------------*/
import { Course } from '../models/Course';

/*--------------------COMPONENT DEFINITION----------*/
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
/*-----------------------------------CLASS-----------------------------------*/
export class CoursesComponent {
  /*--------------------MEMBER VARIABLES------------*/
  coursesState$: Observable<Array<Course>>;

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(private store: Store<any>) { this.coursesState$ = store.pipe(select(s => s.courses)); }

  /*needed to prevent onBlur from being fired for each keystroke for any form
  inside of the ngFor as these are re-rendered each time the value changes */
  trackByIndex(index: number) { return index }
}
