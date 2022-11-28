import React, { useContext, useMemo } from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { MediaType, ToDosState } from "../types/types";
import { FilterContext, ToDoContext } from "../contexts/context";
import { getFilteredTasks, getCompletedTasks, getIncompleteTasks } from "../utils/utils";

interface TasksProps {
    todos: ToDosState | undefined,
    id: string,
    index: number,
}

const Tasks: React.FC<TasksProps> = ({ todos, id, index }): JSX.Element => {
    const context = useContext(ToDoContext);
    const filterContext = useContext(FilterContext);
    const heading = id === "incomplete" ? "Incomplete Tasks" : "Completed Tasks";
    const droppableId = id === "incomplete" ? "incompleteTasks" : "completedTasks";

    let filteredTasks = getFilteredTasks(context?.state, filterContext?.filterState);
    let completedTasks = getCompletedTasks(filteredTasks);
    let incompleteTasks = getIncompleteTasks(filteredTasks);
    let arrangedTasks = id === "incomplete" ? incompleteTasks : completedTasks;

    const memoisedTasks = useMemo(() => {
        return arrangedTasks?.map((toDo, index) => (
            <Task
                todo={toDo}
                index={index}
                key={toDo.id}
            />
        ))
    }, [arrangedTasks])

    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided: any, snapshot: any) => (
                <TasksWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                        backgroundColor: snapshot.isDragging ?
                            id === 'incomplete' ? "hsl(35, 85%, 86%)" : "hsl(173, 92%, 44%)"
                            : "hsl(210deg, 25%, 96%)"
                    }}
                >
                    <Heading {...provided.dragHandleProps}>{heading}</Heading>
                    <Droppable droppableId={droppableId}>
                        {(provided: any, snapshot: any) => (
                            <div  {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    backgroundColor: snapshot.isDraggingOver ?
                                        id === 'incomplete' ? "hsla(35, 85%, 86%, 0.25)" : "hsla(173, 92%, 44%, 0.25)"
                                        : "hsl(210deg, 25%, 96%)"
                                }}
                            >
                                {arrangedTasks?.length === 0 ?
                                    <Message
                                        style={{
                                            backgroundColor: id === 'incomplete' ? "hsl(35, 85%, 86%)" : "hsl(173, 92%, 44%)"
                                        }}
                                    >No Tasks Found</Message>
                                    : memoisedTasks}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </TasksWrapper>
            )}
        </Draggable>
    )
}

const Heading = styled.h2`
    font-weight: 600;
    margin-bottom: 12px;
    line-height: 1;
`;

const TasksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid var(--color-gray-800);
    border-radius: 4px;
    font-family: var(--font-sans-serif);
    width: calc((100% - 20px) / 2);
    height: 100%;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 12px;
    }
`;

const Message = styled.p`
    text-align: center;
    border: 1px solid var(--color-gray-600);
    border-radius: 4px;
    height: 60px;
    display: grid;
    place-content: center;
    background-color: var(--color-gray-1000);
`;

export default Tasks;