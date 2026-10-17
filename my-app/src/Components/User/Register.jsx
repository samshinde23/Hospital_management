import React, { useState } from "react";

function Register() {
  const [user, setUser] = useState({
    FirstName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    // Ensure phone number only contains digits and is max 10 characters
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // Allow only digits
      if (value.length > 10) return; // Restrict to 10 characters
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Additional validation before sending data
    if (user.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Registration successful:", responseData);
        setUser({ FirstName: "", email: "", password: "", phone: "" });
        setError(null);
      } else {
        console.error("Error from server:", responseData);
        setError(`Failed to register: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container register-container" style={{marginTop:"100px"}}>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="FirstName">Enter Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="FirstName"
          placeholder="What's your name?"
          value={user.FirstName}
          disabled={loading}
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={user.email}
          disabled={loading}
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={user.password}
          disabled={loading}
        />

        <label htmlFor="phone">Phone no</label>
        <input
          onChange={handleChange}
          type="text"
          name="phone"
          value={user.phone}
          disabled={loading}
          maxLength="10"
          pattern="\d{10}"
          title="Phone number must be exactly 10 digits"
        />

        <button type="submit" className="reg_btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;
