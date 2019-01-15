// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const AccountSummaryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Paragraph = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 10pt;
`;

const AccountInfo = styled.div`
  font-weight: 600;
  padding: 0.75rem;
  width: 33%;

  &:first-child {
    text-align: right;
  }
`;

export const PieChart = styled.div`
  display: inline-block;
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  background-image: ${(props) => `conic-gradient(
    #ffb524 0,
    #ffb524 ${3.6 * props.percentageLeft}deg,
    #ebebee ${3.6 * props.percentageLeft}deg,
    #ebebee ${3.6 * 100 - props.percentageLeft}deg
  )`};

  &::before {
    display: inline-block;
    background: #ffffff;
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 15px;
    left: 15px;
  }
`;

type Props = {
  totalAvailable: number,
  totalSent: number,
  startingBalance: number
};

const AccountSummary = (props: Props) => {
  const TOTAL_AVAILABLE = parseFloat(props.totalAvailable)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const TOTAL_SENT = parseFloat(props.totalSent)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const PERCENTAGE_LEFT = 100 - (props.totalSent / props.startingBalance) * 100;

  return (
    <AccountSummaryWrapper>
      <AccountInfo>
        £{TOTAL_SENT}
        <Paragraph>total sent</Paragraph>
      </AccountInfo>
      <PieChart percentageLeft={PERCENTAGE_LEFT} />
      <AccountInfo>
        £{TOTAL_AVAILABLE}
        <Paragraph>left available</Paragraph>
      </AccountInfo>
    </AccountSummaryWrapper>
  );
};

const mapStateToProps = (state, ownProps) => ({
  totalAvailable: state.form.totalAvailable,
  totalSent: state.form.totalSent,
  startingBalance: state.form.startingBalance
});

export default connect(mapStateToProps)(AccountSummary);
