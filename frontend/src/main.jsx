// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode><App /></React.StrictMode>,
// )
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// // import './index.css'  ← DELETE THIS LINE

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode><App /></React.StrictMode>,
// )

// import React from "react";
// import ReactDOM from "react-dom/client";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <h1 style={{ padding: 40 }}>Vite + React is working!</h1>
// );
console.log("App component loaded");

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
