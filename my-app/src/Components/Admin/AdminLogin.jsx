// AdminLogin.jsx
//app.use(cors({ origin: "http://localhost:3001" }));  // Enable CORS browsers link -> http://localhost:3001/AdminLogin both should match
//app.use(express.json());
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            console.log("Sending admin login request...");
    
            const response = await fetch("http://localhost:5002/AdminLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: "admin",
                    password: "admin"
                })
            });
    
            const data = await response.json();  // ✅ Parse response
            console.log("Response from server:", data);  // ✅ Debugging
    
            if (response.ok) {
                console.log("✅ Login successful:", data.message);
                navigate("/Menu");
            } else {
                throw new Error(data.error || "Invalid credentials");
            }
        } catch (err) {
            console.error("❌ Error logging in:", err);
            setError("Error logging in");
        }
    };
    
    return (
        <>
        <div style={{ marginTop:"50px"}}>
        <div className="container mt-5"style={{ height: "400px" ,width:"430px", border:"2px solid black", textAlign: "center", marginTop:"200px",borderRadius:"20px"}}>
            <h2 className="text-center">Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary mt-4" style={{"color" : "black"}}>Login</button>
            </form>
        </div>
        </div>
        </>
    );
};

export default AdminLogin;
