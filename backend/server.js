const express = require("express");
const fs = require("fs");
const path = require("path");
const taxHandler = require('./taxHandler.js');

const app = express();
const bodyParser = require('body-parser');
const e = require("express");

app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });

app.post("/api/calculate", (req, res) => {
    const totalMealCost = parseFloat(req.body.totalMealCost);
    const prorate = req.body.prorateChoice;
    const individualMealCosts = req.body.individualCosts;
    var numParticipants = individualMealCosts.length;
    const tipsAndFees = calcTipsAndFees(totalMealCost, individualMealCosts);

    for(var i = 0; i < individualMealCosts.length; i++){
        individualMealCosts[i].totalIndMealCost = calcNewCost(prorate, tipsAndFees, numParticipants, parseFloat(individualMealCosts[i].cost), totalMealCost);
    }

    res.json({
        prorate: prorate,
        costs: individualMealCosts
    })
});

app.listen(app.get("port"), () => {
    console.log(`Server listening at port ${app.get("port")}`);
});

function calcNewCost(prorate, tipsAndFees, numParticipants, individualMealCost, totalMealCost){
    var mealCost = 0;
    if(prorate){
        var individualCostToTotalRatio = individualMealCost / totalMealCost;
        var proratedTipAndFees = tipsAndFees * individualCostToTotalRatio;
        mealCost = individualMealCost + proratedTipAndFees;
    }
    else{
        mealCost = individualMealCost + (tipsAndFees / numParticipants);
    }
    return mealCost;
}

function calcTipsAndFees(totalMealCost, individualMealCosts){
    var tempTotalMealCost = totalMealCost;
    var tipAndFees = 0;
    for(var i = 0; i < individualMealCosts.length; i++){
        tempTotalMealCost = tempTotalMealCost - individualMealCosts[i].cost;
    }
    tipAndFees = tempTotalMealCost;
    return parseFloat(tipAndFees);
}