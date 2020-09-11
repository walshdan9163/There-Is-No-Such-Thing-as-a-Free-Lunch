import React, {useState} from 'react';
import '../css/menu.css';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
    <Container>
      <Row>
        <Col>
          <div className="tips-and-fees">
            <h3>
              Tip and Fees:
            </h3>
            <input
              name="tipAndFees"
              type="number"
              value={tipAndFees}
              onChange={handleTipAndFeesChange}
            />
          </div>
        </Col>
        <Col>
          <div className="prorate">
              <h3>
                Split tips and fees proportionally?
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
                  onChange={handleCostsChange}
                />
              </td>
              <td>
                <input
                  name="cost"
                  data-id={index}
                  type="number"
                  value={item.cost}
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
