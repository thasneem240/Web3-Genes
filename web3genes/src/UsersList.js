import React, { useState, useEffect } from 'react';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const columnStyle = {
        padding: '0 30px',
        border: '1px solid black',
        backgroundColor: '#e6e6fa'
    };

    const rowStyle = {
        padding: '0 30px',
        border: '1px solid black'
    };

    const pageStyle = {
        margin: 'auto',
        width: '80%'
    };

    // Function to format the date as YYYY/MM/DD
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('ja-JP', options).format(date);
    };

    return (
        <div style={pageStyle}>
            <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>Users List</h1>
            <table>
                <thead>
                    <tr>
                        <th style={columnStyle}>First Name</th>
                        <th style={columnStyle}>Last Name</th>
                        <th style={columnStyle}>Date of Birth</th>
                        <th style={columnStyle}>Gender</th>
                        <th style={columnStyle}>Contact Number</th>
                        <th style={columnStyle}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={rowStyle}>{user.basic_info.first_name}</td>
                            <td style={rowStyle}>{user.basic_info.last_name}</td>
                            <td style={rowStyle}>{formatDate(user.basic_info.dob)}</td>
                            <td style={rowStyle}>{user.basic_info.gender}</td>
                            <td style={rowStyle}>{user.contact_info.mobile_number}</td>
                            <td style={rowStyle}>{user.contact_info.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;