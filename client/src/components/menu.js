import React, {useState} from 'react';
import '../css/menu.css';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function CalculateValues(prorate, totalMealCost, costs){
  return fetch('/api/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({prorateChoice: prorate, totalMealCost: totalMealCost, individualCosts: costs}),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
}

const defaultCost = [
  {
    name: "Name",
    cost: 0,
    totalIndMealCost: 0
  }
];

function Menu() {

  const [costs, setCosts] = useState(defaultCost);
  const [totalMealCost, setTotalMealCost] = useState(0);
  const [prorate, setProrate] = useState(0);
  const [totalIndMealCosts, setTotalIndMealCosts] = useState(defaultCost);

  const calculateCosts = () => {
    const prorated = prorate;
    CalculateValues(prorated, totalMealCost, costs)
      .then(values => {
        setCosts(values.costs);
      });
  }

  const handleCostsChange = event => {
    const _tempCosts = [...costs];
    _tempCosts[event.target.dataset.id][event.target.name] = event.target.value;

    setCosts(_tempCosts);
  };

  const handleTotalMealCostChange = event => {
    setTotalMealCost(parseFloat(event.target.value));
  }

  const handleProrateChange = event => {
    setProrate(event.target.checked);
  }

  const addNewCost = () => {
    setCosts(prevCosts => [...prevCosts, {name: "Name", cost: 0, totalIndMealCost: 0}]);
  };

  const handleFocus = event => {
    event.target.select();
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="total-meal-cost">
            <h3>
              Total Meal Cost:
            </h3>
            <input
              name="totalMealCost"
              type="number"
              value={totalMealCost}
              onFocus={handleFocus}
              onChange={handleTotalMealCostChange}
            />
          </div>
        </Col>
        <Col>
          <div className="prorate">
              <h3>
                Prorate?*
              </h3>
              <input
                name="prorate"
                type="checkbox"
                check={prorate.checked}
                onChange={handleProrateChange}
              />
          </div>
        </Col>
      </Row>
      <div>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Participant Name</th>
              <th>Meal Cost</th>
              <th>Total Meal Cost</th>
            </tr>
          </thead>
          <tbody className="scrollable-table">
            {costs.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    name="name"
                    data-id={index}
                    type="text"
                    value={item.name}
                    onFocus={handleFocus}
                    onChange={handleCostsChange}
                  />
                </td>
                <td>
                  <input
                    name="cost"
                    data-id={index}
                    type="number"
                    value={item.cost}
                    onFocus={handleFocus}
                    onChange={handleCostsChange}
                  />
                </td>
                <td>
                  <input
                    name="totalIndMealCost"
                    data-id={index}
                    type="number"
                    value={item.totalIndMealCost}
                    onFocus={handleFocus}
                    onChange={handleCostsChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      <div className="add-participant-button">
        <Button onClick={addNewCost}>Add Participant</Button>
      </div>
      <div>
        <Button onClick={calculateCosts}>Calculate Individual Costs</Button>
      </div>
    </Container>
  );
}

export default Menu;
