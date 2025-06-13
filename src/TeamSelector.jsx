import React from "react";

function TeamSelector({ numTeams, setNumTeams, onGenerate, disabled }) {
  return (
    <div className="team-control">
      <label htmlFor="teamCount">Number of Teams:</label>
      <select
        id="teamCount"
        value={numTeams}
        onChange={(e) => setNumTeams(Number(e.target.value))}
      >
        {[2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <button onClick={onGenerate} disabled={disabled}>Generate Teams</button>
    </div>
  );
}

export default TeamSelector;
