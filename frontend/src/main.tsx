// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <App />
// );


import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
