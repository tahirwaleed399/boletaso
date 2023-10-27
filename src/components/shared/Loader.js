import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const StyledBackdrop = styled(Backdrop)`
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1400; 
    user-select : none;
`;

const LoaderTitle = styled.div`
    color: white;
    margin-top: 20px;
    font-size: 1.5rem;
`;

const Loader = () => {
    const isLoading = useSelector((state) => state.auth.isLoading);
    return ( isLoading && 
        <StyledBackdrop open={true} >
            {/* <CircularProgress color="inherit" /> */}
            <LoaderTitle>Loading...</LoaderTitle>
        </StyledBackdrop>
    );
}

export default Loader;
