# ngrx-forms-example

Complex example of [ngrx-forms](https://github.com/MrWolfZ/ngrx-forms) library usage with Angular 6.0.3. Example includes strongly typed form models, dynamic form construction/validation, client side state caching using [ngrx-store-localstorage](https://github.com/btroncone/ngrx-store-localstorage), and a demonstration of how to use smart(controller)/dumb(presentation) components.

The example consists of a form that lets you create/read/update/delete a 'course'. A course has some information about the course, then an array of students that are enrolled in the course. Both the Course and Student objects are custom object types. The form lets you dynamically add enrolled students to the course, providing on the fly form validation for the newly appended student forms.

### Features

- ##### Strongly typed form models
    - see _models/Course.ts_ and _models/Student.ts_
- ##### Dynamic form construction/validation
    - see _course-form.reducer.ts_
```typescript
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
```
- ##### Client side state caching
    - see _app.reducers.ts_
```typescript
export function localStorageSyncReducer(reducer: ActionReducer<State<any>>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            { courses: { deserialize: courseDeserializer } },
            { courseForm : {}}
        ],
        rehydrate: true,
        removeOnUndefined: true
    })(reducer);
}
export const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];
```
- ##### Dumb and Smart Components
    - The idea is to seperate concerns from the presentation of data and the manipulation of data 
    - **Dumb components** used only for presentation - functionality is injected (using @Input/@Output)
    - see _CourseFormDumbComponent_
```typescript
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
```
  
- **Smart components** used for actual functionality
    - see _CourseFormSmartComponent_
     
    
```html
<course-form-dumb 
  [formState]="formState$"
  (submitAction)="submitAction($event)"
  (newStudentAction)="addNewStudent($event)"
  (resetFormAction)="resetForm($event)"
  (deleteCourseAction)="deleteCourse($event)"
  ></course-form-dumb>
```

### Installation


Install the dependencies and devDependencies and start the server.

```sh
$ cd ngrx-forms-example
$ npm install
$ ng serve
```

License
----

MIT

