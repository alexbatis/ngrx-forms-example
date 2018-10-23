import { Student } from "./Student"
import { v4 as uuid } from 'uuid';
import { JsonObject, JsonProperty } from "json2typescript";

export enum CourseSubject {
    MATH = "MATH",
    ENGLISH = "ENGL",
    HISTORY = "HIST"
}

interface ICourse {
    id?: string;
    name?: string;
    subject?: CourseSubject;
    students?: Array<Student>;
}

@JsonObject
export class Course {
    @JsonProperty("id", String)
    id: string;

    @JsonProperty("name", String)
    name: string;

    @JsonProperty("subject", String)
    subject: CourseSubject;

    @JsonProperty("students", [Student])
    students: Array<Student>;

    constructor(course?: ICourse) {
        this.id = course && course.id || uuid();
        this.name = course && course.name || null;
        this.subject = course && course.subject || null;
        this.students = course && course.students || new Array<Student>();
    }

    addStudent(student: Student) {
        this.students.push(student);
    }

    dropStudent(student: Student) {
        const studentIndex = this.students.findIndex(s => s.id == student.id);
        this.students.splice(studentIndex, 1);
    }
}