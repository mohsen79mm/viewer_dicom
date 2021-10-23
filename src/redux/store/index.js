import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "../reducers/index";
import thunk from "redux-thunk";


// import {createStore} from 'redux';
// import {localeReducer as locale, initialize, addTranslation} from 'react-localize-redux';

// import { getAllNaturals } from './../actions/naturals';
// import { getSinglePerson } from './../actions/person';
// import { getAllCourses } from "./../actions/courses";

export const store = createStore(
    // combineReducers({locale}),
    reducers,
    compose(
        applyMiddleware(thunk),

    )
);

// const languages = [
//     {name: 'English', code: 'en'},
//     {name: 'Русский', code: 'ru'}
// ];

// const translations = {
//     patient: {
//         id: ['Patient ID', 'Идентификатор пациента'],
//         patient: ['Patient', 'Пациент'],
//         patients: ['Patients', 'Пациенты'],
//         name: ['Patient Name', 'ФИО'],
//         age: ['Patient Age', 'Возраст'],
//         birthdate: ['Patient Birthdate', 'Дата рождения'],
//         gender: ['Patient Gender', 'Пол'],
//         anonymized: ['Anonymized', 'Анонимизирован'],
//         imagesCount: ['Images Count', 'Кол-во снимков']
//     },

//     study: {
//         study: ['Study', 'Обследование'],
//         studies: ['Studies', 'Обследования'],
//         id: ['Study ID', 'Идентификатор Обследования'],
//         date: ['Study Date', 'Дата проведения'],
//         description: ['Study Description', 'Описание'],
//         modality: ['Modality', 'Диагностическое оборудование'],
//         imagesCount: ['Images Count', 'Кол-во изображений'],
//         referringPhysician: ['Referring Physician', 'Главный врач'],

//     },

//     series: {
//         series: ['Series', 'Серия обследований'],
//         description: ['Description', 'Описание'],
//         modality: ['Modality', 'Диагностическое оборудование'],
//         bodyPartExamined: ['Body Part Examined', 'Часть тела'],
//         patientPosition: ['Patient Position', 'Положение пациента'],
//         seriesNumber: ['Series Number', 'Номер серии']
//     },

//     instance: ['Instance', 'Изображение'],
//     plugin: {
//         plugin: ['Plugin', 'Плагин'],
//         plugins: ['Plugins', 'Плагины'],
//         name: ['Name', 'Название'],
//         author: ['Author', 'Автор'],
//         version: ['Version', 'Версия'],
//         modalities: ['Modalities', 'Тип диагностики'],
//         tags: ['Tags', 'Теги']
//     },

//     dicomNode: {
//         dicomNodes: ['DICOM Servers', 'Сервера DICOM'],
//         name: ['Name', 'Название'],
//         protocol: ['Protocol', 'Протокол'],
//         aet: ['AET', 'AET'],
//         remoteAet: ['Remote AET', 'Удаленный AET'],
//         remoteHost: ['Remote Host', 'Удаленный хост'],
//         remotePort: ['Remote Port', 'Удаленный порт'],
//         add: ['Add', 'Добавить'],
//         echo: ['Echo', 'Проверить доступность'],
//         remoteUrl: ['Remote URL', 'Удаленный адрес'],
//         instancesUrl: ['Instances URL', 'Адрес ресурса с изображениями'],
//         instanceFileUrl: ['Instance File URL', 'Адрес изображения'],
//         download: ['Download images', 'Скачать изображения']
//     },

//     uploadDicom: {
//         uploadDicom: ['Upload images', 'Загрузить изображения']
//     },

//     auth: {
//         logOut: ['Log Out', 'Выйти']
//     },

//     translation: {
//         language: ['Language', 'Язык'],
//         changeLanguage: ['Change language', 'Сменить язык']
//     },
//     open: ['Open', 'Открыть'],
//     delete: ['Delete', 'Удалить'],
//     install: ['Install', 'Установить'],
//     success: ['Success', 'Успешно'],
//     fail: ['Fail', 'Неудачно'],
//     imagesCount: ['Images Count', 'Кол-во изображений']
// };


//Initialize
// store.dispatch(getSinglePerson("5"));
// store.dispatch(getAllLegals());

//subscribe
store.subscribe(() => console.log(store.getState()));