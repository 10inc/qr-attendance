import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
var QRCode = require('qrcode.react');

import { studentService, alertService } from '@/_services';

function Details({ match }) {
    const { params:{ id } } = match
    const [student, setStudent] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        studentService.getById(id).then(result => {
            setStudent(result)
        })
    }, []);

    function emailQr() {
        setSubmitting(true)
        studentService.emailQr(id)
            .then(result => {
                alertService.success(result.message);
                setSubmitting(false)
            })
            .catch(error => {
                alertService.error("Something went wrong with sending the email");
                setSubmitting(false)
            })
    }

    return (
        <div>
            <h1>Student Details</h1>
            <p>
                <strong>ID: </strong> {student?.id}<br />
                <strong>Name: </strong> {student?.name}<br />
                <strong>Email: </strong> {student?.email}<br />
                <strong>Section: </strong> {student?.section}<br />
                <strong>Year: </strong> {student?.year}
            </p>
            <p><Link to={`edit/${id}`}>Update Profile</Link></p>

            <hr/>

            <h1>QR Code</h1>
            <p>
                <QRCode value={`${id}`} />
            </p>
            <button
                className="btn btn-sm btn-primary ml-1"
                onClick={emailQr}
                disabled={isSubmitting || !id}
            >
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Send QR to Student Email
            </button>
        </div>
    );
}

export { Details };