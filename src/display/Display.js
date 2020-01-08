import React from "react";

const Display = ({ closed, locked }) => {
  const closedClass = `led ${closed ? "red-led" : "green-led"}`;
  const lockedClass = `led ${locked ? "red-led" : "green-led"}`;

  return (
    <div className="display panel" data-testid="display-component">
      <div data-testid="lock-status" className={lockedClass}>
        {locked ? "Locked" : "Unlocked"}
      </div>
      <div data-testid="closed-status" className={closedClass}>
        {closed ? "Closed" : "Open"}
      </div>
    </div>
  );
};

Display.defaultProps = {
  closed: false,
  locked: false
};

export default Display;
