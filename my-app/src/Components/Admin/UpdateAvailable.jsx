import React, { useState } from "react";

function UpdateAvailable() {
  const [doc, setDoc] = useState({
    doctor_name: "",
    available: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setDoc((prev) => ({ ...prev, [name]: value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5002/UpdateAvailable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Update successful:", responseData);
        setDoc({ doctor_name: "", available: "" });
        setError(null);
      } else {
        console.error("Error from server:", responseData);
        setError(`Failed to update: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to update");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container register-container" style={{ marginTop: "50px" }}>
      <h1 style={{ textAlign: "center" }}>Doctor Info</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="doctor_name">Enter Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="doctor_name"
          placeholder="Doctor name"
          value={doc.doctor_name}
          disabled={loading}
        />

        <label htmlFor="available">Available at</label>
        <select name="available" onChange={handleChange} value={doc.available} disabled={loading}>
          <option value="">Select Availability</option>
          <optgroup label="OT">
            <option value="OT1">OT1</option>
            <option value="OT2">OT2</option>
            <option value="OT3">OT3</option>
          </optgroup>
          <option value="Cabin">Cabin</option>
          <option value="Leave">Leave</option>
        </select>

        <button type="submit" className="reg_btn" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default UpdateAvailable;
