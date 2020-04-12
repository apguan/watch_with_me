import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider } from "baseui";
import "./App.css";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Others from "./components/Others";
import Home from "./components/Home";

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <div className="App">
          <Navbar></Navbar>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/youtube/:roomId" component={Main} />
            <Route path="/other/:roomId" component={Others} />
          </Router>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
