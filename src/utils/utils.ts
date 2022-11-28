import { FilterState, Priority, ToDo, ToDosState } from "../types/types";

export function getIncompleteTasks(toDos: ToDosState | undefined): ToDosState | undefined {
    return toDos?.filter((toDo) => !toDo.isCompleted)
}

export function getCompletedTasks(toDos: ToDosState | undefined): ToDosState | undefined {
    return toDos?.filter((toDo) => toDo.isCompleted)
}

function matchStartDate(task: ToDo, startDate: number | undefined | null): boolean {
    if (startDate) {
        return task.dateAdded >= startDate
    } else {
        return true;
    }
}

function matchEndDate(task: ToDo, endDate: number | undefined | null, startDate: number | undefined | null): boolean {
    if (endDate && startDate) {
        if (endDate === startDate) {
            return task.dateAdded <= endDate + 86400000
        } else {
            return task.dateAdded <= endDate
        }
    } else {
        return true;
    }
}

function matchCompleteStartDate(task: ToDo, startDate: number | undefined | null): boolean {
    if (startDate && task.toCompleteDate) {
        return task.toCompleteDate >= startDate
    } else if (startDate && !task.toCompleteDate) {
        return false;
    } else {
        return true;
    }
}

function matchCompleteEndDate(task: ToDo, endDate: number | undefined | null, startDate: number | undefined | null): boolean {
    if (endDate && task.toCompleteDate) {
        if (endDate === startDate) {
            return task.toCompleteDate <= endDate + 86400000;
        }
        return task.toCompleteDate <= endDate
    } else if (endDate && !task.toCompleteDate) {
        return false;
    } else {
        return true;
    }
}

function getNumberFromPriority(p: Priority): number {
    if (p === 'maybe') return 1;
    else if (p === 'low') return 2;
    else if (p === 'medium') return 3;
    else if (p === 'high') return 4;
    else if (p === 'must') return 5;
    else return 0;
}

export function getFilteredTasks(toDos: ToDosState | undefined, filters: FilterState | undefined): ToDosState | undefined {

    if (!filters) return;
    const { text, addStartDate, addEndDate, toCompleteStartDate, toCompleteEndDate, sortBy, priority } = filters;

    if (toDos) {
        return toDos?.filter((todo) => {
            const textMatch = todo.description.toLowerCase().includes(text?.toLowerCase() ?? "");
            const addStartDateMatch = matchStartDate(todo, addStartDate);
            const addEndDateMatch = matchEndDate(todo, addEndDate, addStartDate);
            const toCompleteStartDateMatch = matchCompleteStartDate(todo, toCompleteStartDate);;
            const toCompleteEndDateMatch = matchCompleteEndDate(todo, toCompleteEndDate, toCompleteStartDate);;
            const priorityMatch = priority?.includes(todo.priority) || priority?.length === 0;

            return textMatch && addStartDateMatch && addEndDateMatch && toCompleteStartDateMatch
                && toCompleteEndDateMatch && priorityMatch;
        }).sort((a: ToDo, b: ToDo) => {
            if (sortBy === 'priority') {
                return getNumberFromPriority(b.priority) - getNumberFromPriority(a.priority);
            } else if (sortBy === 'date') {
                return a.dateAdded - b.dateAdded;
            } else {
                return 0;
            }
        })
    }
}

export function getTaskDescriptionText(filterState: FilterState) {
    if (filterState.text) {
        return `Tasks containing "${filterState.text}"`;
    } else {
        return "All Tasks";
    }
}
