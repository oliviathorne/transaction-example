// @flow
import React from 'react';
import styled from 'styled-components';
import TransactionWrapper from './TransactionWrapper';
import AccountSummary from './../components/AccountSummary';

const AccountWrapper = styled.div`
  width: 50%;
  padding: 2rem 0 4rem 10%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 0 4rem;
  }
`;

const H1 = styled.h1`
  font-family: 'AlverataBlack';
  letter-spacing: -0.6px;
`;

const H3 = styled.h3`
  font-family: 'AlverataBlack';
  letter-spacing: -0.6px;
  margin: 5rem 0 0.5rem 0;
`;

const AccountSection = () => (
  <AccountWrapper>
    <H1>My account</H1>
    <AccountSummary />

    <H3>Transactions</H3>
    <TransactionWrapper />
  </AccountWrapper>
);

export default AccountSection;
