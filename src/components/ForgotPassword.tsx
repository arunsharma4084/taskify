import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase/firebase';
import coverImage from "../../public/images/background.jpg";
import { MediaType } from "../types/types";

const ForgotPassword: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const first = useContext(AuthContext);
    const emailRef = useRef<HTMLInputElement>(null);

    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (emailRef.current?.value) {
            console.log(emailRef.current?.value)
            first?.resetPassword(auth, emailRef.current.value)
                .then((user) => {
                    setError("");
                    setLoading(true);
                    setMessage("Check your inbox for further instructions");
                }).catch((error) => {
                    setError(`Failed to reset password.`);
                    alert(error.message)
                })
        }
    }

    return (
        <Wrapper action="" onSubmit={onFormSubmit}>
            <ForgotPasswordWrapper>
                <Heading>Reset Password</Heading>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {message && <Message>{message}</Message>}
                <InputWrapper>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        autoFocus
                        placeholder='Email'
                        ref={emailRef}
                        required
                    />
                </InputWrapper>

                <Button type='submit' disabled={loading}>Reset Password</Button>
                <Option><Link to="/login">Log In</Link></Option>
                <Option>Have not registered yet? <Link to="/signup">Sign Up</Link></Option>
            </ForgotPasswordWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;
    background-color: var(--color-secondary-light);
    background-image: url(${coverImage});
    background-size: cover;
`;

const ForgotPasswordWrapper = styled.div`
    width: 500px;
    padding: 16px;
    font-family: var(--font-sans-serif);
    border: 1px solid var(--color-gray-600);
    border-radius: 8px;
    background-color: hsla(173, 100%, 99%, 0.7);

    @media ${MediaType.MOBILE_PORTRAIT} {
        width: 100vw;
    }
`;

const Heading = styled.h1`
    font-weight: 600;
    margin-bottom: 16px;
    text-align: center;
    line-height: 1;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 4px;
    flex-direction: column;
    margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
    font-family: var(--font-sans-serif);
    font-size: 0.9rem;
    margin-bottom: 12px;
    padding: 8px;
    background-color: hsl(1deg, 100%, 90%);
    border-radius: 4px;
`;

const Message = styled(ErrorMessage)`
    background-color: hsl(173deg, 92%, 80%);
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 8px;
    border: 1px solid var(--color-gray-600);
    border-radius: 4px;
`;

const Label = styled.label`
    font-weight: 500;
    font-size: 1rem;
    line-height: 1;
`;

const Button = styled.button`
    border: 1px solid var(--color-gray-600);
    background-color: var(--color-primary);
    font-family: var(--font-sans-serif);
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    margin-top: 4px;
    margin-bottom: 4px;
    width: 100%;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 100ms ease-out;
    box-shadow: 0px 2px 2px hsl(0deg 0% 0% / 0.2),
            0px 4px 4px hsl(0deg 0% 0% / 0.2),
            0px 6px 6px hsl(0deg 0% 0% / 0.2);
    
    &:hover{
        background-color: hsl(173deg, 92%, 40%);
    }
        
    &:active{
        transform: translateY(2px) scale(0.98);
        background-color: hsl(173deg, 92%, 40%);
    }
`;

const Option = styled.p`
    text-align: center;
    line-height: 1;
    margin-top: 12px;

    & > a {
        text-decoration: none;
    }
`;

export default ForgotPassword;