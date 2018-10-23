// import { metaReducers } from './app.reducers';
import { NgrxFormsModule } from 'ngrx-forms';
import { MaterialModule } from './material/material.module';
import { CourseFormDumbComponent } from './course-form-dumb/course-form-dumb.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { StoreModule, ActionReducer, State, MetaReducer } from '@ngrx/store';
import { CoursesComponent } from './courses/courses.component';
import { coursesReducer } from './courses/courses.reducer';
import { CourseFormSmartComponent } from './course-form-smart/course-form-smart.component';
import { courseFormReducer } from './course-form-smart/course-form.reducer';
import { metaReducers } from './app.reducers';



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseFormDumbComponent,
    CourseFormSmartComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forRoot(
      {},
      { metaReducers }
    ),
    StoreModule.forFeature("courses", coursesReducer),
    StoreModule.forFeature('courseForm', courseFormReducer),
    MaterialModule,
    NgrxFormsModule,
    BrowserModule,
    BrowserAnimationsModule
    // CourseFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
