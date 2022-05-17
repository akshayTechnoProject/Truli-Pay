import React, { useState, useEffect } from "react";

export default function SelectionDropdown(props) {
  const [input, setInput] = useState();
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  useEffect(() => {
    props.setState(input);
  }, [input]);

  return (
    <>
      <div className="form-group">
        <label for="exampleInputPassword1">{props.label}</label>

        <div>
          <Dropdown
            options={props.list}
            value={input}
            onChange={handleChange}
            firstOption={props.firstOption}
          ></Dropdown>
        </div>
      </div>
    </>
  );
}
const Dropdown = ({ options, value, onChange, firstOption }) => {
  return (
    <label>
      <select
        value={value}
        onChange={onChange}
        id="exampleInputPassword1"
        className="form-control ml-0"
        style={{
          cursor: "pointer",
          borderRadius: "17px",
        }}
      >
        <option value={undefined}>{firstOption}</option>

        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
};
