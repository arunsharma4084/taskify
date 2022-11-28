import React from 'react';
import styled from 'styled-components';
import logo from "../../public/images/logo.png";
import { MediaType } from '../types/types';

const Logo: React.FC = (): JSX.Element => {
    return (
        <Wrapper>
            <Image src={logo} alt="logo" />
            <Title>Taskify</Title>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 0;
    padding-bottom: 20px;
`;

const Image = styled.img`
    display: block;
    width: 52px;
    height: 52px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        width: 45px;
        height: 45px;
    }
`;

const Title = styled.h1`
    color: var(--color-gray-1000);
    font-family: 'Playball', var(--font-sans-serif);
    font-weight: 600;
    font-size: 3.5rem;
    line-height: 1;

    @media ${MediaType.MOBILE_PORTRAIT} {
        font-size: 3rem;
    }
`;

export default Logo;