/**
 * Project Component
 *
 * The Project component is a React functional component that represents a project page
 * with an Excel table.
 * @returns {JSX.Element} The rendered Project element.
 */

//React Imports
import React from "react";
//Redux Imports
import Tableview from "../../Components/Containers/Project/Tableview";

const Project = () => {
  return (
    <div>
      <Tableview />
    </div>
  );
};

export default Project;
