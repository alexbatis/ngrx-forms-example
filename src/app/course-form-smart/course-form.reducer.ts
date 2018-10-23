import { Course, CourseSubject } from '../models/Course';
import { StudentFormValue } from './course-form.reducer';
import { Action, compose } from '@ngrx/store';
import {
    createFormGroupState,
    updateGroup,
    validate,
    updateArray,
    formGroupReducer,
    addArrayControl
} from 'ngrx-forms';
import { required, minLength } from 'ngrx-forms/validation';
import { Student } from '../models/Student';

export interface StudentFormValue {
    id: string;
    name: string;
}

export interface CourseFormValue {
    id: string;
    name: string;
    subject: CourseSubject;
    students: Student[]
}

export class SetSubmittedValueAction implements Action {
    static readonly TYPE = 'courses/SET_SUBMITTED_VALUE';
    readonly type = SetSubmittedValueAction.TYPE;
    constructor(public submittedValue: CourseFormValue) { }
}

export class InitializeCourseFormAction implements Action {
    static readonly TYPE = 'courses/INITIALIZE_COURSE_FORM';
    readonly type = InitializeCourseFormAction.TYPE;
    constructor(public initialValue?: CourseFormValue) { }
}

export class AddStudentFormAction implements Action {
    static readonly TYPE = 'courses/ADD_STUDENT';
    readonly type = AddStudentFormAction.TYPE;

    constructor() { }
}

type CourseFormActions =
    | InitializeCourseFormAction
    | AddStudentFormAction
    | SetSubmittedValueAction
    ;

const HEAT_IS_REQUIRED_PROPERTY = 'heatIsRequired';
const COURSE_FORM_ID = 'COURSE_FORM';

const initialCourse = new Course();

export const INITIAL_STATE = createFormGroupState<CourseFormValue>(COURSE_FORM_ID,
    initialCourse
);

export function courseFormReducer(state = INITIAL_STATE, action: CourseFormActions) {
    const validateForm = updateGroup<CourseFormValue>({
        name: validate(required, minLength(4)),
        subject: validate(required),
        students: compose(
            validate<Array<Student>>(minLength(1)),
            updateArray(
                updateGroup<Student>({
                    id: validate(required),
                    name: validate(required, minLength(3))
                })
            ))
    });

    switch (action.type) {
        case InitializeCourseFormAction.TYPE:
            const course = action.initialValue || new Course();
            return createFormGroupState<CourseFormValue>(COURSE_FORM_ID, course);
            break;
        case SetSubmittedValueAction.TYPE:
            return action.submittedValue;
            break;
        case AddStudentFormAction.TYPE:
            return updateGroup<CourseFormValue>(state, {
                students: addArrayControl<Student>(new Student())
            });
            break;
        default:
            state = formGroupReducer(state, action);
    }

    return validateForm(state);
}

// addArrayControl<StudentFormValue>(new Student())