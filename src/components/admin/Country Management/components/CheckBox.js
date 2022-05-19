import React, { useState } from "react";

export default function CheckBox({ name, onChange, initialState }) {
  const [isChecked, setIsChecked] = useState(initialState);

  function handleOnChange(event) {
    // const isChecked = !event.target.checked;
    setIsChecked(!isChecked);
    // Fire callback
    if (onChange) onChange(!isChecked);
  }
  return (
    <>
      <div className="App">
        <label>
          <input
            onChange={handleOnChange}
            name={name}
            checked={isChecked}
            type="checkbox"
          />{" "}
          {name}
        </label>
      </div>
    </>
  );
}
