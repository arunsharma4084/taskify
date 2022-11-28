import React, { useContext, useState, useMemo } from "react";
import { MdEdit, MdDone, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ToDoContext } from "../contexts/context";
import { ActionType, ToDo } from "../types/types";
import { format } from "date-fns";
import { Draggable } from "react-beautiful-dnd";
import ReactTooltip from "react-tooltip";
import "../styles/styles.css";
import TaskModal from "./TaskModal";
import database from '../firebase/firebase';
import { ref, remove, update } from "firebase/database";
import { AuthContext } from "../contexts/AuthContext";

interface TaskProps {
    index: number
    todo: ToDo
}

function getColor(complete: boolean): string {
    if (complete) return `hsl(173, 92%, 44%)`;
    else return `hsl(35, 85%, 86%)`;
}

function getDraggingColor(complete: boolean): string {
    if (complete) return `hsla(173, 92%, 44%, 0.3)`;
    else return `hsla(35, 85%, 86%, 0.5)`;
}

const Task: React.FC<TaskProps> = ({ index, todo }): JSX.Element => {
    const context = useContext(ToDoContext);
    const [isOpen, setIsOpen] = useState(false);
    const authContext = useContext(AuthContext);
    const uid = authContext?.currentUser?.uid;

    function closeModal() {
        setIsOpen(false)
    }

    const memoisedIcons = useMemo(() => {
        ReactTooltip.rebuild();
        return <IconWrapper>
            <Icons>
                <Link style={{ textDecoration: "none", color: 'black' }} to={`/dashboard/edit/${todo.id}`}>
                    <MdEdit data-tip="Edit Task" size={'32px'} data-for={todo.id} />
                </Link>
            </Icons>

            <Icons onClick={() => {
                update(ref(database, `users/${uid}/tasks/${todo.id}`), {
                    isCompleted: !todo.isCompleted
                }).then(() => {
                    context?.dispatch({ type: ActionType.COMPLETE, payload: { id: todo.id } })
                })
            }}>
                <MdDone data-tip={todo.isCompleted ? "Mark as Incomplete" : "Mark as Complete"} size={'32px'} data-for={todo.id} />
            </Icons>

            <Icons onClick={() => {
                remove(ref(database, `users/${uid}/tasks/${todo.id}`)).then(() => {
                    context?.dispatch({ type: ActionType.DELETE, payload: { id: todo.id } })
                })
            }}>
                <MdDelete data-tip="Delete Task" size={'32px'} data-for={todo.id} />
            </Icons>
            <ReactTooltip id={todo.id} className="tooltip" effect="solid" border borderColor="black" backgroundColor="hsl(210deg, 25%, 96%)" textColor="black" place="top" />
        </IconWrapper>
    }, [])

    return (
        <Draggable key={todo.id} draggableId={todo.id} index={index}>
            {(provided: any, snapshot: any) => (
                <Wrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        backgroundColor: snapshot.isDragging ?
                            getDraggingColor(todo.isCompleted) :
                            getColor(todo.isCompleted),
                        ...provided.draggableProps.style
                    }}
                >
                    <TextWrapper>
                        <Description>
                            <Button onClick={() => setIsOpen(true)}>
                                <span data-tip="Click to Expand">{todo.description}</span>
                            </Button>
                        </Description>
                        <DateText>{todo.toCompleteDate ? `${format(new Date(todo.dateAdded), 'dd MMM, Y')} - ${format(new Date(todo.toCompleteDate), 'dd MMM, Y')}` : `${format(new Date(todo.dateAdded), 'dd MMM, Y')} - NA`}</DateText>
                    </TextWrapper >

                    {memoisedIcons}
                    <TaskModal todo={todo} isOpen={isOpen} closeModal={closeModal} />
                </Wrapper >
            )}
        </Draggable>
    )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 8px;
  padding-right: 2px;
  padding-left: 12px;
  display: flex;
  border: 1px solid var(--color-gray-700);
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);
`;

const TextWrapper = styled.div`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    flex: 1;    
`;

const Description = styled.p`
    font-family: 'Asap', sans-serif;
    font-size: 1.1rem;
    line-height: 1.2;
    width: 100%;
`;

const Button = styled.button`
    background: transparent;
    border: none;
    text-align: left;
    padding: 0;

    & > span{
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
`;

const DateText = styled(Description)`
    font-size: 0.8rem;
    font-style: italic;
    color: var(--color-accent);
`;

const IconWrapper = styled.div`
    display: flex;
    gap: 4px;
    margin-right: 0;
    flex: 0 0 110px;
`;

const Icons = styled.button`
    cursor: pointer;
    border: none;
    background-color: inherit;
    margin: 0;

    &:link {
        text-decoration: none;
        color: black;
    }
`;

export default Task;