import React, { useReducer } from "react";
import Header from "./Header";
import styled from "styled-components";
import toDoReducer from "../reducers/toDoReducer";
import { ToDoContext } from "../contexts/context";
import { Outlet } from 'react-router-dom';
import { ToDosState } from "../types/types";
import Footer from "./Footer";

function App(): JSX.Element {
    const initialTasks: ToDosState = [];
    const [state, dispatch] = useReducer(toDoReducer, initialTasks);
    const value = { state, dispatch };

    return (
        <Wrapper>
            <Header />
            <ToDoContext.Provider value={value}>
                <Outlet />
            </ToDoContext.Provider>
            <Footer />
        </Wrapper >
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
`;

export default App;