import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../../public/images/logo.png";
import { AuthContext } from '../contexts/AuthContext';
import coverImage from "../../public/images/background.jpg";
import { MediaType } from '../types/types';

const LandingPage = () => {
    const first = useContext(AuthContext);

    if (first?.currentUser) {
        return (<Navigate to="/dashboard" replace={true} />);
    } else {
        return (
            < Wrapper >
                <Container>
                    <LogoContainer>
                        <Image src={logo} alt="logo" />
                        <Title>Taskify</Title>
                    </LogoContainer>
                    <ButtonWrapper>
                        <Link to="/signup"><SignUpButton>Sign Up</SignUpButton></Link>
                        <Link to="/login"><LogInButton>Log In</LogInButton></Link>
                    </ButtonWrapper>
                </Container>
            </Wrapper >
        )
    }
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;
    background-color: var(--color-secondary-light);
    background-image: url(${coverImage});
    background-size: cover;
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
`;

const Image = styled.img`
    display: block;
    width: 64px;
    height: 64px;
`;

const Title = styled.h1`
    color: var(--color-accent);
    font-family: 'Playball', var(--font-sans-serif);
    font-weight: 600;
    font-size: 4rem;
    line-height: 1;
`;

const Container = styled.div`
    padding: 24px;
    border: 1px solid var(--color-gray-600);
    border-radius: 8px;
    background-color: hsla(173, 100%, 99%, 0.7);

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 16px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 16px;
    justify-content: space-between;
`;

const Button = styled.button`
    border: 1px solid var(--color-gray-600);
    font-family: var(--font-sans-serif);
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    width: 150px;
    transition: transform 100ms ease-out;
    box-shadow: 0px 2px 2px hsl(0deg 0% 0% / 0.2),
            0px 4px 4px hsl(0deg 0% 0% / 0.2),
            0px 6px 6px hsl(0deg 0% 0% / 0.2);

    @media ${MediaType.MOBILE_PORTRAIT} {
        width: 125px;
    }
`;

const SignUpButton = styled(Button)`
    background-color: var(--color-secondary);

    &:hover{
        background-color: hsl(35deg, 85%, 75%);
    }

    &:active{
        transform: translateY(2px) scale(0.98);
        background-color: hsl(35deg, 85%, 75%);
    }
`;

const LogInButton = styled(Button)`
    background-color: var(--color-primary);

    &:hover{
        background-color: hsl(173deg, 92%, 40%);
    }

    &:active{
        transform: translateY(2px) scale(0.98);
        background-color: hsl(173deg, 92%, 40%);
    }
`;

export default LandingPage;