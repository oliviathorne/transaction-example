// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { saveTransaction } from './../actions/form';

const StyledForm = styled.form`
  width: 50%;
  padding: 2rem 10% 4rem 0;
  border-right: 1px solid #edeef7;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    border-right: 0;
    border-bottom: 1px solid #edeef7;
    padding: 2rem 0 4rem;
  }
`;

const H1 = styled.h1`
  font-family: 'AlverataBlack';
  letter-spacing: -0.6px;
`;

const SubmitButton = styled.input`
  width: 85%;
  display: block;
  margin: 8rem auto 0;
  background-color: #4b3cfa;
  border: 0;
  color: #ffffff;
  height: 3rem;
  border-radius: 1.5rem;
  font-size: 16px;
  font-weight: 600;

  &:focus {
    outline: none;
  }
`;

type Props = {
  dispatchSaveTransaction: () => void,
  children: React.Node,
  title: string,
  buttonValue: string,
  fields: {
    [key: string]: {
      [key: string]: string
    }
  }
};

type State = {
  isSubmiting: boolean
};

export class FormContainer extends React.Component<Props, State> {
  validatedElements: Array<boolean | string>;

  constructor() {
    super();
    this.state = {
      isSubmiting: false
    };

    this.validatedElements = [];
  }

  handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    this.setState({
      isSubmiting: true
    });
  };

  validateForm = (isValid: string | boolean) => {
    this.validatedElements = this.validatedElements.concat([isValid]);
    let invalidElements: Array<string | boolean> = this.validatedElements.filter((element) => element !== true);

    if (this.validatedElements.length === React.Children.count(this.props.children)) {
      if (invalidElements.length === 0) {
        this.saveTransaction();
      }

      this.validatedElements = [];
      invalidElements = [];
    }

    this.setState({
      isSubmiting: false
    });
  };

  saveTransaction = () => {
    const DATA = {};

    React.Children.forEach(this.props.children, (child) => {
      return Object.assign(DATA, {
        [child.props.name]: this.props.fields[child.props.name].value
      });
    });

    this.props.dispatchSaveTransaction();
  };

  render() {
    const { children, title, buttonValue } = this.props;

    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, {
        isSubmiting: this.state.isSubmiting,
        handleSubmit: this.validateForm
      })
    );

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <H1>{title}</H1>
        {childrenWithProps}
        <SubmitButton type="submit" value={buttonValue} />
      </StyledForm>
    );
  }
}

const mapStateToProps = (state) => ({
  fields: state.form.fields
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveTransaction: () => dispatch(saveTransaction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);
