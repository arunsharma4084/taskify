import React from 'react';
import { MdCall, MdEmail } from 'react-icons/md';
import { FaTwitter, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa"
import styled from 'styled-components';
import Copyright from './Copyright';
import { MediaType } from '../types/types';

const Footer: React.FC = (): JSX.Element => {
    return (
        <Wrapper>
            <SubWrapper>
                <Container>
                    <Content>
                        <p>Designed and Developed by :</p>
                        <span>Arun Sharma, Frontend Developer</span>
                    </Content>

                    <InfoWrapper>
                        <PhoneWrapper>
                            <MdCall size={'24px'} />
                            <p>8209883415</p>
                        </PhoneWrapper>

                        <EmailWrapper>
                            <MdEmail size={'24px'} />
                            <p>arun2life4084@gmail.com</p>
                        </EmailWrapper>

                        <SocialWrapper>
                            <a href="https://www.twitter.com/arun2life4084"><FaTwitter size={'24px'} /></a>
                            <a href="https://www.facebook.com/arunsharma4084"><FaFacebook size={'24px'} /></a>
                            <a href="https://github.com/arunsharma4084"><FaGithub size={'24px'} /></a>
                            <a href="https://www.linkedin.com/in/arunsharma4084"><FaLinkedinIn size={'24px'} /></a>
                        </SocialWrapper>
                    </InfoWrapper>
                </Container>
            </SubWrapper>
            <Copyright />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    font-family: var(--font-sans-serif);
    color: var(--color-gray-1000);
    box-shadow: 0px -5px 5px hsl(0deg 0% 0% / 0.2),
            0px -10px 10px hsl(0deg 0% 0% / 0.2);
`;

const SubWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: hsl(230, 33%, 15%);
`;

const Container = styled.div`
    width: 100%;
    padding: 12px 32px;
    max-width: 1200px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        padding: 12px 16px;
    }
`;

const Content = styled.div`
    padding: 12px;
    padding-top: 0;
    display: flex;
    justify-content: center;
    gap: 4px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        flex-direction: column;
        align-items: center;
        gap: 0;
    }

    & > span {
        font-style: italic;
        font-weight: 550;
    }
`
const InfoWrapper = styled.div`
    display: flex;  
    padding: 0 12px;
    justify-content: center;

    @media ${MediaType.MOBILE_PORTRAIT} {
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }
`;

const PhoneWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    border-right: 1px solid var(--color-gray-700);
    padding-right: 24px;
    margin-right: 24px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        border: none;
        padding: 0;
        margin: 0;
    }
`;

const EmailWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    border-right: 1px solid var(--color-gray-700);
    padding-right: 24px;
    margin-right: 24px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        border: none;
        padding: 0;
        margin: 0;
    }
`;

const SocialWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    @media ${MediaType.MOBILE_PORTRAIT} {
        margin-top: 6px;
    }

    & > a {
        text-decoration: none;
        color: var(--color-gray-1000);
    }
`;

export default Footer;