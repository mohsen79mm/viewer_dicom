import React from 'react';
import ReactDOM from 'react-dom';
// import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
// import {localeReducer as locale, initialize, addTranslation} from 'react-localize-redux';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import StudiesPage from "./pages/StudiesPage";
import StudySeriesPage from "./pages/StudySeriesPage";
import 'semantic-ui-css/semantic.css';
import PatientsPage from "./pages/PatientsPage";
import PluginsPage from "./pages/PluginsPage";
import SeriesViewerPage from "./pages/SeriesViewerPage";
import LoginPage from "./pages/LoginPage";
import DicomNodesPage from "./pages/DicomNodesPage";
import UploadDicomPage from "./pages/UploadDicomPage";
import ProcessingPage from "./pages/ProcessingPage";
import PatientStudiesPage from "./pages/PatientStudies";
import {store} from './redux/store/index';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            
            <Switch>

                <Route exact path='/studies' component={StudiesPage}/>
                <Route path='/patient/:id/studies' component={PatientStudiesPage}/>
                <Route path='/patients' component={PatientsPage}/>
                <Route path='/studies/:id' component={StudySeriesPage}/>
                <Route path='/plugins' component={PluginsPage}/>
                <Route path='/dicom_nodes' component={DicomNodesPage}/>
                <Route path='/series' component={SeriesViewerPage}/>
                <Route path='/remote/:serverId/series/:id' component={SeriesViewerPage}/>
                <Route path='/dicom/upload' component={UploadDicomPage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/instances/:instanceId/process/:pluginId' component={ProcessingPage}/>
                <Route path='/remote/:serverId/instances/:instanceId/process/:pluginId' component={ProcessingPage}/>
                <Route exact path='/' component={StudiesPage}/>
            </Switch>
            
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
