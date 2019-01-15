import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConnectedFormContainer, { FormContainer } from './FormContainer';
import Field from './../components/Field';
import { mockState } from './../mocks/mocks';

const mockStore = configureStore();
let store;
let wrapper;

beforeEach(() => {
  let validation = jest.fn();

  store = mockStore(mockState);
  wrapper = mount(
    <Provider store={store}>
      <ConnectedFormContainer>
        <Field name="name" label="Name" type="text" validate={validation} />
      </ConnectedFormContainer>
    </Provider>
  );
});

describe('FormContainer component', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a child component with isSubmiting and handleSubmit props', () => {
    expect(wrapper.find(Field).length).toBe(1);

    expect(wrapper.find(Field).props().isSubmiting).toBe(false);
    expect(wrapper.find(Field).props().handleSubmit).toBeInstanceOf(Function);
  });

  it('calls the submit method on submit click', () => {
    const unconnectedWrapper = mount(<FormContainer />);
    const form = unconnectedWrapper.find('form');

    form.simulate('submit');
    expect(unconnectedWrapper.state('isSubmiting')).toBe(true);
  });

  it('calls the save transaction method', () => {
    const dispatchSaveTransactionMock = jest.fn();
    const unconnectedWrapper = mount(<FormContainer dispatchSaveTransaction={dispatchSaveTransactionMock} />);

    jest.spyOn(unconnectedWrapper.instance(), 'saveTransaction');
    unconnectedWrapper.instance().saveTransaction();

    expect(unconnectedWrapper.instance().saveTransaction).toHaveBeenCalled();
  });
});
