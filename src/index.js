import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
// import App from './App';
import StarRating from "./Components/StarRating/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      messages={["Terrible", "Bag", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <StarRating maxRating={10} size={30} className="test" />
  </React.StrictMode>
);
