import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginOrNot } from "./processes/userData";

import VVP from "./assets/images/vvp.png";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <div className="Loadercover">
            <div className="loader"></div>
            <img
                className="icon"
                alt="icon"
                src={VVP}
                width="70px"
                height="70px"
            ></img>
        </div>
    </BrowserRouter>
);

LoginOrNot().then((result) => {
    if (result) {
        root.render(
            <BrowserRouter>
                <App what={true} />
            </BrowserRouter>
        );
    } else {
        root.render(
            <BrowserRouter>
                <App what={false} />
            </BrowserRouter>
        );
    }
});
// // reportWebVitals();
