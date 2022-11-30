import React, { useContext, useReducer, useState, useEffect } from "react";
import { ToDoContext, FilterContext } from "../contexts/context";;
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getCompletedTasks, getIncompleteTasks, getTaskDescriptionText } from "../utils/utils";
import FilterList from "./FilterList";
import Tasks from "./Tasks";
import filtersReducer from "../reducers/filtersReducer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ActionType, FilterActionType, MediaType, ToDosState } from "../types/types";
import database from '../firebase/firebase';
import { ref, onValue } from "firebase/database";
import { AuthContext } from '../contexts/AuthContext';


const Dashboard: React.FC = () => {
    const context = useContext(ToDoContext);
    const authContext = useContext(AuthContext);
    const uid = authContext?.currentUser?.uid;
    const [loading, setLoading] = useState(true);

    let initialTasks: ToDosState = [];
    useEffect(() => {
        onValue(ref(database, `users/${uid}/tasks`), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                initialTasks.push({
                    id: childSnapshot.key,
                    toCompleteDate: null,
                    ...childSnapshot.val(),
                })
            })
            context?.dispatch({ type: ActionType.SET, payload: { tasks: initialTasks } });
            setLoading(false);
        }, { onlyOnce: true });
    }, [])

    const [filterState, filterDispatch] = useReducer(filtersReducer, {
        text: "",
        addStartDate: null,
        addEndDate: null,
        toCompleteStartDate: null,
        toCompleteEndDate: null,
        priority: [],
        sortBy: '',
    });

    const filterValue = { filterState, filterDispatch };
    const [columnOrder, setColumnOrder] = useState(['incomplete', 'completed']);

    function onDragEnd(result: any) {
        const { source, destination, type, draggableId } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index && type === "DEFAULT") {
            return;
        }

        if (destination.droppableId !== source.droppableId) {
            context?.dispatch({ type: ActionType.COMPLETE, payload: { id: result.draggableId } });

            const sourceIndex = context?.state.findIndex(item => item.id === draggableId);
            let destinationIndex;

            if (destination.droppableId === 'completedTasks') {
                let tasks = getCompletedTasks(context?.state);
                const destinationItem = tasks ? tasks[destination.index] : null;
                destinationIndex = context?.state.findIndex(item => item === destinationItem);
            } else {
                let tasks = getIncompleteTasks(context?.state);
                const destinationItem = tasks ? tasks[destination.index] : null;
                destinationIndex = context?.state.findIndex(item => item === destinationItem);
            }

            if ((destinationIndex || 0) > (sourceIndex || 0)) {
                destinationIndex = (destinationIndex || 0) - 1;
            }

            filterDispatch({ type: FilterActionType.SORTBYNOTHING, payload: { sortBy: '' } });
            context?.dispatch({ type: ActionType.REARRANGE, payload: { sourceIndex, destinationIndex } });
        }

        if (type === "column") {
            const newColumnOrder = Array.from(columnOrder);
            const [item] = newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, item);
            console.log({ newColumnOrder, columnOrder })
            setColumnOrder(newColumnOrder);
        }

        if (type === "DEFAULT") {
            if (source.droppableId === destination.droppableId && source.index !== destination.index) {
                const sourceIndex = context?.state.findIndex(item => item.id === draggableId);
                let destinationIndex;

                if (source.droppableId === 'completedTasks') {
                    let tasks = getCompletedTasks(context?.state);
                    const destinationItem = tasks ? tasks[destination.index] : null;
                    destinationIndex = context?.state.findIndex(item => item === destinationItem);
                } else {
                    let tasks = getIncompleteTasks(context?.state);
                    const destinationItem = tasks ? tasks[destination.index] : null;
                    destinationIndex = context?.state.findIndex(item => item === destinationItem);
                }

                filterDispatch({ type: FilterActionType.SORTBYNOTHING, payload: { sortBy: '' } });
                context?.dispatch({ type: ActionType.REARRANGE, payload: { sourceIndex, destinationIndex } });
            }
        }
    }

    return (
        <Wrapper>
            <SubWrapper>
                <FilterContext.Provider value={filterValue}>
                    <FilterList />
                    <TasksDescription>{getTaskDescriptionText(filterState)}</TasksDescription>
                    {
                        loading && !initialTasks
                            ? <p style={{ marginBottom: "16px" }}>Loading....</p>
                            : (<DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="tasks" direction="horizontal" type="column">
                                    {(provided, snapshot) => (
                                        <TasksWrapper
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                backgroundColor: snapshot.isDraggingOver ?
                                                    "hsl(35, 85%, 96%)"
                                                    : "hsl(173, 100%, 99%)"
                                            }}
                                        >
                                            {columnOrder.map((column, index) => {
                                                return <Tasks key={column} todos={context?.state} id={column} index={index} />
                                            })}
                                            {provided.placeholder}
                                        </TasksWrapper>

                                    )}
                                </Droppable>
                            </DragDropContext>)
                    }
                    <Link style={{ textDecoration: 'none' }} to="/dashboard/add">
                        <Button> Add New Task </Button>
                    </Link>
                </FilterContext.Provider >
            </SubWrapper>
        </Wrapper >
    )
}

const Wrapper = styled.div`
    width: 100%;
    font-family: var(--font-sans-serif);
    display: flex;
    justify-content: center;
    background-color: var(--color-secondary-light);
    box-shadow: inset 0px 4px 4px hsl(0deg 0% 0% / 0.4);
`;

const SubWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 24px 32px;
    background-color: var(--color-primary-light);
    box-shadow: inset 0px 4px 4px hsl(0deg 0% 0% / 0.4);

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 20px 16px;
    }
`;

const TasksDescription = styled.h2`
    font-weight: 550;
    line-height: 1;
    font-size: 2rem;
    background-color: var(--color-primary-light);
    padding: 20px 16px 24px;
    border: 1px solid var(--color-gray-900);
    border-radius: 4px;
    margin-bottom: 24px;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-bottom: 20px;
        padding: 16px 12px;
    }
`;

const TasksWrapper = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 24px;

    @media ${MediaType.TABLET_LANDSCAPE} {
        flex-direction: column;
        margin-bottom: 20px;
    }
`;

const Button = styled.button`
    border: 1px solid var(--color-gray-600);
    background-color: var(--color-primary);
    font-family: var(--font-sans-serif);
    text-align: center;
    padding: 8px 12px;
    border-radius: 4px;
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
`;

export default Dashboard;