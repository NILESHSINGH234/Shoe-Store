import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import Mock from 'mockman-js';
import{ BrowserRouter} from 'react-router-dom'

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
      <App />
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
