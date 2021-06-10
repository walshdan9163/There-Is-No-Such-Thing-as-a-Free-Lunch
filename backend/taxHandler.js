// Ideally will reach out to API or query database. 
// For now, though - it is just going to read from dictionary.

const statesTax = {
    "AL": 0.5,
    "AK": 0.5,
    "AZ": 0.5,
    "AR": 0.5,
    "CA": 0.5,
    "CO": 0.5,
    "CT": 0.5,
    "DE": 0.5,
    "DC": 0.5,
    "FL": 0.5,
    "GA": 0.5,
    "HI": 0.5,
    "ID": 0.5,
    "IL": 0.5,
    "IN": 0.5,
    "IA": 0.5,
    "KS": 0.7,
    "KY": 0.7,
    "LA": 0.7,
    "ME": 0.7,
    "MD": 0.7,
    "MA": 0.7,
    "MI": 0.7,
    "MN": 0.7,
    "MS": 0.7,
    "MO": 0.7,
    "MT": 0.7,
    "NE": 0.1,
    "NV": 0.1,
    "NH": 0.1,
    "NJ": 0.1,
    "NM": 0.1,
    "NY": 0.1,
    "NC": 0.1,
    "ND": 0.1,
    "OH": 0.1,
    "OK": 0.1,
    "OR": 0.1,
    "PA": 0.1,
    "RI": 0.1,
    "SC": 0.1,
    "SD": 0.1,
    "TN": 0.1,
    "TX": 0.1,
    "UT": 0.1,
    "VT": 0.1,
    "VA": 0.1,
    "WA": 0.1,
    "WV": 0.1,
    "WI": 0.1,
    "WY": 0.1
};

function getTaxRate(state){
    return statesTax[state];
}

module.exports = { getTaxRate };