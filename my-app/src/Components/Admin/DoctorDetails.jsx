// src/components/RegisteredUsers.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorDetails= () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Fetch the registered users from the backend
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:5002/DoctorDetails");
                if (!response.ok) {
                    throw new Error('Error fetching doctors');
                }
                const data = await response.json();
                setDoctors(data);  // Set the fetched users in state
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);  // Empty dependency array to run only once when the component mounts

    return (
        <div className="container mt-5">
            <h2 className="text-center" style={{"marginTop" : "50px"}}>Doctor Info</h2>
            <div className="text-center mt-3">
                <button className="btn btn-primary m-2" onClick={() => navigate('/DocAvailable')} style={{"color" : "black"}}>Doctor Available</button>
                <button className="btn btn-primary m-2" onClick={() => navigate('/OTavailable')} style={{"color" : "black", "background-color": "rgb(0, 255, 213)"}}>OT Available</button>
                <button className="btn btn-primary m-2" onClick={() => navigate('/UpdateAvailable')} style={{"color" : "black", "background-color": "rgb(0, 255, 213)"}}>Update Availability</button>
            </div>
            {doctors.length === 0 ? (
                <p className="text-center">No Doctors found.</p>
            ) : (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                           
                            <th>Doctor Name</th>
                            <th>Specialist</th>
                            <th>Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.id}> {/* Assuming 'id' is the primary key */}
                                <td>{doctor.doctor_name}</td>
                                <td>{doctor.specialist}</td>
                                <td>{doctor.available}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorDetails;
