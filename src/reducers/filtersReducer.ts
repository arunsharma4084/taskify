import { FilterState, FilterActionType, FilterAction, SortBy } from "../types/types";

export default function filtersReducer(state: FilterState, action: FilterAction): FilterState {
    const { type, payload } = action;

    switch (type) {
        case FilterActionType.TEXT: {
            const text = payload.text;
            const newState = { ...state, text };
            return newState;
        }

        case FilterActionType.DATEADDEDRANGE: {
            const { addStartDate, addEndDate } = payload;
            const newState = { ...state, addStartDate, addEndDate };
            return newState;
        }

        case FilterActionType.TOCOMPLETEDATERANGE: {
            const { toCompleteStartDate, toCompleteEndDate } = payload;
            const newState = { ...state, toCompleteStartDate, toCompleteEndDate };
            return newState;
        }

        case FilterActionType.SORTBYDATE: {
            const sortBy = 'date' as SortBy;
            const newState = { ...state, sortBy };
            return newState;
        }

        case FilterActionType.SORTBYPRIORITY: {
            const sortBy = 'priority' as SortBy;
            const newState = { ...state, sortBy };
            return newState;
        }

        case FilterActionType.SORTBYNOTHING: {
            const { sortBy } = payload;
            const newState = { ...state, sortBy };
            return newState;
        }

        case FilterActionType.PRIORITY: {
            const { priority } = payload;
            const newState = { ...state, priority };
            return newState;
        }

        default: {
            return state;
        }
    }
}