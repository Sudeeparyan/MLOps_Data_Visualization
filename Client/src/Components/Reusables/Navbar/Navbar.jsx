/**
 * A reusable Navbar component.
 * @returns {JSX.Element} - The rendered Navbar element.
 */

//React Imports
import React from "react";
//Styles Imports
import styles from "./Navbar.module.css";
//Imports from Assests
import logo from "../../../../public/logo.png";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <div>
          <img width="35px" height="35px" src={logo}></img>
        </div>
        <div>
          <h3>
            <i>Dv</i>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
