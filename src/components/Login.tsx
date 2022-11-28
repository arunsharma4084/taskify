import React, { useState, useContext, useRef } from 'react'
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { auth, googleAuthProvider } from '../firebase/firebase';
import "../styles/styles.css";
import { useNavigate } from 'react-router-dom';
import coverImage from "../../public/images/background.jpg";
import { MediaType } from '../types/types';

const LogIn: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const first = useContext(AuthContext);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (emailRef.current?.value && passwordRef.current?.value) {
            first?.logIn(auth, emailRef.current.value, passwordRef.current?.value)
                .then((currentUser) => {
                    setError("");
                    setLoading(true);
                    if (currentUser.user.emailVerified) {
                        navigate("/dashboard", { replace: true });
                    } else {
                        setLoading(false);
                        setError("Please verify your e-mail before log in.");
                    }
                }).catch((error) => {
                    setError(`Failed to log in.`);
                    alert(error.message)
                })
        }
    }

    function handleOnClick() {
        first?.logInWithGoogle(auth, googleAuthProvider).then(() => {
            setError("");
            setLoading(true);
            navigate("/dashboard", { replace: true })
        }).catch((error) => {
            setError(`Failed to log in.`);
            alert(error.message)
        })
    }

    return (
        <Wrapper action="" id='login-form' onSubmit={onFormSubmit}>
            <LogInWrapper>
                <Heading>Log In</Heading>
                {error && <ErrorMessage>{error}</ErrorMessage>}
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

                <InputWrapper>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        ref={passwordRef}
                        placeholder='Password'
                        required
                    />
                </InputWrapper>

                <ForgotOption><Link to="/forgot-password">Forgot Password?</Link></ForgotOption>
                <Button form="login-form" type='submit' disabled={loading}>Log In</Button>

                <GoogleButton onClick={handleOnClick} className="googleButton"></GoogleButton>
                <Option>Have not registered yet? <Link to="/signup">Sign Up.</Link></Option>
            </LogInWrapper>
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

const LogInWrapper = styled.div`
    width: 500px;
    padding: 16px;
    font-family: var(--font-sans-serif);
    border: 1px solid var(--color-gray-600);
    border-radius: 8px;
    background-color: hsla(173, 100%, 99%, 0.7);

    @media ${MediaType.MOBILE_PORTRAIT} {
        width: 100vw;
    }

    @media ${MediaType.MOBILE_LANDSCAPE} {
        padding: 12px 16px;
    }
`;

const Heading = styled.h1`
    font-weight: 600;
    margin-bottom: 16px;
    text-align: center;
    line-height: 1;

    @media ${MediaType.MOBILE_LANDSCAPE} {
        margin-bottom: 12px;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 4px;
    flex-direction: column;
    margin-bottom: 16px;

    @media ${MediaType.MOBILE_LANDSCAPE} {
        margin-bottom: 12px;
    }
`;

const ErrorMessage = styled.p`
    font-family: var(--font-sans-serif);
    font-size: 0.9rem;
    margin-bottom: 12px;
    padding: 8px;
    background-color: hsl(1deg, 100%, 90%);
    border-radius: 4px;

    @media ${MediaType.MOBILE_LANDSCAPE} {
        background: transparent;
        border: none;
        padding: 0 0 0 8px;
        color: red;
        font-style: italic;
        margin-bottom: 4px;
    }
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

    @media ${MediaType.MOBILE_LANDSCAPE} {
        display: none;
    }
`;

const Button = styled.button`
    border: 1px solid var(--color-gray-600);
    background-color: var(--color-primary);
    font-family: var(--font-sans-serif);
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 16px;
    margin-top: 4px;
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

    @media ${MediaType.MOBILE_LANDSCAPE} {
        margin-top: 0;
        margin-bottom: 12px;
    }
`;

const Option = styled.p`
    text-align: center;
    line-height: 1;

    & > a {
        text-decoration: none;
    }
`;

const ForgotOption = styled.p`
    margin-bottom: 12px;
    line-height: 1;

    & > a {
        text-decoration: none;
    }
`;

export default LogIn;