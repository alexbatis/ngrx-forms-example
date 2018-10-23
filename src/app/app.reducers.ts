import { localStorageSync } from 'ngrx-store-localstorage';
import { MetaReducer, ActionReducer, State } from '../../node_modules/@ngrx/store';
import { Course, CourseSubject } from './models/Course';
import { JsonConvert, ValueCheckingMode } from '../../node_modules/json2typescript';
import { Student } from './models/Student';


function deserialize<T>(jsonObj: Object, type: any): T {
    const jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.ignorePrimitiveChecks = false; // don"t allow assigning number to string etc.
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL; // allow null
    let deserializedObj: T;
    try {
        deserializedObj = jsonConvert.deserialize(jsonObj, type);
        return deserializedObj;
    } catch (e) {
        console.error(<Error>e);
        return e;
    }
}

// deserialize a json array object into an array of type T
function deserializeArray<T>(jsonArray: Object[], type: any): Array<T> {
    const jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.ignorePrimitiveChecks = false; // don"t allow assigning number to string etc.
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL; // allow null
    let deserializedArray: Array<T>;
    try {
        deserializedArray = jsonConvert.deserializeArray(jsonArray, type);
        return deserializedArray;
    } catch (e) {
        console.error(<Error>e);
        throw (e);
    }
}



function courseDeserializer(storedState: any): Array<any> {
    return deserializeArray<Course>(storedState, Course);
}

function courseSerializer(state: any): any {
    return { user: state.user }
}



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