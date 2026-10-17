import React, { useState } from "react";

function UpdateAvailable() {
  const [doc, setDoc] = useState({
    patient_name: "",  // Changed from doctor_name to patient_name
    done_by: "",
    available: "",
    anasthesia: "",
    nurse: "",
    date: ""         // Use 'date' instead of 'surgery_date'
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
      const response = await fetch("http://localhost:5002/SurgeryForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Update successful:", responseData);
        // Reset the form state
        setDoc({
          patient_name: "",
          done_by: "",
          available: "",
          anasthesia: "",
          nurse: "",
          date: ""
        });
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
      <h1 style={{ textAlign: "center" }}>Surgery Info</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="patient_name">Patient Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="patient_name"
          placeholder="Patient name"
          value={doc.patient_name}
          disabled={loading}
        />

        <label htmlFor="done_by">Doctor Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="done_by"
          placeholder="Doctor name"
          value={doc.done_by}
          disabled={loading}
        />

        <label htmlFor="available">Available at</label>
        <select
          name="available"
          onChange={handleChange}
          value={doc.available}
          disabled={loading}
        >
          <option value="">Select Availability</option>
          <optgroup label="OT">
            <option value="OT1">OT1</option>
            <option value="OT2">OT2</option>
            <option value="OT3">OT3</option>
          </optgroup>
        </select>
        <br />

        <label htmlFor="anasthesia">Anasthesia used</label>
        <input
          onChange={handleChange}
          type="text"
          name="anasthesia"
          value={doc.anasthesia}
          disabled={loading}
        />

        <label htmlFor="nurse">Assistants</label>
        <input
          onChange={handleChange}
          type="text"
          name="nurse"
          value={doc.nurse}
          disabled={loading}
        />

        <label htmlFor="date">Date</label>
        <input
          onChange={handleChange}
          type="date"
          name="date"  // Changed from 'surgery_date' to 'date'
          value={doc.date}
          disabled={loading}
        />

        <button type="submit" className="reg_btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default UpdateAvailable;
