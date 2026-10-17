// src/components/RegisteredUsers.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostOperation = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the registered users from the backend
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5002/PostOperation');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                setUsers(data);  // Set the fetched users in state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []);  // Empty dependency array to run only once when the component mounts

    return (
        <div className="container mt-5" >
            <h2 className="text-center" style={{ marginTop: "50px" }}>Post Operation</h2>
            <div className="text-center mt-3">
                <button className="btn btn-primary m-2" onClick={() => navigate('/SurgeryForm')} style={{"color" : "black", "background-color": "rgb(0, 255, 213)"}}>Add</button>
            </div>
            {users.length === 0 ? (
                <p className="text-center">No data found.</p>
            ) : (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Done by</th>
                            <th>OT</th>
                            <th>Anasthesia used</th>
                            <th>Assistant nurse</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}> {/* Assuming 'id' is the primary key */}
                                <td>{user.patient_name}</td>
                                <td>{user.done_by}</td>
                                <td>{user.available}</td>
                                <td>{user.anasthesia}</td>
                                <td>{user.nurse}</td>
                                <td>{user.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PostOperation;
