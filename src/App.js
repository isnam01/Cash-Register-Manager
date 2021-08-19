import "./styles.css";
import { useState } from "react";

export default function App() {
  const [amount, setamountt] = useState(undefined);
  const [cash, setcash] = useState(undefined);
  const [show, setshow] = useState(false);
  const [arr, setarr] = useState([]);
  const [showmsg, setshowmsg] = useState(false);
  const [showbillmsg, setshowbillmsg] = useState(false);
  const [showcash, setshowcash] = useState(false);

  let notes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
  const onClickHandler = () => {
    let noteCounter = Array(9).fill(0);
    let return_amount = cash - amount;
    if (!amount) {
      setshowbillmsg(true);
    }
    if (!cash || !amount || return_amount < 0) {
      setshow(false);
      setshowmsg(true);
    } else {
      for (let i = 0; i < 9; i++) {
        if (return_amount >= notes[i]) {
          noteCounter[i] = Math.floor(return_amount / notes[i]);
          return_amount = return_amount - noteCounter[i] * notes[i];
        }
      }
      setarr(noteCounter);
      setshow(true);
      setshowmsg(false);
    }
    // count notes using Greedy approach
  };

  const handleNextClick = () => {
    if (amount) {
      setshowcash(true);
    } else {
      setshowbillmsg(true);
    }
  };

  return (
    <div className="App">
      <h1>Cash Register Manager</h1>
      <h5>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </h5>
      <div className="bill_div">
        <label htmlFor="bill_amount">Bill amount</label>
        <input
          type="number"
          id="bill_amount"
          onChange={(e) => setamountt(e.target.value)}
        ></input>
      </div>

      {showcash ? (
        <>
          <div className="bill_div">
            <label htmlFor="cash_amount">Cash Given</label>
            <input
              type="number"
              id="cash_amount"
              onChange={(e) => setcash(e.target.value)}
            ></input>
          </div>
          <button onClick={() => onClickHandler()}>Calculate</button>
        </>
      ) : (
        <>
          {showbillmsg ? "Please enter valid bill amount" : ""}
          <button
            onClick={() => {
              handleNextClick();
            }}
          >
            Next
          </button>
        </>
      )}

      {show
        ? arr.map((item, index) => {
            let note = notes[index];
            return (
              <div className="notes" key={note}>
                <span>Rs. {note}</span>
                <span>:</span>
                <span>{item}</span>
              </div>
            );
          })
        : ""}
      {showmsg ? "Please enter valid bill amount and cash given" : ""}
      {showbillmsg ? "" : ""}
    </div>
  );
}
