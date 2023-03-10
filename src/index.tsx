import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes.js";
import "./index.css";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <Router />
        </RecoilRoot>
    </React.StrictMode>
);
