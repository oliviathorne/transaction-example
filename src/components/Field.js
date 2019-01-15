// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { registerField, updateFieldValue } from './../actions/form';

const Label = styled.label`
  display: block;
  width: 100%;
  margin-top: 2.5rem;
  letter-spacing: -0.4px;
`;

const Input = styled.input`
  border: ${(props) => (props.error === true ? '2px #d6d7df' : '2px #d30a19')};
  border-style: none none solid none;
  width: 100%;
  min-height: 2.4rem;
  font-size: 1.1rem;
  caret-color: #4b3cfa;

  &:focus {
    outline: none;
    border-bottom: 2px solid #4b3cfa;
  }

  &[type='number'] {
    padding-left: 18px;
    box-sizing: border-box;
  }
`;

const CurrencyIcon = styled.span`
  position: absolute;
  display: block;
  left: 5px;
  top: 27.5px;
  font-weight: 500;
  font-size: 19px;
  z-index: 1;
`;

const InputContainer = styled.div`
  position: relative;
`;

const ErrorMessage = styled.div`
  color: #d30a19;
  margin-top: 0.5rem;
  font-size: 11pt;
`;

type Props = {
  dispatchRegisterField: (string, string) => void,
  dispatchUpdateFieldValue: (string, string) => void,
  handleSubmit: (?boolean | ?string) => void,
  validate: (string, string, number) => void,
  isSubmiting: boolean,
  showCurrencySymbol: boolean,
  name: string,
  label: string,
  fieldValue: string,
  type: string,
  totalAvailable: number
};

type State = {
  valid: boolean | string
};

class Field extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  componentWillMount() {
    this.props.dispatchRegisterField(this.props.name, '');
  }

  componentDidUpdate(prevProps) {
    const { isSubmiting, name, fieldValue, validate, totalAvailable } = this.props;

    if (prevProps.isSubmiting !== isSubmiting && isSubmiting) {
      const IS_VALID = validate(name, fieldValue, totalAvailable);
      this.setState({
        valid: IS_VALID
      });

      this.props.handleSubmit(IS_VALID);
    }
  }

  handleChange = (e) => {
    this.props.dispatchUpdateFieldValue(this.props.name, e.target.value);
  };

  handleBlur = () => {
    const { validate, name, fieldValue, totalAvailable } = this.props;
    const VALID = validate(name, fieldValue, totalAvailable);

    this.setState({
      valid: VALID
    });
  };

  render() {
    const { name, label, type, showCurrencySymbol, fieldValue } = this.props;

    return (
      <InputContainer>
        <Label htmlFor={name}>{label}</Label>
        <Input
          name={name}
          type={type}
          value={fieldValue}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          error={this.state.valid}
        />
        {showCurrencySymbol && <CurrencyIcon>£</CurrencyIcon>}
        {this.state.valid !== true && <ErrorMessage>{this.state.valid}</ErrorMessage>}
      </InputContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  totalAvailable: state.form.totalAvailable,
  fieldValue: typeof state.form.fields[ownProps.name] !== 'undefined' ? state.form.fields[ownProps.name].value : ''
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRegisterField: (name, initialValue) => dispatch(registerField(name, initialValue)),
  dispatchUpdateFieldValue: (name, value) => dispatch(updateFieldValue(name, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);
