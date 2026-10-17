// src/components/RegisteredUsers.jsx
import React, { useEffect, useState } from "react";

const OTavailability= () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Fetch the registered users from the backend
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:5002/OTavailable");
                if (!response.ok) {
                    throw new Error('Error fetching info');
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
            <h2 className="text-center" style={{"marginTop" : "50px"}}>Available OT Info</h2>
            {doctors.length === 0 ? (
                <p className="text-center">No Doctors found.</p>
            ) : (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                           
                            <th>OT available</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.ot_details_pkey}> {/* Assuming 'id' is the primary key */}
                                <td>{doctor.ot_name }</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OTavailability;
