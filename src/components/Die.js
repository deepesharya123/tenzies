import React from "react";

function Die(props) {
  const { value, id, isHeld, holdDice } = props;
  const isHeldClass = isHeld ? "die-face-hold" : "die-face";
  return (
    <div onClick={() => holdDice(id)} className="die-container">
      <div className={isHeldClass}>{value}</div>
    </div>
  );
}

export default Die;
