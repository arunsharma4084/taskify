import React, { useContext } from 'react'
import { ToDoContext } from "../contexts/context";
import { ActionType, MediaType, Payload } from '../types/types';
import Form from './Form'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import database from '../firebase/firebase';
import { ref, push } from "firebase/database";
import { AuthContext } from '../contexts/AuthContext';

const AddTask = (): JSX.Element => {
    const context = useContext(ToDoContext);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const uid = authContext?.currentUser?.uid;

    return (
        <Wrapper>
            <SubWrapper>
                <Title>Add Task</Title>
                <Form onSubmit={(formData) => {
                    push(ref(database, `users/${uid}/tasks`), {
                        ...formData,
                        id: null,
                    }).then((reference) => {
                        context?.dispatch({
                            type: ActionType.ADD, payload: {
                                ...formData,
                                id: reference.key,
                            }
                        });
                    })
                    navigate("/", { replace: true })
                }} />
                <Button form="task-form" type='submit'>Save Task</Button>
            </SubWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    font-family: var(--font-sans-serif);
    width: 100%;
    background-color: var(--color-secondary-light);
    display: flex;
    justify-content: center;
`;

const SubWrapper = styled.div`
    padding: 20px 32px;
    width: 100%;
    max-width: 1200px;
    background-color: var(--color-primary-light);

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 16px;
    }
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
    background-color: var(--color-gray-1000);
    padding: 20px 12px 24px;
    border: 1px solid var(--color-gray-600);
    border-radius: 4px;
    margin-bottom: 20px;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-bottom: 16px;
        padding: 16px 12px;
    }
`;

const Button = styled.button`
    border: 1px solid var(--color-gray-600);
    background-color: var(--color-primary);
    font-family: var(--font-sans-serif);
    text-align: center;
    padding: 8px 12px;
    border-radius: 4px;
    margin-top: 20px;
    transition: transform 100ms ease-out;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2),
            3px 6px 6px hsl(0deg 0% 0% / 0.2);

    &:hover{
        background-color: hsl(173deg, 92%, 40%);
    }

    &:active{
        transform: translateY(2px) scale(0.98);
        background-color: hsl(173deg, 92%, 40%);
    }

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-top: 16px;
    }
`;

export default AddTask;