// src/App.jsx
import React, { useState, useEffect } from "react";
import AttendanceForm from "./AttendanceForm";
import TeamSelector from "./TeamSelector";
import TeamResults from "./TeamResults";
import './App.css';

function App() {
  useEffect(() => {
    const fetchAttendees = async () => {
      const res = await fetch('http://localhost:5000/api/attendees');
      const data = await res.json();
      setAttendees(data);
    };
    fetchAttendees();
  }, []);
  const [attendees, setAttendees] = useState([]);
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState([]);

  const handleAddAttendee = (attendee) => {
    setAttendees([...attendees, attendee]);
  };

  const generateTeams = () => {
    if (attendees.length === 0) {
      setErrorMessage("⚠️ Please enter attendees before generating teams.");
      return;
    }

    setErrorMessage("");

    const males = attendees.filter((a) => a.gender === "Male");
    const females = attendees.filter((a) => a.gender === "Female");

    const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
    const shuffledMales = shuffle([...males]);
    const shuffledFemales = shuffle([...females]);

    const newTeams = Array.from({ length: numTeams }, () => []);
    let i = 0;

    while (shuffledMales.length) {
      newTeams[i % numTeams].push(shuffledMales.pop());
      i++;
    }

    i = 0;
    while (shuffledFemales.length) {
      newTeams[i % numTeams].push(shuffledFemales.pop());
      i++;
    }

    setTeams(newTeams);
  };

  const handleClearDatabase = async () => {
    const confirmed = window.confirm("⚠️ Are you sure you want to delete all data from the database?");
    if (!confirmed) return;

    await fetch('http://localhost:5000/api/clear', {
      method: 'DELETE'
    });

    setAttendees([]);
    setTeams([]);
  };

  const [resetFormTrigger, setResetFormTrigger] = useState(false);
  
  const handleReset = () => {
    setTeams([]);
    setAttendees([]);
    setResetFormTrigger(prev => !prev);
  };

  const [errorMessage, setErrorMessage] = useState("");


  return (
    <div className="App">
      <h1>Team Generator</h1>
      <AttendanceForm onAdd={handleAddAttendee} resetForm={resetFormTrigger} />
      <div className="team-control">
        <TeamSelector
          numTeams={numTeams}
          setNumTeams={setNumTeams}
          onGenerate={generateTeams}
          disabled={attendees.length === 0}
        />
      </div>
      {errorMessage && (
        <div style={{ color: "yellow", marginTop: "1rem" }}>
          {errorMessage}
        </div>
      )}
      <div className="button-row">
        <button className="clear" onClick={handleClearDatabase}>🗑️ Clear All</button>
        <button className="reset" onClick={handleReset}>🔁 Reset Teams</button>
      </div>
      <TeamResults teams={teams} />
    </div>
  );
}

export default App;
