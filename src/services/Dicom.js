import axiosInstance from "./axios";
// import config from './config.json';
// instances
export const facebook = () => {
    return axiosInstance.get(``);
};
export const findPatients = (params) => {
    return axiosInstance.get(`patients/?${params}`);
};
export const findStudies = () => {
    return axiosInstance.get(`studies/`);


}

export const findStudiesByPatient = (patientId) => {
    return axiosInstance.get(`patients/${patientId}/studies`);
};
export const findStudyById = (studyId) => {
    return axiosInstance.get(`studies/${studyId}`);
};
export const findSeries = () => {
    return axiosInstance.get(`series/`);
};
export const findInstances = () => {
    return axiosInstance.get(`instances/`);
};
export const findStudiesByPatientId = (patientId) => {
    return axiosInstance.get(`patients/${patientId}/studies`);
};
export const findSeriesByStudyId = (studyId) => {
    return axiosInstance.get(`studies/${studyId}/series`);
};
export const findInstancesBySeriesId = (seriesId) => {
    return axiosInstance.get(`series/${seriesId}/instances`);
};
export const findInstancesById = (instanceId) => {
    return axiosInstance.get(`instances/${instanceId}`);
};
export const findTagsByInstanceId = (instanceId) => {
    return axiosInstance.get(`instances/${instanceId}/tags`);
};
export const findImagesByInstanceId = (instanceId) => {
    return axiosInstance.get(`instances/${instanceId}/image`);
};