import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import App from "./App";

type PrivateRouteProps = {
    children: React.ReactNode,
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
    const first = useContext(AuthContext);

    if (!first?.currentUser) {
        return (<Navigate to="/" replace={true} />);
    } else {
        return <App />;
    }
}

export default PrivateRoute;