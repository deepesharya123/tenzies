import React, { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function Main() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function allNewDice() {
    const ar = [];
    while (ar.length < 10) {
      let n = Math.floor(Math.random() * 10) % 7;
      if (n == 0) continue;
      ar.push({ value: n, isHeld: false, id: nanoid() });
    }
    return ar;
  }

  const holdDice = (id) => {
    const newDice = dice.map((die) => {
      if (die.id === id) {
        return { ...die, isHeld: !die.isHeld };
      } else return die;
    });
    setDice(newDice);
  };

  const diceElements = dice.map((die, index) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      id={die.id}
      holdDice={holdDice}
    />
  ));

  const rollDice = () => {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
      return;
    }
    const newDice = [];
    let i = 0;
    while (newDice.length < 10) {
      const die = dice[i++];
      if (die.isHeld) {
        newDice.push(die);
        continue;
      }
      const randomNumber = Math.ceil(Math.random() * 6);
      newDice.push({ ...die, value: randomNumber });
    }

    setDice(newDice);
  };

  useEffect(() => {
    let allSame = true;
    let pre = dice[0].value;
    dice.map((die) => {
      if (!die.isHeld || pre != die.value) {
        allSame = false;
      }
    });
    if (allSame) console.log("You won");
    setTenzies(allSame);
  }, [dice]);

  const buttonText = tenzies ? "New Game" : " Roll";
  return (
    <div className="main">
      {tenzies && <Confetti width={360} height={379} />}
      <h1>Tenzies</h1>
      <p className="desc">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="inner-main">
        <div className="die-main">{diceElements}</div>
      </div>

      <button className="roll-dice" onClick={() => rollDice()}>
        {buttonText}
      </button>
    </div>
  );
}

export default Main;
