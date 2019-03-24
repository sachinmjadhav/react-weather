import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
