/**
 * DashboardPage Component serves as a page for displaying the Dashboard container. It simply renders the Dashboard container, which likely contains the main functionality for handling Dashboard-related tasks.
 * @returns {JSX.Element} The JSX representation of the DashboardPage component.
 */

//React Imports
import React from "react";
//Imports from Containers
import Dashboard from "../../Components/Containers/Dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
