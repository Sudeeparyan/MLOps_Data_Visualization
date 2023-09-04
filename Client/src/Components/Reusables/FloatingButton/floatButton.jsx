import React from "react";

import { FloatButton } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";

const FloatingButton = ({ onclickHandler, open }) => {
  const toggleOpen = () => {
    onclickHandler(!open);
  };
  return (
    <FloatButton
      style={{
        top: 100 + 100 + 100 + 30,
        right: 0,
      }}
      onClick={toggleOpen}
      icon={<DoubleLeftOutlined />}
      tooltip={<div>Train Data</div>}
    />
  );
};
export default FloatingButton;
