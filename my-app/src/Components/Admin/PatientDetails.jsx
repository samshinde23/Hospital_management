// src/components/RegisteredUsers.jsx
import React, { useEffect, useState } from "react";

const PatientDetails= () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Fetch the registered users from the backend
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:5002/PatientDetails');
                if (!response.ok) {
                    throw new Error('Error fetching patients');
                }
                const data = await response.json();
                setPatients(data);  // Set the fetched users in state
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);  // Empty dependency array to run only once when the component mounts

    return (
        <div className="container mt-5">
            <h2 className="text-center" style={{"marginTop" : "50px"}}>Patient Info</h2>
            {patients.length === 0 ? (
                <p className="text-center">No patients found.</p>
            ) : (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                           
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Health Issue</th>
                            <th>Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}> {/* Assuming 'id' is the primary key */}
                                <td>{patient.patient_name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.address}</td>
                                <td>{patient.health_issue}</td>
                                <td>{patient.doctor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PatientDetails;
