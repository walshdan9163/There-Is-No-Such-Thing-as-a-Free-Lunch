import React, { useState, useEffect } from 'react';

function Participant(props) {

  const [participant, setParticipantState] = useState(props);

  const [participantName, setParticipantName] = useState(participant.name);
  const [mealCost, setMealCost] = useState(participant.mealCost);

  useEffect(() => {
    setParticipantState(props);
  }, [props]);

  return (
    <div className="participant">
        <label className="menu-label">
          Name: 
        </label>
        <input 
          type="text" 
          id="participantName" 
          name="participantName" 
          defaultValue={participant.name}
          onChange={e => setParticipantName(e.target.value)} />
          <br />
        <label className="menu-label">
          Meal Cost: 
        </label>
        <input 
          type="text" 
          id="mealCost" 
          name="mealCost" 
          defaultValue={participant.mealCost}
          onChange={e => setMealCost(e.target.value)} />
          <br />
    </div>
  );
}

export default Participant;
