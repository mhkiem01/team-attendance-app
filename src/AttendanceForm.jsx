import React, { useState, useEffect } from "react";

function AttendanceForm({ onAdd, resetForm }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (resetForm) {
      setName("");
      setGender("Male");
    }
  }, [resetForm]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (name.trim().length < 1) {
        setSuggestions([]);
        return;
      }

      const res = await fetch(`http://localhost:5000/api/suggestions?prefix=${name}`);
      const data = await res.json();

      const filtered = data.filter(s => s.toLowerCase() !== name.toLowerCase());
      setSuggestions(filtered);
    };

    fetchSuggestions();
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const response = await fetch('http://localhost:5000/api/attendees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, gender })
    });

    const newAttendee = await response.json();
    onAdd(newAttendee);
    setName("");
    setSuggestions([]);
  };

  const handleSelectSuggestion = (suggestedName) => {
    setName(suggestedName);
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <div className="input-background"></div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <button type="submit">Add</button>

      {suggestions.length > 0 && (
        <div className="suggestion-box">
          <p>Did you mean:</p>
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  className="suggestion-btn"
                  type="button"
                  onClick={() => handleSelectSuggestion(s)}
                >
                  ✅ Yes, that’s me: {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default AttendanceForm;
