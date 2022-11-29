import { createContext } from "react";
import { FilterContextType, ToDoContextType } from "../types/types";

export const ToDoContext = createContext<ToDoContextType | null>(null);
export const FilterContext = createContext<FilterContextType | null>(null);