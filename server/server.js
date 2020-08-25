const express = require("express");
const fs = require("fs");

const app = express();
const bodyParser = require('body-parser');
const e = require("express");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("port", process.env.PORT || 3001);

app.post("/api/calculate", (req, res) => {
    const tipAndFees = parseFloat(req.body.tipAndFees);
    const taxRate = parseFloat(req.body.tax);
    const prorate = req.body.prorateChoice;
    const costs = req.body.individualCosts;
    var numParticipants = 0;
    var totalCost = 0;
    for(var i = 0; i < costs.length; i++){
        if(costs[i].cost > 0){
            numParticipants++;
            totalCost += parseFloat(costs[i].cost);
        }
    }

    for(var i = 0; i < costs.length; i++){
        costs[i].cost = calcNewCost(parseFloat(costs[i].cost), taxRate, prorate, tipAndFees, totalCost, numParticipants);
    }

    res.json({
        tipAndFees: tipAndFees,
        tax: taxRate,
        prorate: prorate,
        costs: costs,
    })
});

app.listen(app.get("port"), () => {
    console.log(`Server listening at port ${app.get("port")}`);
});

function calcNewCost(cost, taxRate, prorate, tipAndFees, totalCost, numParticipants){
    const taxCost = cost * taxRate;
    var extraCost = 0;
    if(prorate){
        extraCost = (tipAndFees * (cost / totalCost));
    }
    else{
        extraCost = (tipAndFees / numParticipants);
    }
    console.log(extraCost);
    const participantCost = (taxCost + extraCost + cost);
    return participantCost.toFixed(2);
}