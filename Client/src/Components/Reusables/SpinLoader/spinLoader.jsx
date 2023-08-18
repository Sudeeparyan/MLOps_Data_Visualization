import React from "react";
import { Spin } from "antd";
/**
 * SpinLoader component displays a spinning loader with a loading tip.
 *
 * @component
 */
const SpinLoader = () => {
  return (
    <Spin tip="Loading..">
      <div style={{ padding: "50px" }} />
    </Spin>
  );
};

export default SpinLoader;
