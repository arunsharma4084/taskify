import { ToDosState, ActionType, ToDoAction } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export default function toDoReducer(state: ToDosState, action: ToDoAction): ToDosState {
    const { type, payload } = action;

    switch (type) {
        case ActionType.ADD: {
            const { id = uuidv4(), description = '', dateAdded = Date.now(), toCompleteDate = null, remarks = '', priority = "medium" } = payload;
            const newState = [...state,
            {
                id,
                description,
                dateAdded,
                toCompleteDate,
                remarks,
                priority,
                isCompleted: false
            }];
            return newState;
        }

        case ActionType.EDIT: {
            const id = payload.id;
            const newState = state.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, ...payload };
                } else {
                    return todo;
                }
            });
            console.log(newState);
            return newState;
        }

        case ActionType.DELETE: {
            const { id } = payload;
            const newState = state.filter((todo) => {
                return id !== todo.id
            });
            return newState;
        }

        case ActionType.COMPLETE: {
            const { id } = payload;
            const newState = state.map((todo) => {
                if (id === todo.id) {
                    return { ...todo, isCompleted: !todo.isCompleted }
                } else {
                    return { ...todo }
                }
            });
            return newState;
        }

        case ActionType.REARRANGE: {
            const { sourceIndex, destinationIndex } = payload;
            let index;

            if (destinationIndex === -1) {
                index = state.length;
            } else {
                index = destinationIndex;
            }

            let newState = state;
            const newArray = Array.from(state);
            const [item] = newArray.splice(sourceIndex || 0, 1);
            newArray.splice(index || 0, 0, item);
            newState = newArray;
            return newState;
        }

        case ActionType.SET: {
            const { tasks } = payload;
            const newState = tasks || [];
            // localStorage.setItem("storedState", JSON.stringify(newState));
            // set(ref(database, `users/${uid}/tasks`), newState);
            return newState;
        }

        default: {
            return state;
        }
    }
}