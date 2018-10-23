import { v4 as uuid } from 'uuid';
import { JsonObject, JsonProperty } from '../../../node_modules/json2typescript';

interface IStudent {
    id?: string;
    name?: string;
}

@JsonObject
export class Student {
    @JsonProperty("id", String)
    public id: string;

    @JsonProperty("name", String)
    public name: string;

    constructor(student?: IStudent) {
        this.id = student && student.id || uuid();
        this.name = student && student.name || null;
    }
}