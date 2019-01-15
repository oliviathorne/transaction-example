import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockState } from './../mocks/mocks';
import Field from './Field';

const mockStore = configureStore();
let store;
let wrapper;

beforeEach(() => {
  store = mockStore(mockState);
  wrapper = mount(
    <Provider store={store}>
      <Field />
    </Provider>
  );
});

describe('Field component', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('outputs the name and type props into input element', () => {
    const props = {
      name: 'test',
      type: 'text'
    };

    const wrapper = mount(
      <Provider store={store}>
        <Field {...props} />
      </Provider>
    );

    expect(wrapper.find('input[name="test"]').length).toBe(1);
    expect(wrapper.find('input[type="text"]').length).toBe(1);
  });

  it('invokes the validation function on blur', () => {
    let validation = jest.fn();

    let wrapper = mount(
      <Provider store={store}>
        <Field validate={validation} />
      </Provider>
    );

    wrapper
      .find('input')
      .props()
      .onBlur();

    expect(validation).toHaveBeenCalledTimes(1);
  });
});
