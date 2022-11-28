import React, { useContext } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/styles.css";
import { FilterContext } from '../contexts/context';
import { FilterActionType, MediaType } from '../types/types';
import CheckBox from './CheckBox';
import styled from "styled-components";

const FilterList = () => {
    const context = useContext(FilterContext);

    const datePickerProps = {
        isClearable: true,
        showMonthDropdown: true,
        showYearDropdown: true,
        dateFormat: "dd/MM/yyyy",
    }

    return (
        <Wrapper>
            <Input
                type="text"
                placeholder='Search by text'
                value={context?.filterState.text}
                onChange={(e) => context?.filterDispatch({
                    type: FilterActionType.TEXT,
                    payload: { text: e.target.value }
                })}
            />
            <DateWrapper>
                <AddedDateWrapper>
                    <DatePicker
                        selectsRange={true}
                        startDate={(context?.filterState.addStartDate) ? new Date((context?.filterState.addStartDate)) : null}
                        endDate={(context?.filterState.addEndDate) ? new Date((context?.filterState.addEndDate)) : null}
                        onChange={(update: [Date | null, Date | null]) => {
                            const [startDate, endDate] = update;
                            return context?.filterDispatch({
                                type: FilterActionType.DATEADDEDRANGE,
                                payload: { addStartDate: startDate?.getTime(), addEndDate: endDate?.getTime() }
                            })
                        }}
                        placeholderText="Added Date Range"
                        {...datePickerProps}
                    />
                </AddedDateWrapper>

                <ToCompleteDateWrapper>
                    <DatePicker
                        selectsRange={true}
                        startDate={(context?.filterState.toCompleteStartDate) ? new Date((context?.filterState.toCompleteStartDate)) : null}
                        endDate={(context?.filterState.toCompleteEndDate) ? new Date((context?.filterState.toCompleteEndDate)) : null}
                        onChange={(update: [Date, Date]) => {
                            const [startDate, endDate] = update;
                            return context?.filterDispatch({
                                type: FilterActionType.TOCOMPLETEDATERANGE,
                                payload: { toCompleteStartDate: startDate?.getTime(), toCompleteEndDate: endDate?.getTime() }
                            })
                        }}
                        placeholderText="To Complete Date Range"
                        {...datePickerProps}
                    />
                </ToCompleteDateWrapper>
            </DateWrapper>

            <Container>
                <PriorityWrapper>
                    <h3>Priority :</h3>
                    <CheckBox value="maybe" label="Maybe" ></CheckBox>
                    <CheckBox value="low" label="Low" ></CheckBox>
                    <CheckBox value="medium" label="Medium" ></CheckBox>
                    <CheckBox value="high" label="High" ></CheckBox>
                    <CheckBox value="must" label="Must" ></CheckBox>
                </PriorityWrapper>

                <SortWrapper>
                    <h3>Sort By :</h3>
                    <Label>
                        <input type="checkbox" value="date" checked={context?.filterState.sortBy === "date"} onChange={() => {
                            if (context?.filterState.sortBy === "date") {
                                context?.filterDispatch({
                                    type: FilterActionType.SORTBYNOTHING,
                                    payload: { sortBy: '' }
                                })
                            } else {
                                context?.filterDispatch({
                                    type: FilterActionType.SORTBYDATE,
                                    payload: { sortBy: 'date' }
                                })
                            }
                        }} />
                        <span>Date</span>
                    </Label>
                    <Label>
                        <input type="checkbox" value="priority" checked={context?.filterState.sortBy === "priority"} onChange={() => {
                            if (context?.filterState.sortBy === "priority") {
                                context?.filterDispatch({
                                    type: FilterActionType.SORTBYNOTHING,
                                    payload: { sortBy: '' }
                                })
                            } else {
                                context?.filterDispatch({
                                    type: FilterActionType.SORTBYPRIORITY,
                                    payload: { sortBy: 'priority' }
                                })
                            }
                        }} />
                        <span>Priority</span>
                    </Label>
                </SortWrapper>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    font-family: var(--font-sans-serif);
    padding: 16px;
    background-color: var(--color-secondary-light);
    border: 1px solid var(--color-gray-900);
    border-radius: 4px;
    margin-bottom: 24px;
    box-shadow: inset 1px 2px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 12px;
        margin-bottom: 20px;
    }
`;

const DateWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 12px;
    margin-bottom: 16px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        flex-direction: column;
        margin-bottom: 12px;
    }
`;

const AddedDateWrapper = styled.div`
    width: 100%;
    min-width: 180px;
`;

const ToCompleteDateWrapper = styled.div`
    width: 100%;
    min-width: 180px;
`;

const Label = styled.label`
    display: flex;
    gap: 4px;
    align-items: center;

    & > input {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }
`;

const Container = styled.div`
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    flex-wrap: wrap;

    @media ${MediaType.MOBILE_PORTRAIT} {
        gap: 12px;
    }
`;

const SortWrapper = styled.div`
    display: flex;
    gap: 12px;
    height: 40px;
    align-items: center;
    width: fit-content;
    padding: 12px;
    flex: 2;
    border: 1px solid var(--color-gray-800);
    border-radius: 4px;
    background-color: white;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.FILTER_MOBILE} {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-content: center;
        padding-right: 0;
    }

    & > h3 {
        font-weight: 600;
        display: flex;
        flex: 0 0 fit-content;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid var(--color-gray-800);
    border-radius: 4px;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-bottom: 12px;
    }
`;

const PriorityWrapper = styled.div`
    display: flex;
    gap: 12px;
    height: 40px;
    align-items: center;
    justify-content: flex-start;
    min-width: fit-content;
    padding: 12px;
    flex: 3;
    border: 1px solid var(--color-gray-800);
    border-radius: 4px;
    background-color: white;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.FILTER_MOBILE} {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 100%;
        row-gap: 4px;
        align-content: center;
        justify-content: center;
        padding: 4px 0 4px 12px;
    }

    & > h3 {
        font-weight: 600;
        display: flex;
        flex: 0 0 fit-content;
    }
`;

export default FilterList;