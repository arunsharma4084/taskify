import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./styles/GlobalStyles";
import AppRouter from "./router/AppRouter";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <div>
        <GlobalStyles />
        <AppRouter />
    </div>
);