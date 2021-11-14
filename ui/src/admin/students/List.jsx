import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { studentService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [students, setStudents] = useState(null);

    useEffect(() => {
        studentService.getAll().then(x => setStudents(x));
    }, []);

    function deleteStudent(id) {
        setStudents(students.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        studentService.delete(id).then(() => {
            setStudents(students => students.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Students</h1>
            <p>List of Students</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Student</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Section</th>
                        <th style={{ width: '30%' }}>Year</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {students && students.map(student =>
                        <tr key={student.id}>
                            <td>
                                <Link to={`${path}/${student.id}`}>{student.name}</Link>
                            </td>
                            <td>{student.email}</td>
                            <td>{student.section}</td>
                            <td>{student.year}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/${student.id}`} className="btn btn-sm btn-success mr-1">Details</Link>
                                <Link to={`${path}/edit/${student.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteStudent(student.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={student.isDeleting}>
                                    {student.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!students &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };