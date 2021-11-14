import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
var QRCode = require('qrcode.react');

import { studentService } from '@/_services';

function Details({ match }) {
    console.log(match)
    const { path, params:{ id } } = match
    const [student, setStudent] = useState({});

    useEffect(() => {
        studentService.getById(id).then(result => {
            setStudent(result)
        })
    }, []);

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
            <p><Link to={`${path}/update`}>Update Profile</Link></p>

            <hr/>

            <h1>QR Code</h1>
            <p>
                <QRCode value={`${student?.id}`} />
            </p>
        </div>
    );
}

export { Details };