/**
 * A reusable Navbar component.
 * @returns {JSX.Element} - The rendered Navbar element.
 */

//React Imports
import React from "react";
//Styles Imports
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <h3>Device Vision</h3>
      </div>
    </div>
  );
};

export default Navbar;
