// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Transaction from './../components/Transaction';

type Props = {
  savedTransactions: [
    {
      [key: string]: {
        [key: string]: string
      }
    }
  ]
};

const TransactionWrapper = (props: Props) => {
  let transactions: string | React.Element<typeof Transaction>[] = "You haven't made any transactions yet.";

  if (props.savedTransactions.length > 0) {
    transactions = props.savedTransactions.map((transaction, index) => {
      return <Transaction key={index} {...transaction} />;
    });
  }

  return <React.Fragment>{transactions}</React.Fragment>;
};

const mapStateToProps = (state) => ({
  savedTransactions: state.form.savedTransactions
});

export default connect(mapStateToProps)(TransactionWrapper);
