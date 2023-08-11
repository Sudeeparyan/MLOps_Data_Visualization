/**
 * A reusable button component.
 * @param {string} text - The text to display inside the button.
 * @param {function} ButtonComponent - The click event handler for the button.
 * @returns {JSX.Element} - The rendered button element.
 */

//React Imports
import React from "react";
//Styles Imports
import styles from "./Button.module.css";
//Imports from antD
import { Button } from "antd";

const ButtonComponent = ({ content }) => {
  return (
    <div>
      <Button className={styles.viewButton}>{content}</Button>
    </div>
  );
};

export default ButtonComponent;
