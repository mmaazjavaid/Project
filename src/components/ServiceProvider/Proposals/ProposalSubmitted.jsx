import React from 'react';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';
import { Typography, Container } from '@mui/material';
import NewsNav from '../../Dashboard/NewsFeed/NewsNav';

const RootContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const Icon = styled(CheckCircle)({
  fontSize: 100,
  color: 'green',
  borderRadius: '50%',
  border: '2px solid green',
  padding: 20,
});

const Text = styled(Typography)({
  marginTop: 20,
  fontSize: 24,
  fontWeight: 'bold',
});

const ProposalSubmitted = () => {
  return (
    <>
    <NewsNav/>
    <RootContainer maxWidth="sm">
      <Icon />
      <Text variant="h6">Proposal Submitted</Text>
    </RootContainer>
    </>
  );
};

export default ProposalSubmitted;
