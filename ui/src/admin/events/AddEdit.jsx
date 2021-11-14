import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { eventService, alertService, studentService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        name: '',
        date: '',
        attendees: []
    };

    const [attendeeOptions, setAttendeeOptions] = useState([]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        date: Yup.date()
            .required('Date is invalid'),
        attendees: Yup.array()
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createEvent(fields, setSubmitting);
        } else {
            updateEvent(id, fields, setSubmitting);
        }
    }

    function createEvent(fields, setSubmitting) {
        eventService.create(fields)
            .then(() => {
                alertService.success('Event added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateEvent(id, fields, setSubmitting) {
        eventService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        eventService.getById(id).then(event => {
                            const fields = ['name', 'date', 'attendees'];
                            fields.forEach(field => setFieldValue(field, event[field], false));
                        });
                    }
                    studentService.getAll().then(students => setAttendeeOptions(students))
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Event' : 'Edit Event'}</h1>
                        <div className="form-group col-7">
                            <label>Name</label>
                            <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group col-7">
                            <label>Date</label>
                            <Field name="date" type="date" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} />
                            <ErrorMessage name="date" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group col-7">
                            <label>Attendees (Temp until QR)</label>
                            <Field as="select" name="attendees" multiple className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')}  >
                                {attendeeOptions && attendeeOptions.map((option, i) => (
                                    <option key={'attendee_option_'+i} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </Field>
                        </div>

                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export { AddEdit };