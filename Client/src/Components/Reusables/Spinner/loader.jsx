import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
// Ant Design LoadingOutlined with custom style
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 17,
      color: "red",
    }}
    spin
  />
);
/**
 * Loader component displays a spinning loader with a custom LoadingOutlined.
 *
 * @component
 */
const Loader = () => <Spin indicator={antIcon} />;
export default Loader;
