// @flow
import React from 'react';
import styled from 'styled-components';

const TransactionRow = styled.div`
  display: flex;
  border-bottom: 1px solid #edeef7;
  align-items: center;
  padding: 1rem 0;
`;

const TransactionColumn = styled.div`
  width: ${(props) => `${props.width}%`};
`;

export const Paragraph = styled.p`
  margin: 0;
  float: ${(props) => props.float || 'none'};
  font-size: ${(props) => (props.smallText ? '11pt' : 'inherit')};
  color: ${(props) => (props.smallText ? '#535353' : 'inherit')};
  margin-top: ${(props) => (props.smallText ? '.4rem' : 0)};
  font-weight: ${(props) => (props.bold ? '600' : 'inherit')};
`;

type Props = {
  name: { value: string },
  email: { value: string },
  amount: { value: string }
};

const Transaction = (props: Props) => {
  const AMOUNT = parseFloat(props.amount.value)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <TransactionRow>
      <TransactionColumn width={70}>
        <Paragraph>{props.name.value}</Paragraph>
        <Paragraph smallText>{props.email.value}</Paragraph>
      </TransactionColumn>
      <TransactionColumn width={30}>
        <Paragraph float="right" bold>
          £{AMOUNT}
        </Paragraph>
      </TransactionColumn>
    </TransactionRow>
  );
};

export default Transaction;
