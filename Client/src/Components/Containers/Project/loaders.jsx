//React Imports
import React from "react";
//Imports from Reusables
import Loader from "../../Reusables/Spinner/loader";

/**
 * Loaders component displays a loading spinner along with loading text.
 *
 * @component
 * @param {string} loadingText - The text to be displayed alongside the spinner.
 * @param {string} style - The CSS class for styling the loading container.
 */

const Loaders = ({ loadingText, style }) => {
  return (
    <div>
      <div className={style}>
        <div>
          <Loader />
        </div>
        &nbsp;
        <h4>{loadingText}</h4>
      </div>
    </div>
  );
};

export default Loaders;
