import React, { useState } from "react";
import "../styles/Calculator.scss";
import userImage from '../assets/images/user.png';
import dollarImage from '../assets/images/dollar.png';
const Calculator = () => {
  const defaultTipPercentage = "Custom"; 
  const [billAmount, setBillAmount] = useState<any>('');
  const [tipPercentage, setTipPercentage] = useState<any>("Custom");
  const [numberOfPeople, setNumberOfPeople] = useState<any>(null);
  const [customTipPercentage, setCustomTipPercentage] = useState<any>("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleBillAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    // Check if the input value is a valid number
    if (!isNaN(parseFloat(inputValue))) {
      // If it's a valid number, update the state
      setBillAmount(parseFloat(inputValue));
    } else {
      // If it's not a valid number, set the bill amount to 0
      setBillAmount(0);
    }
  };

  const handleTipPercentageClick = (percentage: any) => {
    if (percentage === "Custom") {
      // Show custom input field
      setShowCustomInput(true);
      // Set tip percentage to custom
      setTipPercentage("Custom");
    } else {
      // Hide custom input field
      setShowCustomInput(false);
      // Set the selected tip percentage
      setTipPercentage(percentage);
    }
  };

  const handleCustomTipChange = (event: any) => {
    setCustomTipPercentage(event.target.value);
  };

  const handleNumberOfPeopleChange = (event: any) => {
    setNumberOfPeople(parseInt(event.target.value));
  };


  const calculateTipAmount = () => {
    // Check if bill amount, number of people, and custom tip percentage are not 0 and not NaN
    if (
      !isNaN(billAmount) &&
      billAmount !== 0 &&
      !isNaN(numberOfPeople) &&
      numberOfPeople !== 0 &&
      tipPercentage !== 0 &&
      (tipPercentage !== "Custom" || !isNaN(parseInt(customTipPercentage)))
    ) {
      let tipPercent = 0;
      if (tipPercentage === "Custom") {
        tipPercent = parseInt(customTipPercentage);
      } else {
        tipPercent = parseFloat(tipPercentage);
      }
      const tipAmount = (billAmount * (tipPercent / 100)) / numberOfPeople;
      if (!isNaN(tipAmount) && isFinite(tipAmount)) {
        return tipAmount.toFixed(2); // Fix to 2 decimal places
      } else {
        return '0.00';
      }
    }
    // If any of the values are 0 or NaN, return 0 tip amount
    return '0.00';
  };
  
 
  const handleReset = () => {
    // Reset all state values to their initial values
    setBillAmount('');
    setTipPercentage(defaultTipPercentage);
    setNumberOfPeople('');
    setCustomTipPercentage("");
    setShowCustomInput(false);
  
    // Remove active class from all tip percentage elements
    const tipPercentageElements = document.querySelectorAll(".tip-percentage");
    tipPercentageElements.forEach(element => {
      element.classList.remove("active");
    });
  };

  const calculateTotalAmountPerPerson = () => {
    const tipAmount = parseFloat(calculateTipAmount());
    
    // Check if bill amount, number of people, and custom tip percentage are not 0 and not NaN
    if (
      !isNaN(billAmount) &&
      billAmount !== 0 &&
      !isNaN(numberOfPeople) &&
      numberOfPeople !== 0 &&
      tipPercentage !== 0 &&
      (tipPercentage !== "Custom" || !isNaN(parseFloat(customTipPercentage)))
    ) {
      // Check if the tip amount is a valid number and not NaN or infinite
      if (!isNaN(tipAmount) && isFinite(tipAmount)) {
        // Calculate the total amount per person
        const totalAmount = (billAmount + tipAmount) / numberOfPeople;
        if (!isNaN(totalAmount) && isFinite(totalAmount)) {
          return totalAmount.toFixed(2);
        }
      }
    }
    // If any of the values are 0 or NaN, or the tip amount is not valid, return 0 total amount
    return '0.00';
  };
  

  const tipPercentages = [5, 10, 15, 20, 25, "Custom"];
  const resetButtonClassName =
  parseFloat(calculateTipAmount()) === parseFloat('0') && parseFloat(calculateTotalAmountPerPerson()) === parseFloat('0')
    ? "resetButton"
    : "resetButton non-zero";


  return (
    <div className="calculator">
      <div className="main">
        <div className="calHeading">
          <div className="calText">Splt</div> 
          <div className="calText">tter</div> 
          </div>
        <div className="bottom">
          <div className="first">
            <div className="bill">
              <div className="heading">Bill</div>
              
              <div className="billInput">
                <input
                  type="text"
                  placeholder="0"
                  className={`billAmountInput ${billAmount === 0 ? 'zero' : 'non-zero'}`}
                  value={billAmount}
                  onChange={handleBillAmountChange}
                />
                         <div className="inputWithIcon">
      <img src={dollarImage} alt="User Icon" className="userIcon" />
      </div>
              </div>
            </div>
            <div className="percentage">
              <div className="heading">Select Tip %</div>
              <div
                className="tip-percentage-container"
                style={{ textAlign: "center" }}
              >
                {tipPercentages.map((percentage:any,index) =>
                  percentage === "Custom" ? (
                    <div
                      key={index}
                      className={`tip-percentage ${
                        tipPercentage === percentage ? "custom" : "custom"
                      }`}
                      onClick={() => handleTipPercentageClick(percentage)}
                      style={{ display: showCustomInput ? "none" : "" }}
                    >
                      {`${percentage}`}
                    </div>
                  ) : (
                    <div
                      key={index}
                      className={`tip-percentage ${
                        tipPercentage === percentage ? "active" : ""
                      }`}
                      onClick={() => handleTipPercentageClick(percentage)}
                    >
                      {`${percentage}%`}
                    </div>
                  )
                )}
                {showCustomInput && (
                  <div className="custom-tip-input">
                    <input
                      type="text"
                      placeholder="0%"
                      className={`billAmountInput ${customTipPercentage === 0 ? 'zero' : 'non-zero'}`}
                      value={customTipPercentage}
                      onChange={handleCustomTipChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="users">
              <div className="numbersOfUsers">
                <div className="heading">Number of People</div>
                {numberOfPeople === 0 && (
                  <div className="error-message">Can't be zero</div>
                )}
              </div>
       
      <div className="billInput">
                
                <input
                  type="number"
                  placeholder="0"
                  className={`billAmountInput ${numberOfPeople === 0 ? 'zero' : 'non-zero'}`}
                  value={numberOfPeople}
                  onChange={handleNumberOfPeopleChange}
                />
                       <div className="inputWithIcon">
      <img src={userImage} alt="User Icon" className="userIcon" />
      </div>
              </div>

              
            </div>
          </div>
<div className="second">
  <div className="total">
    <div className="heading">
      <div>
        <div className="tip">Tip Amount</div>
        <span>{numberOfPeople ? numberOfPeople : "0"}/person</span>
      </div>
      <div className="price">${parseFloat(calculateTipAmount()).toFixed(2)}</div>
    </div>
    <div className="heading">
      <div>
        <div className="total-text">Total</div>
        <span>{numberOfPeople ? numberOfPeople : "0"}/person</span>
      </div>
      <div className="price">
        ${parseFloat(calculateTotalAmountPerPerson()).toFixed(2)}
      </div>
    </div>
  </div>
  <div className="reset" onClick={handleReset}>
    <button className={resetButtonClassName}>RESET</button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
