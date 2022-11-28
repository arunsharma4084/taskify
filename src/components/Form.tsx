import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/styles.css";
import { ToDo, Priority, MediaType } from '../types/types';
import styled from "styled-components";

interface FormProps {
    toDo?: ToDo,
    onSubmit: (formData: any) => void
}

const Form = ({ toDo, onSubmit }: FormProps) => {

    const [formData, setFormData] = useState({
        id: toDo?.id ?? "",
        description: toDo?.description ?? "",
        dateAdded: toDo?.dateAdded ?? Date.now(),
        toCompleteDate: toDo?.toCompleteDate ?? null,
        remarks: toDo?.remarks ?? "",
        priority: toDo?.priority ?? "medium" as Priority,
        isCompleted: toDo?.isCompleted ?? false,
        error: ""
    })

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formData.description) {
            setFormData((prev) => ({ ...prev, error: "Please provide description" }))
        } else {
            setFormData((prev) => ({ ...prev, error: "" }));
            onSubmit({
                ...formData,
                error: null,
            })
        }
    }

    const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            return {
                ...prev,
                description: (event.target as HTMLInputElement).value
            }
        })
    }

    const handleRemarksChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => {
            return {
                ...prev,
                remarks: (event.target as HTMLTextAreaElement).value
            }
        })
    }

    const onPriorityChange = (event: React.FormEvent<HTMLInputElement>) => {
        const priority = (event.target as HTMLInputElement).value as Priority;
        setFormData((prev) => {
            return {
                ...prev,
                priority
            }
        })
    }

    const datePickerProps = {
        showMonthDropdown: true,
        showYearDropdown: true,
        dateFormat: "dd/MM/yyyy"
    }

    return (
        <Wrapper action="" id='task-form' onSubmit={onFormSubmit}>
            {formData.error && <ErrorMessage>{formData.error}</ErrorMessage>}
            <Input
                type="text"
                autoFocus
                placeholder='Description'
                value={formData.description}
                onChange={handleDescriptionChange}
            />

            <DateWrapper>
                <DatePicker
                    selected={new Date(formData.dateAdded)}
                    onChange={(date: Date) => {
                        if (date.getTime() > Date.now()) {
                            return setFormData((prev) => ({ ...prev, error: "Adding Tasks in future is not allowed.", dateAdded: Date.now() }))
                        } else {
                            setFormData((prev) => ({ ...prev, error: "" }));
                            return setFormData((prev) => ({ ...prev, dateAdded: date.getTime() }))
                        }
                    }}
                    placeholderText="dd/mm/yyyy"
                    {...datePickerProps}
                />

                <DatePicker
                    selected={formData.toCompleteDate ? new Date(formData.toCompleteDate) : null}
                    onChange={(date: Date) => {
                        if (!date) {
                            return setFormData((prev) => ({ ...prev, toCompleteDate: null, error: "" }));
                        }
                        if (date.getTime() + 86399999 < formData.dateAdded) {
                            return setFormData((prev) => ({ ...prev, error: "Completion Date of a Task can not be less than the Added Date.", toCompleteDate: null }))
                        } else {
                            return setFormData((prev) => ({ ...prev, toCompleteDate: date.getTime(), error: "" }))
                        }
                    }}
                    placeholderText="Pick a Completion Date (Optional)"
                    isClearable={true}
                    strictParsing
                    {...datePickerProps}
                />
            </DateWrapper>

            <RadioButtonGroup>
                <h3>Priority :</h3>
                <Label>
                    <input type="radio" value="maybe" checked={formData.priority === "maybe"} onChange={onPriorityChange} />
                    Maybe
                </Label>
                <Label>
                    <input type="radio" value="low" checked={formData.priority === "low"} onChange={onPriorityChange} />
                    Low
                </Label>
                <Label>
                    <input type="radio" value="medium" checked={formData.priority === "medium"} onChange={onPriorityChange} />
                    Medium
                </Label>
                <Label>
                    <input type="radio" value="high" checked={formData.priority === "high"} onChange={onPriorityChange} />
                    High
                </Label>
                <Label>
                    <input type="radio" value="must" checked={formData.priority === "must"} onChange={onPriorityChange} />
                    Must
                </Label>
            </RadioButtonGroup>

            <TextArea
                name="remarks"
                id="remarks"
                value={formData.remarks}
                onChange={handleRemarksChange}
                placeholder="Remarks (optional)"
            >
            </TextArea>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    width: 100%;
    font-family: var(--font-sans-serif);
`;

const ErrorMessage = styled.p`
    color: red;
    font-family: var(--font-sans-serif);
    font-size: 0.9rem;
    margin-bottom: 8px;
    padding: 0 8px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid var(--color-gray-800);
    border-radius: 4px;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-bottom: 16px;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    border: 1px solid var(--color-gray-800);
    border-radius: 4px;
    padding: 12px;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);
`;

const DateWrapper = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 20px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-bottom: 16px;
        flex-direction: column;
        gap: 16px;
    }
`;

const Label = styled.label`
    display: inline-block;

    & > input {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }
`;

const RadioButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    width: fit-content;
    padding: 12px;
    border: 1px solid var(--color-gray-800);
    border-radius: 4px;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.2),
            2px 4px 4px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-bottom: 16px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 100%;
        row-gap: 4px;
        align-content: center;
        justify-content: center;
        padding: 4px 0 4px 12px;
        width: 100%;
    }

    & > h3 {
        font-weight: 600;
    }
`;

export default Form;