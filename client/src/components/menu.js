import React, {useState} from 'react';
import '../css/menu.css';

function CalculateValues(taxRate, prorate, tipAndFees, costs){
  return fetch('/api/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tax: taxRate, prorateChoice: prorate, tipAndFees: tipAndFees, individualCosts: costs}),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
}

const defaultCost = [
  {
    name: "Name",
    cost: 0
  }
];

function Menu() {

  const [costs, setCosts] = useState(defaultCost);
  const [tipAndFees, setTipAndFees] = useState(0);
  const [prorate, setProrate] = useState(0);

  const calculateCosts = () => {
    const taxRate = 0.07;
    const prorated = prorate;
    CalculateValues(taxRate, prorated, tipAndFees, costs)
      .then(values => {
        setCosts(values.costs);
        setTipAndFees(values.tipAndFees);
      });
  }

  const handleCostsChange = event => {
    const _tempCosts = [...costs];
    _tempCosts[event.target.dataset.id][event.target.name] = event.target.value;

    setCosts(_tempCosts);
  };

  const handleTipAndFeesChange = event => {
    setTipAndFees(parseFloat(event.target.value));
  }

  const handleProrateChange = event => {
    console.log(event.target.checked);
    setProrate(event.target.checked);
  }

  const addNewCost = () => {
    setCosts(prevCosts => [...prevCosts, {name: "Name", cost: 0}]);
  };

  return (
    <div className="table">
      <div className="table-row">
          <div className="table-data">
            <div>Tip and Fees:</div>
          </div>
          <div className="table-data">
            <input
              name="tipAndFees"
              type="number"
              value={tipAndFees}
              onChange={handleTipAndFeesChange}
            />
        </div>
      </div>
      <div className="prorate">
        <div className="table-row">
          <div className="table-data">
            <div>Prorate?</div>
          </div>
          <div className="table-data">
            <input
              name="tipAndFees"
              type="checkbox"
              check={prorate.checked}
              onChange={handleProrateChange}
            />
          </div>
        </div>
      </div>
      <div className="table-content">
        <div className="table-header">
          <div className="table-row">
            <div className="table-data">
              <div>Participant</div>
            </div>
            <div className="table-data">
              <div>Meal Cost</div>
            </div>
          </div>
        </div>
        <div className="table-body">
          {costs.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-data">
                <input
                  name="name"
                  data-id={index}
                  type="text"
                  value={item.name}
                  onChange={handleCostsChange}
                />
              </div>
              <div className="table-data">
                <input
                  name="cost"
                  data-id={index}
                  type="number"
                  value={item.cost}
                  onChange={handleCostsChange}
                />
              </div>
            </div>
          ))}
          <div className="table-row">
            <div className="table-data">
              <button onClick={addNewCost}>Add Participant</button>
            </div>
          </div>
        </div>
        <div className="table-footer">
          <div className="table-row">
            <div className="table-data">
              <button onClick={calculateCosts}>Calculate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
