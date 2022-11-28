import React from 'react';
import styled from 'styled-components';
import { MediaType } from '../types/types';
import Footer from './Footer';
import Header from './Header';

const ErrorPage: React.FC = (): JSX.Element => {
    return (
        <Wrapper>
            <Header />
            <SubWrapper>
                <InnerWrapper>
                    <Heading>Oops!</Heading>
                    <Message>There is nothing here.</Message>
                </InnerWrapper>
            </SubWrapper>
            <Footer />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    font-family: var(--font-sans-serif);
`;

const SubWrapper = styled.div`
    width: 100%;
    background-color: var(--color-primary-light);
    display: flex;
    justify-content: center;
    background-color: var(--color-secondary-light);
`;

const InnerWrapper = styled.div`
    padding: 20px 32px;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    background-color: var(--color-primary-light);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 16px;
    }
`;

const Heading = styled.h1`
    font-weight: 550;
    font-size: 3rem;
`;

const Message = styled.p`
    font-size: 1.5rem;
`;

export default ErrorPage;