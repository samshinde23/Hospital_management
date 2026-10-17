// src/components/RegisteredUsers.jsx
import React, { useEffect, useState } from "react";

const RegisteredUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the registered users from the backend
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5002/RegisteredUser');
                if (!response.ok) {
                    throw new Error('Error fetching users');
                }
                const data = await response.json();
                setUsers(data);  // Set the fetched users in state
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);  // Empty dependency array to run only once when the component mounts

    return (
        <div className="container mt-5">
            <h2 className="text-center" style={{"marginTop" : "50px"}}>Registered Users</h2>
            {users.length === 0 ? (
                <p className="text-center">No users found.</p>
            ) : (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}> {/* Assuming 'id' is the primary key */}
                                <td>{user.firstname}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RegisteredUser;
