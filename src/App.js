import React from "react";
import Scavenging from "./pages/Scavenging";
import NavBar from "./components/layout/navBar";
import packageJson from "../package.json";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Scavenging />
      <p style={{ margin: 10 }}>Version {packageJson.version} @The Merchant</p>
    </div>
  );
}

export default App;
