import React from "react";
import { Select } from "antd";

const Dropdown = ({ defaultValue, options, width, onchange }) => (
  <Select
    labelInValue
    defaultValue={{
      value: defaultValue,
      label: defaultValue,
    }}
    style={{
      width: width,
    }}
    onChange={onchange}
    options={options}
  />
);
export default Dropdown;
