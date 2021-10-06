import { combineReducers } from "redux";
// import { legalsReducer } from './legals';
// import { naturalReducer } from './naturals';
// import { personReducer } from './person';
// import { caseReducer } from "./caseone";
// import { reportItemReducer } from "./reportItems";
// import { reportPersonReducer } from "./reportPerson";
// import {localeReducer as locale, initialize, addTranslation} from 'react-localize-redux';
import {imageReducer} from './image';


export const reducers = combineReducers({
    // locale:locale,
    imageReducer:imageReducer,


    // person: personReducer,
    // reportperson: reportPersonReducer,
    // reportitem: reportItemReducer,
    // caseone: caseReducer,



});