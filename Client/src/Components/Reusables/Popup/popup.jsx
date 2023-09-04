import React, { useState } from "react";
import { Button, Modal } from "antd";
const Popup = () => {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        closable={false}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        style={{
          top: 50,
        }}
        bodyStyle={{
          height: 500,
        }}
      ></Modal>
    </>
  );
};
export default Popup;
