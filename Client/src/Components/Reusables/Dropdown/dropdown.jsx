import React from "react";
import { Select } from "antd";

const Dropdown = ({ defaultValue, options, width, handleChange, value }) => (
  <Select
    labelInValue
    defaultValue={{
      value: defaultValue,
      label: defaultValue,
    }}
    style={{
      width: width,
    }}
    value={value}
    onChange={handleChange}
    options={options}
  />
);

export default Dropdown;
