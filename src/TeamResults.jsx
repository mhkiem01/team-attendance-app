function TeamResults({ teams }) {
  return (
    <div>
      {teams.map((team, index) => (
        <div key={index}>
          <h3>Team {index + 1}</h3>
          <ul>
            {team.map((member, i) => (
              <li key={i}>{member.name} ({member.gender})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TeamResults;
