/**
 * App Component is the main entry point of the application. It sets up the routing for the different pages and renders the Navbar.
 *
 * @returns {JSX.Element} The JSX representation of the App component.
 */

//React Imports
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Imports from Pages
import DashboardPage from "../Dashboard_page/dashboardPage";
import Project from "../Project/project";
//Imports form Reusables
import Navbar from "../../Components/Reusables/Navbar/Navbar";
import { Notification } from "../../Components/Reusables/Notification/Notification";
import GraphPage from "../Graph_page/graphPage";

const App = () => {
  return (
    <div>
      <Notification>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/Project/:id/:modelid" element={<GraphPage />} />
            <Route path="/Project/:id" element={<Project />} />
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </Notification>
    </div>
  );
};

export default App;
