import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper } from '@/_helpers';

const eventSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/events`;

export const eventService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    student: eventSubject.asObservable(),
    get studentValue () { return studentSubject.value },
    attend
};

// TODO: Can be a generic CRUD service
function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

// Other
function attend(id, student_id) {
    return fetchWrapper.post(`${baseUrl}/${id}/attend/${student_id}`, {});
}
