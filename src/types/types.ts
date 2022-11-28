export enum ActionType {
    ADD = 'ADD',
    EDIT = "EDIT",
    DELETE = "DELETE",
    COMPLETE = "COMPLETE",
    REARRANGE = "REARRANGE",
    SET = "SET"
}

export type Priority = "maybe" | "low" | "medium" | "high" | "must";

export interface ToDo {
    id: string,
    description: string,
    dateAdded: number,
    toCompleteDate: number | null,
    remarks: string,
    isCompleted: boolean,
    priority: Priority
}

export type ToDosState = ToDo[]

export type Payload = {
    id?: string,
    description?: string,
    dateAdded?: number,
    toCompleteDate?: number | null,
    remarks?: string,
    isCompleted?: boolean,
    priority?: Priority,
    sourceIndex?: number,
    destinationIndex?: number,
    tasks?: ToDosState
}

export interface ToDoAction {
    type: ActionType,
    payload: Payload,
}

export interface ToDoContextType {
    state: ToDosState,
    dispatch: React.Dispatch<ToDoAction>,
}

export type SortBy = 'date' | 'priority' | "";

export interface FilterState {
    text?: string,
    addStartDate?: number | null,
    addEndDate?: number | null,
    toCompleteStartDate?: number | null,
    toCompleteEndDate?: number | null,
    sortBy?: SortBy,
    priority?: string[],
}

export enum FilterActionType {
    TEXT = "SET TEXT FILTER",
    DATEADDEDRANGE = "SET RANGE FOR DATES OF TASK ADDED",
    TOCOMPLETEDATERANGE = "SET RANGE FOR TO COMPLETE DATES OF TASK ",
    SORTBYDATE = "SORT BY DATE",
    SORTBYPRIORITY = "SORT BY PRIORITY",
    SORTBYNOTHING = "SORT BY NOTHING",
    PRIORITY = "PRIORITY",
}

export type FilterAction = {
    type: FilterActionType,
    payload: Partial<FilterState>
}

export interface FilterContextType {
    filterState: FilterState,
    filterDispatch: React.Dispatch<FilterAction>,
}

export enum MediaType {
    "MOBILE_PORTRAIT" = "(max-width: 500px)",
    "MOBILE_LANDSCAPE" = "(max-height: 500px)",
    "TABLET_LANDSCAPE" = "(max-Width: 800px)",
    "FILTER_MOBILE" = "(max-width: 600px)",
}