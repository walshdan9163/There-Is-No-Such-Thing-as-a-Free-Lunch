import React, {useState} from 'react';
import '../css/numParticipants.css';

function NumParticipants() {

    const[numParticipants, setNumParticipants] = useState(0);

    React.useEffect(() => {
        fetch('/api/test')
            .then(results => results.json())
            .then(data => {
                console.log(data.data);
            });
    }, []);

    return (
        <div className="numParticipants">
            <form id="numParticipants-form">
            <h3>How many ways are you splitting the bill?</h3>
            <input type="text" id="numParticipants" onChange={e => setNumParticipants(e.target.value)}></input>
            <button onClick={ () => console.log(numParticipants)}>Submit</button>
            </form>
        </div>
    );
}

export default NumParticipants;
