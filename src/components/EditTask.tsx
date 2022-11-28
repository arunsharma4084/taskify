import React, { useContext, useEffect, useState } from 'react';
import Form from './Form';
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ToDoContext } from "../contexts/context";
import { ActionType, MediaType, ToDo } from '../types/types';
import styled from "styled-components";
import { Link } from "react-router-dom";
import database from '../firebase/firebase';
import { ref, update, remove, get, child } from "firebase/database";
import { AuthContext } from '../contexts/AuthContext';

const EditTask: React.FC = () => {
    const context = useContext(ToDoContext);
    const navigate = useNavigate();
    const params = useParams();
    const authContext = useContext(AuthContext);
    const uid = authContext?.currentUser?.uid;
    const [toEditTask, setToEditTask] = useState({} as ToDo);

    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, `users/${uid}/tasks/${params.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setToEditTask({ ...snapshot.val(), id: params.id });
            }
        }).catch((error) => {
            console.error(error);
        })
    }, []);

    return (
        <Wrapper>
            <SubWrapper>
                <Title>Edit Task</Title>
                {
                    toEditTask.description
                        ?
                        <Form toDo={toEditTask}
                            onSubmit={(formData) => {
                                console.log(formData)
                                update(ref(database, `users/${uid}/tasks/${formData.id}`), {
                                    ...formData,
                                    id: null,
                                }).then(() => {
                                    context?.dispatch({
                                        type: ActionType.EDIT, payload: {
                                            ...formData,
                                        }
                                    });
                                })
                                navigate("/", { replace: true })
                            }} />
                        :
                        <p style={{ marginBottom: "16px" }}>Loading....</p>
                }
                <ButtonWrapper>
                    <Button form="task-form" type='submit'>Save</Button>
                    <Link style={{ textDecoration: "none" }} to='/'>
                        <DeleteButton onClick={() => {
                            remove(ref(database, `users/${uid}/tasks/${toEditTask?.id}`)).then(() => {
                                context?.dispatch({ type: ActionType.DELETE, payload: { id: toEditTask?.id } })
                            })
                        }}>
                            Delete
                        </DeleteButton>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to='/'>
                        <StatusButton
                            onClick={() => {
                                update(ref(database, `users/${uid}/tasks/${toEditTask?.id}`), {
                                    isCompleted: !toEditTask?.isCompleted
                                }).then(() => {
                                    context?.dispatch({ type: ActionType.COMPLETE, payload: { id: toEditTask?.id } })
                                })
                            }}
                            style={{ backgroundColor: toEditTask?.isCompleted ? 'hsl(35, 85%, 86%)' : "hsl(173, 92%, 44%)" }}
                        >
                            {toEditTask?.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                        </StatusButton>
                    </Link>
                </ButtonWrapper>
                <Outlet />
            </SubWrapper>
        </Wrapper >
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

const ButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;

    @media ${MediaType.MOBILE_PORTRAIT} {
        justify-content: space-between;
        gap: 4px;
    }
`;

const Button = styled.button`
    border: 1px solid var(--color-gray-600);
    background-color: var(--color-accent);
    font-family: var(--font-sans-serif);
    color: white;
    text-align: center;
    padding: 8px 12px;
    border-radius: 4px;
    margin-top: 20px;
    transition: transform 100ms ease-out;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2),
            3px 6px 6px hsl(0deg 0% 0% / 0.2);

    &:hover{
        background-color: hsl(248deg, 60%, 40%);
    }

    &:active{
        transform: translateY(2px) scale(0.97);
        background-color: hsl(248deg, 60%, 40%);
    }

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-top: 16px;
    }
`;

const DeleteButton = styled(Button)`
    background-color: var(--color-incomplete);
    color: black;

    &:hover{
        background-color: hsl(1deg, 100%, 60%);
    }

    &:active{
        transform: translateY(2px) scale(0.95);
        background-color: hsl(1deg, 100%, 60%);
    }
`;

const StatusButton = styled(Button)`
    color: black;

    &:active{
        transform: translateY(2px) scale(0.97);
    }
`;

export default EditTask;