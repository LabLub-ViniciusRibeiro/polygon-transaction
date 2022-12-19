import styled from "styled-components";

export const ButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 34px;
    cursor: pointer;
    margin-top: 20px;
    background: #6255f1;
    border: none;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.5s;

    &:hover {
        background: #5142f0;
    }
    
    &:active {
        background: #7468f3;
    }

    &:disabled {
        background: gray;
        cursor: initial;
    }

    & > span {
        position: absolute;
        right: 10px;
    }
`