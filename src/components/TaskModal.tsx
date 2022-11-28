import React, { useContext } from 'react';
import styled from "styled-components";
import { ActionType, MediaType, ToDo } from '../types/types';
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ToDoContext } from '../contexts/context';
import ReactModal from "react-modal";
import database from '../firebase/firebase';
import { ref, remove, update } from "firebase/database";
import { AuthContext } from '../contexts/AuthContext';
import "../styles/styles.css";

interface TaskModalProps {
    todo: ToDo | undefined,
    isOpen: boolean;
    closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ todo, isOpen, closeModal }): JSX.Element => {
    const context = useContext(ToDoContext);
    ReactModal.setAppElement('#root');

    const authContext = useContext(AuthContext);
    const uid = authContext?.currentUser?.uid;

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: todo?.isCompleted ? "hsl(173, 92%, 70%)" : "hsl(35, 85%, 92%)",
            padding: 0,
            border: "1px solid hsl(210deg, 12%, 55%)",
            boxShadow: '2px 4px 4px hsl(0deg 0% 0% / 0.2)',
        },
        overlay: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Task Details"
            closeTimeoutMS={350}
        >
            <Wrapper style={{ backgroundColor: todo?.isCompleted ? "hsl(173, 92%, 70%)" : "hsl(35, 85%, 92%)" }}>
                <TaskWrapper>
                    <Container>
                        <Headers>Task</Headers>
                        <Text>{todo?.description}</Text>
                    </Container>
                    <Container>
                        <Headers>Added On</Headers>
                        <Text>{todo?.dateAdded ? `${format(new Date(todo?.dateAdded), 'dd MMM, Y')}` : "N/A"} </Text>
                    </Container>
                    <Container>
                        <Headers>To Be Completed Till</Headers>
                        <Text>
                            {todo?.toCompleteDate ? `${format(new Date(todo?.toCompleteDate), 'dd MMM, Y')}` : "N/A"}
                        </Text>
                    </Container>
                    <Container>
                        <Headers>Priority</Headers>
                        <Text>{todo?.priority.toUpperCase()}</Text>
                    </Container>
                    <Container>
                        <Headers>Remarks</Headers>
                        <Text>{todo?.remarks ? todo.remarks : "N/A"}</Text>
                    </Container>
                    <Container>
                        <Headers>Status</Headers>
                        <Text>
                            {todo?.isCompleted ? "Complete" : "Incomplete"}
                            <StatusButton
                                onClick={() => {
                                    update(ref(database, `users/${uid}/tasks/${todo?.id}`), {
                                        isCompleted: !todo?.isCompleted
                                    }).then(() => {
                                        context?.dispatch({ type: ActionType.COMPLETE, payload: { id: todo?.id } })
                                    })
                                }}
                                style={{ backgroundColor: todo?.isCompleted ? 'hsl(35, 85%, 86%)' : "hsl(173, 92%, 44%)" }}
                            >
                                {todo?.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                            </StatusButton>
                        </Text>
                    </Container>
                </TaskWrapper>

                <ButtonWrapper>
                    <Link style={{ textDecoration: "none", color: 'black' }} to={`/dashboard/edit/${todo?.id}`}>
                        <Button>Edit Task</Button>
                    </Link>

                    <DeleteButton onClick={() => {
                        remove(ref(database, `users/${uid}/tasks/${todo?.id}`)).then(() => {
                            context?.dispatch({ type: ActionType.DELETE, payload: { id: todo?.id } })
                        })
                    }}>
                        Delete Task
                    </DeleteButton>

                    <CloseButton onClick={closeModal}>Close</CloseButton>
                </ButtonWrapper>
            </Wrapper >
        </ReactModal>
    )
}

const Wrapper = styled.div`
    width: 600px;
    height: 100%;
    max-height: 80vh;
    border: 1px solid var(--color-gray-600);
    border-radius: 4px;
    font-family: 'Asap', sans-serif;
    padding-top: 8px;
    box-shadow: inset 2px 4px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        width: 100%;
        padding-top: 4px;
    }

    @media ${MediaType.MOBILE_LANDSCAPE} {
        border: none;
    }
`;

const TaskWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, auto);
    column-gap: 12px;
`;

const Container = styled.div`
    display: flex;
    padding: 8px 16px;
    align-items: center;

    &:last-of-type{
        padding-bottom: 16px;

        @media ${MediaType.MOBILE_PORTRAIT} {
            padding-bottom: 12px;
        }
    }

    @media ${MediaType.MOBILE_PORTRAIT} {
        flex-direction: column;
        border-bottom: 1px solid var(--color-gray-800);
        align-items: flex-start;
        gap: 4px;
        padding: 8px 12px;
    }
`;

const Text = styled.p`
    font-size: 1.2rem;
    line-height: 1.2;
    width: 100%;
    hyphens: auto;
    flex: 1;
`;

const Headers = styled.h3`
    line-height: 1;
    font-weight: 550;
    font-size: 1.2rem;
    min-width: 200px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        font-size: 1.1rem;
    }
`;

const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
    border-top: 1px solid var(--color-gray-600);
    box-shadow: inset 0px 2px 2px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 12px;
        border: none;
        gap: 12px;
    }
`;

const Button = styled.button`
    border: 1px solid var(--color-gray-600);
    background-color: var(--color-accent);
    color: white;
    font-family: var(--font-sans-serif);
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    transition: transform 100ms ease-out;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2),
            3px 6px 6px hsl(0deg 0% 0% / 0.2);

    &:hover{
        background-color: hsl(248deg, 60%, 40%);
    }

    &:active{
        transform: translateY(2px) scale(0.98);
        background-color: hsl(248deg, 60%, 40%);
    }
`;

const CloseButton = styled(Button)`
    background-color: var(--color-gray-100);

    &:hover{
        background-color: hsl(0deg, 00%, 30%);
    }

    &:active{
        transform: translateY(2px) scale(0.98);
        background-color: hsl(0deg, 00%, 30%);
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
    display: inline-block;
    color: black;
    padding: 4px 8px;
    width: fit-content;
    margin-left: 12px;
    font-size: 1rem;

    &:active{
        transform: translateY(2px) scale(0.95);
    }
`;

export default TaskModal;