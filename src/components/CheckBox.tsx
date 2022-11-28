import React from 'react'
import styled from 'styled-components';
import { FilterContext } from '../contexts/context';
import { FilterActionType } from '../types/types';

interface checkBoxProps {
    label: string,
    value: string,
}

const CheckBox: React.FC<checkBoxProps> = ({ label, value }) => {
    const context = React.useContext(FilterContext);
    const condition = context?.filterState.priority?.includes(value);

    const [isChecked, setIsChecked] = React.useState(condition);

    React.useEffect(() => {

        if (isChecked && !condition) {
            context?.filterState.priority?.push(value);
            context?.filterDispatch({
                type: FilterActionType.PRIORITY,
                payload: { priority: context?.filterState.priority }
            })
        }

        if ((!isChecked) && condition) {
            context?.filterDispatch({
                type: FilterActionType.PRIORITY,
                payload: { priority: context?.filterState.priority?.filter(item => item !== value) }
            })
        }
    }, [isChecked]);

    function onCheckedChange() {
        setIsChecked((prev) => {
            return !prev
        });
    }

    return (
        <Label>
            <Input type="checkbox" value={value} onChange={onCheckedChange} checked={isChecked} />
            <span>{label}</span>
        </Label>
    )
}

const Label = styled.label`
    display: flex;
    gap: 4px;
    font-family: 'Asap', sans-serif;
    font-size: 1rem;
    align-items: center;
`;

const Input = styled.input`
    width: 16px;
    height: 16px;
`;

export default CheckBox