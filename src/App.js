import React from "react";
import Login from "./Components/Auth Components/Login";
import Create from "./Components/Auth Components/Create";
import Home from "./Components/Home";
import "./Styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserInfo from "./Components/UserInfo";
import Setting from "./Components/Setting";
import Error from "./Components/Error";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/user-details" element={<UserInfo />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
