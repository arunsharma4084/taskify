import React, { useContext } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase/firebase';
import { MediaType } from '../types/types';

const Header: React.FC = (): JSX.Element => {
    const first = useContext(AuthContext);

    return (
        <Wrapper>
            <SubWrapper>
                <Link style={{ textDecoration: "none" }} to='/dashboard'>
                    <Logo />
                </Link>
                <Button onClick={() => {
                    first?.logOut(auth).then(() => {
                    }).catch(error => {
                        alert(error.message);
                    });
                }}>Log Out</Button>
            </SubWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: hsl(200, 90%, 25%);
    width: 100%;
    border-bottom: 1px solid var(--color-gray-800);
    display: flex;
    justify-content: center;
`;

const SubWrapper = styled.div`
    padding: 0 32px;
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 4px 16px;
    }
`;

const Button = styled.button`
    border: 1px solid var(--color-gray-600);
    background-color: var(--color-secondary);
    font-family: var(--font-sans-serif);
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 100ms ease-out;
    box-shadow: 1px 2px 2px hsl(0deg 100% 100% / 0.2),
            2px 4px 4px hsl(0deg 100% 100% / 0.2),
            3px 6px 6px hsl(0deg 100% 100% / 0.2);

    &:hover{
        background-color: hsl(35deg, 85%, 75%);
    }

    &:active{
        transform: translateY(2px) scale(0.95);
        background-color: hsl(35deg, 85%, 75%);
    }


    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 4px;
    }
`;

export default Header;