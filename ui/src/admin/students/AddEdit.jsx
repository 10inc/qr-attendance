import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { studentService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        name: '',
        section: '',
        year: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        section: Yup.string()
            .required('Section is required'),
        year: Yup.string()
            .required('Year is required'),
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createStudent(fields, setSubmitting);
        } else {
            updateStudent(id, fields, setSubmitting);
        }
    }

    function createStudent(fields, setSubmitting) {
        studentService.create(fields)
            .then(() => {
                alertService.success('Student added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateStudent(id, fields, setSubmitting) {
        studentService.update(id, fields)
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
                        // get student and set form fields
                        studentService.getById(id).then(student => {
                            const fields = ['name', 'section', 'year'];
                            fields.forEach(field => setFieldValue(field, student[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Student' : 'Edit Student'}</h1>
                        <div className="form-group col-7">
                            <label>Name</label>
                            <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group col-7">
                            <label>Section</label>
                            <Field name="section" type="text" className={'form-control' + (errors.section && touched.section ? ' is-invalid' : '')} />
                            <ErrorMessage name="section" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group col-7">
                            <label>Year</label>
                            <Field name="year" type="text" className={'form-control' + (errors.year && touched.year ? ' is-invalid' : '')} />
                            <ErrorMessage name="year" component="div" className="invalid-feedback" />
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