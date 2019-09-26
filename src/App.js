import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:roomId" component={Main} />
      </Router>
    </div>
  );
}

export default App;
