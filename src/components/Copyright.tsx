import React from 'react'
import styled from 'styled-components';
import { MediaType } from '../types/types';

const Copyright: React.FC = () => {
    return (
        <Wrapper>
            <SubWrapper>
                <Content>Copyright © 2022 <span>Arun Sharma</span>. All rights reserved.</Content>
            </SubWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: var(--color-gray-700);
    background-color: var(--color-gray-50);
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SubWrapper = styled.div`
    width: 100%;
    max-width: 1200px;  
    padding: 12px 32px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 12px 16px;
    }
`;

const Content = styled.p`
    font-size: 0.8rem;
    font-family: var(--font-sans-serif);
 
    & > span {
        color: var(--color-gray-1000);
    }
`;

export default Copyright