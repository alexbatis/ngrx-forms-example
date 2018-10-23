import { CoursesActions } from './courses.reducer';
import { Student } from './../models/Student';
import { CourseSubject } from './../models/Course';
import { Action } from '@ngrx/store';
import { Course } from '../models/Course';

/*--------------------for local storage persistence/selection----------------------*/
export const COURSES_KEY = 'COURSES';
export const selectorOverview = state => state.overview;

/*--------------------ACTION TYPES----------------------*/
export enum CoursesActionTypes {
    ADD_COURSE = '[Courses] Add Course',
    EDIT_COURSE = '[Courses] Edit Course',
    DELETE_COURSE = '[Courses] Delete Course'
};

/*--------------------ACTION TYPE CLASSES----------------------*/
export class AddCourse implements Action {
    readonly type = CoursesActionTypes.ADD_COURSE;
    constructor(public courseToAdd: Course) { }
}

export class EditCourse implements Action {
    readonly type = CoursesActionTypes.EDIT_COURSE;
    constructor(public courseToEdit: Course) { }
}

export class DeleteCourse implements Action {
    readonly type = CoursesActionTypes.DELETE_COURSE;
    constructor(public courseIdToDelete: string) { }
}


/*--------------------ACTION TYPE IMPLEMENTATION----------------------*/
export type CoursesActions =
    | AddCourse
    | EditCourse
    | DeleteCourse;

/*--------------------STATE INTERFACE----------------------*/
// export interface CoursesState {
//     courses: Array<Course>
// };

/*--------------------INITIAL STATE DEFINITION----------------------*/
export const initialState: Array<Course> =
    [
        new Course({
            name: 'calculus',
            subject: CourseSubject.MATH,
            students: [
                new Student({
                    name: 'bobby'
                })
            ]
        })
    ]
    ;

/*--------------------REDUCER ----------------------*/
export function coursesReducer(
    state: Array<Course> = initialState,
    action: CoursesActions
): Array<Course> {
    switch (action.type) {
        case CoursesActionTypes.ADD_COURSE:
            return state.concat(action.courseToAdd);
            break;
        case CoursesActionTypes.EDIT_COURSE:
            return state.map(course => course.id === action.courseToEdit.id ? action.courseToEdit : course);
            break;
        case CoursesActionTypes.DELETE_COURSE:
            return state.filter(course => course.id !== action.courseIdToDelete);
            break;
        default:
            return state;
    }
};