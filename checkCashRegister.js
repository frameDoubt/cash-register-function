function checkCashRegister(price, cash, cid) {
  /*
    SETUP
  */
  // currency denominations
  const currency = [
    { "ONE HUNDRED": 100.00 }, { "TWENTY": 20.00 },
    { "TEN": 10.00 }, { "FIVE": 5.00 }, { "ONE": 1.00 },
    { "QUARTER": 0.25 }, { "DIME": 0.10 }, { "NICKEL": 0.05 }, { "PENNY": 0.01 }
    ];
  // use price to find difference to payment (cash)
  let change = cash - price;
  // drawer values
  let cashDrawerValues = cid.map(item => item[1]);
  // drawer cash total
  let cashDrawerTotal = cashDrawerValues.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }).toFixed(2);
  let changeArray = [];
  // console.log(change, cashDrawerTotal);


  /*
    LOGIC
  */

  if (cashDrawerTotal < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  };

  let rollingValue = change;
  currency.forEach((item) => {
    for (const [key, compValue] of Object.entries(item)) {
      // returns current denomination compartment
      let denominationCompartment = cid.find(element => element[0] === key);
      // returns number of coins or bills
      let denominationCompartmentBreakdown = (denominationCompartment[1] / compValue).toFixed();
      
      let subtrahend = Math.floor(change / compValue) < denominationCompartmentBreakdown ? Math.floor(change / compValue).toFixed(2) : (denominationCompartment[1]);

      if (rollingValue > 0) {
      console.log("rolling value: ", rollingValue);

        if (change / compValue >= 1 && denominationCompartmentBreakdown > 0) {
        console.log("this is the subtrahend", subtrahend)
        rollingValue -= subtrahend;

          if (rollingValue >= 0) {
            changeArray.unshift([key, subtrahend]);
          }
        }
      }
    }
    console.log(changeArray);
  });
  return { status: "OPEN", change: changeArray };
}
// 96.74 - (3*20) = 36.74 - (2*10) = 16.74 - (3*5) = 1.74 - (1*1) = 0.74 - (2*.25) = 0.24 - (2*.10) = 0.04 - (4*.01)
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);